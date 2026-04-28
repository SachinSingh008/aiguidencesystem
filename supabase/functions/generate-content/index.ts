// Generates personalised CareerPilot content (career paths, courses, study material,
// mock tests, skill gaps, video lectures) for a single user using Lovable AI.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TOOL_SCHEMA = {
  type: "object",
  properties: {
    careerPaths: {
      type: "array",
      description: "5 career paths highly relevant to the student's branch, skills, interests and goal. NO generic CS paths if branch is not Computer.",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          icon: { type: "string", description: "Single emoji" },
          match: { type: "integer", minimum: 50, maximum: 99 },
          description: { type: "string" },
          salary: { type: "string", description: "INR range like ₹6-22 LPA" },
          growth: { type: "string", description: "Growth %, e.g. +25%" },
          skills: { type: "array", items: { type: "string" }, minItems: 4, maxItems: 8 },
          roadmap: {
            type: "array",
            minItems: 6,
            maxItems: 8,
            items: {
              type: "object",
              properties: {
                step: { type: "integer" },
                title: { type: "string" },
                status: { type: "string", enum: ["complete", "in-progress", "upcoming"] },
                duration: { type: "string" },
                resources: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: { label: { type: "string" }, url: { type: "string" } },
                    required: ["label", "url"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["step", "title", "status", "duration", "resources"],
              additionalProperties: false,
            },
          },
        },
        required: ["id", "title", "icon", "match", "description", "salary", "growth", "skills", "roadmap"],
        additionalProperties: false,
      },
      minItems: 4,
      maxItems: 6,
    },
    courses: {
      type: "array",
      minItems: 8,
      maxItems: 12,
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
          platform: { type: "string", description: "Coursera, Udemy, YouTube, edX, NPTEL, MIT OCW, Autodesk, MathWorks, AWS" },
          instructor: { type: "string" },
          duration: { type: "string" },
          difficulty: { type: "string", enum: ["Beginner", "Intermediate", "Advanced"] },
          rating: { type: "number" },
          students: { type: "string" },
          url: { type: "string", description: "Real working URL to the course" },
          category: { type: "string", description: "Topic category for the course" },
        },
        required: ["id", "title", "platform", "instructor", "duration", "difficulty", "rating", "students", "url", "category"],
        additionalProperties: false,
      },
    },
    videoLectures: {
      type: "array",
      minItems: 6,
      maxItems: 10,
      description: "Free YouTube/NPTEL/MIT OCW video lectures specific to the student's branch and skill gaps.",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
          channel: { type: "string" },
          duration: { type: "string" },
          url: { type: "string" },
          topic: { type: "string" },
        },
        required: ["id", "title", "channel", "duration", "url", "topic"],
        additionalProperties: false,
      },
    },
    studyMaterials: {
      type: "array",
      minItems: 8,
      maxItems: 12,
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
          type: { type: "string", enum: ["Notes", "Cheat Sheet", "eBook", "Video Series", "Documentation"] },
          subject: { type: "string" },
          branch: { type: "string" },
          url: { type: "string" },
        },
        required: ["id", "title", "type", "subject", "branch", "url"],
        additionalProperties: false,
      },
    },
    mockTests: {
      type: "array",
      minItems: 5,
      maxItems: 8,
      description: "Each test must include 5 questions with one correct answer index.",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
          topic: { type: "string" },
          difficulty: { type: "string", enum: ["Beginner", "Intermediate", "Advanced"] },
          duration: { type: "string" },
          questions: {
            type: "array",
            minItems: 5,
            maxItems: 5,
            items: {
              type: "object",
              properties: {
                q: { type: "string" },
                options: { type: "array", minItems: 4, maxItems: 4, items: { type: "string" } },
                answer: { type: "integer", minimum: 0, maximum: 3 },
              },
              required: ["q", "options", "answer"],
              additionalProperties: false,
            },
          },
        },
        required: ["id", "title", "topic", "difficulty", "duration", "questions"],
        additionalProperties: false,
      },
    },
    skillGaps: {
      type: "array",
      minItems: 6,
      maxItems: 10,
      description: "Skills required for the student's target career vs what they currently have. Mark as complete if they listed the skill, in-progress if related, missing otherwise.",
      items: {
        type: "object",
        properties: {
          skill: { type: "string" },
          current: { type: "integer", minimum: 0, maximum: 100 },
          required: { type: "integer", minimum: 50, maximum: 100 },
          status: { type: "string", enum: ["missing", "in-progress", "complete"] },
        },
        required: ["skill", "current", "required", "status"],
        additionalProperties: false,
      },
    },
  },
  required: ["careerPaths", "courses", "videoLectures", "studyMaterials", "mockTests", "skillGaps"],
  additionalProperties: false,
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { profile } = await req.json();
    if (!profile?.branch) {
      return new Response(JSON.stringify({ error: "Profile branch is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const systemPrompt = `You are CareerPilot AI's content generator for Indian engineering students.

Generate HIGHLY PERSONALISED content for the student below. EVERY item must be specific to their branch and interests.

CRITICAL RULES:
- If branch is Civil Engineering → roles like Structural Engineer, BIM Engineer, Site Engineer, Transportation Planner; NEVER Full Stack Developer or AI Engineer.
- If branch is Mechanical Engineering → Design Engineer, CAD/CAM, Automotive, Thermal, Robotics; NEVER pure web dev unless they explicitly listed it.
- If branch is Electrical → Power Systems, EV, Smart Grid, Embedded; courses about MATLAB, ETAP, PLC.
- If branch is Electronics → VLSI, Embedded, IoT, Signal Processing.
- If branch is Computer/IT → use the listed skills/interests to choose between AI, Web, Cloud, Cybersecurity etc.
- Prefer real, working URLs (Coursera, Udemy, YouTube, NPTEL, MIT OCW, Autodesk, MathWorks docs, freeCodeCamp).
- Skill gaps: skills the student already lists → status "complete" with current ~80-95. Skills closely related → "in-progress" 40-65. Critical missing skills for their target → "missing" 0-25.
- Roadmap: first 1-2 steps "complete" if their existing skills cover them, 1-2 "in-progress", rest "upcoming".
- Mock test questions must be branch-specific and technically correct.
- Use INR salary ranges (LPA).
- Return STRICTLY in the tool schema, no extra prose.`;

    const userPrompt = `Generate content for this student:
- Name: ${profile.full_name || "Student"}
- Branch: ${profile.branch}
- Year: ${profile.year || "Not specified"}
- Current skills: ${(profile.current_skills || []).join(", ") || "None"}
- Interests: ${(profile.interests || []).join(", ") || "None"}
- Career goal: ${profile.career_goal || "Open / not specified"}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [{
          type: "function",
          function: {
            name: "emit_content",
            description: "Emit personalised CareerPilot content for the student.",
            parameters: TOOL_SCHEMA,
          },
        }],
        tool_choice: { type: "function", function: { name: "emit_content" } },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error", response.status, errText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again in a minute." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Add credits to continue." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response", JSON.stringify(data).slice(0, 500));
      return new Response(JSON.stringify({ error: "Model did not return structured content" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let parsed: any;
    try {
      parsed = JSON.parse(toolCall.function.arguments);
    } catch (e) {
      console.error("Bad JSON from model", toolCall.function.arguments?.slice(0, 500));
      return new Response(JSON.stringify({ error: "Model returned invalid JSON" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ content: parsed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
