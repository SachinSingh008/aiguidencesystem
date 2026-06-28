// ─── SerpAPI Proxy — Supabase Edge Function ───────────────────────────────────
// Runs server-side (Deno) → no CORS block.
// Frontend calls: POST /functions/v1/serp-proxy  { q: "...", num: 5 }
// This function calls SerpAPI and returns organic_results[].

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SERP_KEY = Deno.env.get("SERP_API_KEY") ?? "";
    if (!SERP_KEY) {
      return new Response(JSON.stringify({ error: "SERP_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { q, num = 5 } = await req.json();
    if (!q) {
      return new Response(JSON.stringify({ error: "Query 'q' is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Call SerpAPI from the server — no CORS issues here
    const serpUrl = `https://serpapi.com/search.json?api_key=${SERP_KEY}&engine=google&q=${encodeURIComponent(q)}&num=${num}&gl=in&hl=en`;
    const res = await fetch(serpUrl, { headers: { Accept: "application/json" } });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[serp-proxy] SerpAPI error ${res.status}:`, errText);
      return new Response(JSON.stringify({ error: `SerpAPI returned ${res.status}`, organic_results: [] }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    // Return only what the frontend needs (organic_results)
    return new Response(
      JSON.stringify({ organic_results: data?.organic_results ?? [] }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (e) {
    console.error("[serp-proxy] Error:", e);
    return new Response(
      JSON.stringify({ error: String(e), organic_results: [] }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
