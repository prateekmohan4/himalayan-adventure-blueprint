import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.55.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface UserPreferences {
  experienceLevel: string;
  difficulty: string;
  duration: string;
  budget: string;
  interests: string[];
  season: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { preferences }: { preferences: UserPreferences } = await req.json();
    
    console.log("Received preferences:", preferences);

    // Get Lovable API Key
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Get Supabase credentials
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all active treks
    const { data: treks, error: treksError } = await supabase
      .from("treks")
      .select("*")
      .eq("is_active", true);

    if (treksError) {
      console.error("Error fetching treks:", treksError);
      throw new Error("Failed to fetch treks");
    }

    console.log(`Fetched ${treks?.length || 0} active treks`);

    // Build the prompt for AI
    const systemPrompt = `You are an expert trek recommendation system for Himalayan Adventures. 
Analyze user preferences and match them with available treks to provide personalized recommendations.

User Preferences:
- Experience Level: ${preferences.experienceLevel}
- Preferred Difficulty: ${preferences.difficulty}
- Duration: ${preferences.duration}
- Budget Range: ${preferences.budget}
- Interests: ${preferences.interests.join(", ")}
- Preferred Season: ${preferences.season}

Available Treks:
${JSON.stringify(treks, null, 2)}

Recommend the top 3 most suitable treks. For each trek, provide:
1. Match score (0-100)
2. Key reasons why it matches their preferences
3. Any considerations or tips

Return your response as a structured recommendation.`;

    const userPrompt = "Based on my preferences, recommend the best treks for me.";

    // Call Lovable AI Gateway with tool calling for structured output
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "recommend_treks",
              description: "Provide trek recommendations with match scores and reasons",
              parameters: {
                type: "object",
                properties: {
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        trekId: { type: "string" },
                        trekTitle: { type: "string" },
                        matchScore: { type: "number" },
                        reasons: {
                          type: "array",
                          items: { type: "string" }
                        },
                        considerations: { type: "string" }
                      },
                      required: ["trekId", "trekTitle", "matchScore", "reasons"],
                      additionalProperties: false
                    }
                  }
                },
                required: ["recommendations"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "recommend_treks" } }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "Out of credits. Please add funds to your Lovable workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    console.log("AI response received");

    // Extract recommendations from tool call
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    const recommendations = toolCall?.function?.arguments 
      ? JSON.parse(toolCall.function.arguments).recommendations 
      : [];

    // Enrich recommendations with full trek data
    const enrichedRecommendations = recommendations.map((rec: any) => {
      const trek = treks?.find(t => t.id === rec.trekId);
      return {
        ...rec,
        trek: trek || null
      };
    });

    return new Response(
      JSON.stringify({ 
        success: true,
        recommendations: enrichedRecommendations 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );

  } catch (error) {
    console.error("Error in ai-trek-recommender:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred",
        success: false
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
