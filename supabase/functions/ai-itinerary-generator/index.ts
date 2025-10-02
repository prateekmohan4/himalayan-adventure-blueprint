import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.55.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ItineraryRequest {
  trekId: string;
  customDays?: number;
  interests?: string[];
  fitnessLevel?: string;
  specialRequests?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { trekId, customDays, interests, fitnessLevel, specialRequests }: ItineraryRequest = await req.json();
    
    console.log("Generating itinerary for trek:", trekId);

    // Get Lovable API Key
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Get Supabase credentials
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch trek details
    const { data: trek, error: trekError } = await supabase
      .from("treks")
      .select("*")
      .eq("id", trekId)
      .single();

    if (trekError || !trek) {
      console.error("Error fetching trek:", trekError);
      throw new Error("Trek not found");
    }

    console.log("Trek found:", trek.title);

    // Build the prompt for AI
    const systemPrompt = `You are an expert trek itinerary planner for Himalayan Adventures. 
Create a detailed, day-by-day itinerary for the following trek, customized to the user's preferences.

Trek Information:
- Title: ${trek.title}
- Duration: ${customDays || trek.duration_days} days
- Difficulty: ${trek.difficulty_level}
- Max Altitude: ${trek.max_altitude}m
- Overview: ${trek.overview}
- Highlights: ${trek.highlights?.join(", ")}
${trek.itinerary ? `- Existing Itinerary: ${JSON.stringify(trek.itinerary)}` : ""}

User Customization:
${interests?.length ? `- Special Interests: ${interests.join(", ")}` : ""}
${fitnessLevel ? `- Fitness Level: ${fitnessLevel}` : ""}
${specialRequests ? `- Special Requests: ${specialRequests}` : ""}

Create a comprehensive itinerary in markdown format that includes:
1. Day-by-day breakdown with timing
2. Activities and distances
3. Photography tips for scenic spots
4. Acclimatization advice
5. Important safety considerations
6. Recommended packing list specific to this trek
7. Local cultural insights

Make it engaging, informative, and tailored to their preferences.`;

    const userPrompt = "Generate my personalized itinerary.";

    // Call Lovable AI Gateway with streaming
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
        stream: true,
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

    console.log("Streaming itinerary generation started");

    // Stream the response back to client
    return new Response(aiResponse.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error) {
    console.error("Error in ai-itinerary-generator:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred"
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
