const CRM_WEBSITE_LEADS_URL = "https://svkzkpgccahwmyflobvn.functions.supabase.co/website-leads-intake";

export interface WebsiteLeadPayload {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  source: string;
  stage?: string;
  equity?: string;
  message?: string;
}

export async function submitWebsiteLead(payload: WebsiteLeadPayload): Promise<void> {
  const response = await fetch(CRM_WEBSITE_LEADS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = "Lead submission failed";
    try {
      const data = await response.json();
      if (typeof data?.error === "string") errorMessage = data.error;
    } catch {
      // Keep the generic error.
    }
    throw new Error(errorMessage);
  }
}
