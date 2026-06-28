import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type ProgressItem = {
  id: string;
  user_id: string;
  item_type: string;
  item_id: string;
  item_name: string | null;
  progress: number;
  completed: boolean;
  metadata: any;
  created_at: string;
  updated_at: string;
};

export function useProgress() {
  const { user } = useAuth();
  const [items, setItems] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });
    setItems((data as ProgressItem[]) || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
    if (!user) return;
    const ch = supabase
      .channel(`progress-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_progress", filter: `user_id=eq.${user.id}` },
        () => refresh(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [user, refresh]);

  const upsert = useCallback(
    async (data: { item_type: string; item_id: string; item_name?: string; progress?: number; completed?: boolean; metadata?: any }) => {
      if (!user) return;
      // try to find existing
      const { data: existing } = await supabase
        .from("user_progress")
        .select("id, metadata")
        .eq("user_id", user.id)
        .eq("item_type", data.item_type)
        .eq("item_id", data.item_id)
        .maybeSingle();

      if (existing) {
        const mergedMetadata = { ...(existing.metadata as object || {}), ...(data.metadata || {}) };
        const { error } = await supabase
          .from("user_progress")
          .update({
            item_name: data.item_name,
            progress: data.progress ?? 0,
            completed: data.completed ?? false,
            metadata: mergedMetadata,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
        if (error) console.error("Error updating progress:", error);
      } else {
        const { error } = await supabase.from("user_progress").insert({
          user_id: user.id,
          item_type: data.item_type,
          item_id: data.item_id,
          item_name: data.item_name ?? null,
          progress: data.progress ?? 0,
          completed: data.completed ?? false,
          metadata: data.metadata ?? {},
        });
        if (error) console.error("Error inserting progress:", error);
      }
    },
    [user],
  );

  const stats = {
    coursesCompleted: items.filter((i) => i.item_type === "course" && i.completed).length,
    coursesInProgress: items.filter((i) => i.item_type === "course" && !i.completed).length,
    testsAttempted: items.filter((i) => i.item_type === "test").length,
    testsPassed: items.filter((i) => i.item_type === "test" && (i.metadata?.score ?? 0) >= 60).length,
    materialsRead: items.filter((i) => i.item_type === "material").length,
    avgTestScore: (() => {
      const tests = items.filter((i) => i.item_type === "test");
      if (!tests.length) return 0;
      return Math.round(tests.reduce((s, t) => s + (t.metadata?.score ?? 0), 0) / tests.length);
    })(),
  };

  // Skill scores: keyed by skill name, value 0-100. Only set when tests are taken.
  // Reset automatically when user_progress is deleted (profile edit).
  const skillScores: Record<string, number> = {};
  items
    .filter((i) => i.item_type === "skill_score")
    .forEach((i) => {
      if (i.item_id) skillScores[i.item_id] = i.progress ?? 0;
    });

  const getSkillScore = (skill: string) => skillScores[skill] ?? 0;

  return { items, loading, upsert, refresh, stats, skillScores, getSkillScore };
}
