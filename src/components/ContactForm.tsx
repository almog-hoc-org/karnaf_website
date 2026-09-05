import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitWebsiteLead } from "@/lib/leadSubmission";
import { isValidIsraeliPhone, PHONE_ERROR_MESSAGE } from "@/lib/validation";

export interface ServiceOption {
  value: string;
  label: string;
}

const DEFAULT_SERVICE_OPTIONS: ServiceOption[] = [
  { value: "derech", label: 'תוכנית "המדריך המעשי לרכישת דירה"' },
  { value: "webinar", label: "וובינר" },
];

interface ContactFormProps {
  /** Lead source label reported to the CRM + pixels (see FORM_LABELS in lib/pixel.ts). */
  source?: string;
  /** Options for the "אני מעוניין ב..." select. Pass null to hide the select
   * (e.g. on a service page where the interest is already known). */
  serviceOptions?: ServiceOption[] | null;
  /** Preselected service value reported with the lead when the select is hidden. */
  fixedService?: string;
  /** Submit button text. */
  submitLabel?: string;
  /** "row" lays name + phone + button on one line (wide placements). */
  layout?: "stack" | "row";
  /** Render on a dark surface. */
  dark?: boolean;
}

/**
 * The site's lead form — short on purpose (name + phone + interest).
 * Validates Israeli phone numbers client-side and carries a honeypot
 * field to keep bot submissions out of the CRM.
 */
const ContactForm = ({
  source = "website",
  serviceOptions = DEFAULT_SERVICE_OPTIONS,
  fixedService = "",
  submitLabel = "בואו נדבר — בלי התחייבות",
  layout = "stack",
  dark = false,
}: ContactFormProps) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [company, setCompany] = useState(""); // honeypot — humans never see it
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast({ title: "נא למלא שם וטלפון", variant: "destructive" });
      return;
    }
    if (!isValidIsraeliPhone(phone)) {
      toast({ title: PHONE_ERROR_MESSAGE, variant: "destructive" });
      return;
    }
    const serviceValue = serviceOptions ? service : fixedService;
    const thankYou = `/thank-you?src=${encodeURIComponent(source)}&service=${encodeURIComponent(serviceValue)}`;

    if (company.trim()) {
      // Honeypot filled — almost certainly a bot. Pretend success, submit nothing.
      navigate(thankYou);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitWebsiteLead({
        name,
        phone,
        service: serviceValue,
        source,
      });
      // A dedicated URL: the ad platforms get a conversion page, the visitor
      // gets a next step instead of a form that wipes itself after 3s.
      setIsSubmitted(true);
      navigate(thankYou);
    } catch {
      toast({ title: "שגיאה בשליחה", description: "נסו שוב או צרו קשר בוואטסאפ.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-12 bg-card/50 rounded-2xl border border-border"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <CheckCircle className="w-16 h-16 text-accent" />
        </motion.div>
        <p className="text-foreground text-xl font-bold">תודה רבה!</p>
        <p className="text-muted-foreground">ניצור איתך קשר בהקדם</p>
      </motion.div>
    );
  }

  const row = layout === "row";
  const inputClass = `${dark ? "bg-white/95 border-white/10 text-foreground" : "bg-card border-border"} ${
    row ? "h-12" : "h-14"
  } px-5 rounded-full text-right`;

  return (
    <form
      className={row ? "flex flex-col sm:flex-row gap-3 relative" : "space-y-4 relative"}
      onSubmit={handleSubmit}
    >
      <Input
        autoComplete="name"
        placeholder={row ? "שם" : "שם מלא"}
        aria-label="שם מלא"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`${inputClass} ${row ? "sm:flex-1" : ""}`}
      />
      <Input
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        placeholder="טלפון"
        aria-label="מספר טלפון"
        required
        dir="ltr"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={`${inputClass} ${row ? "sm:flex-1" : ""}`}
      />
      {/* Honeypot — hidden from humans and screen readers, attractive to bots */}
      <div className="absolute w-px h-px overflow-hidden -m-px" aria-hidden="true">
        <label>
          חברה
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      </div>
      {serviceOptions && (
        <Select value={service} onValueChange={setService}>
          <SelectTrigger aria-label="במה אני מעוניין" className="bg-card border-border h-14 px-5 rounded-full">
            <SelectValue placeholder="אני מעוניין ב..." />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className={`bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2 rounded-full ${
          row ? "h-12 px-6 whitespace-nowrap" : "w-full h-14 text-lg"
        }`}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send size={18} />
            {submitLabel}
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
