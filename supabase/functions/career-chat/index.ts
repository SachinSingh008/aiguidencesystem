const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages, userContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    let userBlock = "";
    if (userContext) {
      userBlock = `\n\n## About this student (use this to personalize every reply):
- Name: ${userContext.name || "Unknown"}
- Branch: ${userContext.branch || "Not set"}
- Year: ${userContext.year || "Not set"}
- College: ${userContext.college || "Not set"}
- Current skills: ${(userContext.skills || []).join(", ") || "None listed"}
- Interests: ${(userContext.interests || []).join(", ") || "None listed"}
- Career goal: ${userContext.goal || "Not set"}
- XP: ${userContext.xp ?? 0} | Streak: ${userContext.streak ?? 0} days

Always address them by first name. Tailor advice to their branch, year, and skill level. Reference their interests/goal when relevant. Don't ask for info already provided above.`;
    }

    const systemPrompt = `You are CareerPilot AI, a friendly and expert career mentor for engineering students in India.

You help with:
- Career path recommendations (AI Engineer, Data Scientist, Full Stack Dev, Mechanical Design, Civil Project Mgmt, etc.)
- Skill gap analysis and learning roadmaps
- Course recommendations (Coursera, Udemy, YouTube, LinkedIn Learning)
- Resume tips and interview preparation
- Project ideas and portfolio building
- Industry trends and salary insights (in INR/LPA)

Be concise, motivating, and actionable. Use markdown (bold, lists). Give 2-3 concrete next steps when suggesting paths.${userBlock}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
