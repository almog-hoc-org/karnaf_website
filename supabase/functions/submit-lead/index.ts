import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // --- Rate limiting (5 submissions per hour per IP) ---
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
      || req.headers.get("cf-connecting-ip") 
      || "unknown";
    
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", clientIP)
      .eq("endpoint", "submit-lead")
      .gte("created_at", oneHourAgo);

    if ((count ?? 0) >= 5) {
      return new Response(
        JSON.stringify({ error: "יותר מדי בקשות. נסו שוב מאוחר יותר." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record this request for rate limiting
    await supabase.from("rate_limits").insert({ ip_address: clientIP, endpoint: "submit-lead" });

    // --- Parse and validate input ---
    const { name, phone, email, service, source } = await req.json();

    if (!name || !phone) {
      return new Response(
        JSON.stringify({ error: "שם וטלפון הם שדות חובה" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Save lead to database
    const { error: dbError } = await supabase.from("leads").insert({
      name,
      phone,
      email: email || null,
      service: service || null,
      source: source || "website",
    });

    if (dbError) {
      console.error("DB error:", dbError);
      throw new Error("Failed to save lead");
    }

    // 2. Send email notification via Resend
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      try {
        const serviceLabel =
          service === "derech" ? "הדרך לדירה" :
          service === "premium" ? "ליווי קרנף פרימיום" :
          service === "both" ? "שניהם" : "לא צוין";

        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "Karnaf Leads <onboarding@resend.dev>",
            to: ["karnaf.yazamut@gmail.com"],
            subject: `🦏 ליד חדש מהאתר: ${name}`,
            html: `
              <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 500px;">
                <h2 style="color: #e8590c;">🦏 ליד חדש מאתר קרנף!</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">שם</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
                  <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">טלפון</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
                  <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">אימייל</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email || "לא צוין"}</td></tr>
                  <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">שירות</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${serviceLabel}</td></tr>
                  <tr><td style="padding: 8px; font-weight: bold;">מקור</td><td style="padding: 8px;">${source || "website"}</td></tr>
                </table>
              </div>
            `,
          }),
        });

        if (!emailRes.ok) {
          const errBody = await emailRes.text();
          console.error("Resend error:", errBody);
        }
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }
    }

    // 3. Append to Google Sheets via Google Sheets API
    const googleKey = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
    const sheetId = Deno.env.get("GOOGLE_SHEET_ID");

    if (googleKey && sheetId) {
      try {
        // Parse the service account JSON key
        let serviceAccount;
        try {
          serviceAccount = JSON.parse(googleKey);
        } catch {
          const cleaned = googleKey.replace(/\\n/g, '\n');
          serviceAccount = JSON.parse(cleaned);
        }
        const token = await getGoogleAccessToken(serviceAccount);

        const now = new Date().toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" });
        const serviceLabel =
          service === "derech" ? "הדרך לדירה" :
          service === "premium" ? "ליווי קרנף פרימיום" :
          service === "both" ? "שניהם" : "לא צוין";

        const sheetsRes = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent("גיליון1")}!A:F:append?valueInputOption=USER_ENTERED`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              values: [[now, name, phone, email || "", serviceLabel, source || "website"]],
            }),
          }
        );

        if (!sheetsRes.ok) {
          const errBody = await sheetsRes.text();
          console.error("Sheets error:", errBody);
        }
      } catch (sheetsErr) {
        console.error("Sheets append error:", sheetsErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("submit-lead error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Helper: base64url encode (JWT requires this, not standard base64)
function base64url(input: string | Uint8Array): string {
  let b64: string;
  if (typeof input === "string") {
    b64 = btoa(input);
  } else {
    b64 = btoa(String.fromCharCode(...input));
  }
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Helper: Get Google access token from service account
async function getGoogleAccessToken(serviceAccount: { client_email: string; private_key: string }): Promise<string> {
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const now = Math.floor(Date.now() / 1000);
  const claimSet = base64url(
    JSON.stringify({
      iss: serviceAccount.client_email,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  );

  const textEncoder = new TextEncoder();
  const inputStr = `${header}.${claimSet}`;

  // Import the private key
  const pemContent = serviceAccount.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\n/g, "");
  const binaryKey = Uint8Array.from(atob(pemContent), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    textEncoder.encode(inputStr)
  );

  const sig = base64url(new Uint8Array(signature));
  const jwt = `${header}.${claimSet}.${sig}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    console.error("Google token error:", JSON.stringify(tokenData));
  }
  return tokenData.access_token;
}
