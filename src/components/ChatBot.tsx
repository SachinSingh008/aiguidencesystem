import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/career-chat`;

const SUGGESTIONS = [
  "What career suits me best?",
  "Build me a 3-month learning plan",
  "What skills am I missing?",
  "Tips to crack tech interviews",
];

export function ChatBot() {
  const { profile, user, session } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Greeting personalized to user
  useEffect(() => {
    if (profile && messages.length === 0) {
      const name = profile.full_name?.split(" ")[0] || "there";
      setMessages([{
        role: "assistant",
        content: `👋 Hey ${name}! I'm your **CareerPilot AI mentor**.\n\nI know you're a **${profile.year || ""} ${profile.branch || "Engineering"}** student${profile.career_goal ? ` aiming to **${profile.career_goal}**` : ""}. I can help with career paths, skill gaps, learning plans, interviews, and more. What's on your mind?`,
      }]);
    }
  }, [profile]);

  // Load chat history once when opened
  useEffect(() => {
    if (open && user && messages.length <= 1) {
      supabase.from("chat_history").select("role, content").eq("user_id", user.id).order("created_at").limit(40)
        .then(({ data }) => {
          if (data && data.length) {
            setMessages([messages[0], ...data.map(d => ({ role: d.role as "user"|"assistant", content: d.content }))]);
          }
        });
    }
  }, [open, user]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const persist = async (role: "user" | "assistant", content: string) => {
    if (!user) return;
    await supabase.from("chat_history").insert({ user_id: user.id, role, content });
  };

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    persist("user", text);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: newMessages,
          userContext: profile ? {
            name: profile.full_name,
            branch: profile.branch,
            year: profile.year,
            college: profile.college,
            skills: profile.current_skills,
            interests: profile.interests,
            goal: profile.career_goal,
            xp: profile.xp,
            streak: profile.streak,
          } : null,
        }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) toast.error("Rate limit hit. Try again shortly.");
        else if (resp.status === 402) toast.error("AI credits exhausted.");
        else toast.error("Something went wrong.");
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistant = "";
      let done = false;
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistant += delta;
              setMessages((prev) => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistant } : m));
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
      if (assistant) persist("assistant", assistant);
    } catch (e) {
      console.error(e);
      toast.error("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-primary shadow-elegant hover:scale-110 transition-transform"
          style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-card border-l border-border">
          <SheetHeader className="p-4 border-b border-border bg-gradient-hero">
            <SheetTitle className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-semibold">CareerPilot Mentor</div>
                <div className="text-xs text-muted-foreground font-normal flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Knows your profile
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                  m.role === "user" ? "bg-gradient-primary text-primary-foreground" : "bg-secondary text-foreground"
                }`}>
                  {m.content || (loading && i === messages.length - 1 ? <Loader2 className="w-4 h-4 animate-spin" /> : "")}
                </div>
              </div>
            ))}
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/20 transition-colors border border-border">
                  {s}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-4 border-t border-border flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your career question..."
              className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 ring-primary"
              disabled={loading} />
            <Button type="submit" size="icon" disabled={loading || !input.trim()} className="bg-gradient-primary rounded-xl">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
