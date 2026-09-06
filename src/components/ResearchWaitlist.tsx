import { useState } from "react";
import { Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/v2/Reveal";
import { submitWebsiteLead } from "@/lib/leadSubmission";
import { isValidIsraeliPhone } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

/**
 * Waitlist for the research subscription (a product that is still in
 * development). It lives on /about rather than on the homepage: a cold
 * visitor's first form should capture a lead for something that exists.
 */
const ResearchWaitlistForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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
      toast({ title: "מספר הטלפון לא תקין", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await submitWebsiteLead({
        name,
        phone,
        service: "waitlist",
        source: "research-waitlist",
        message: "הרשמה לרשימת המתנה — מערכת המחקר במנוי חודשי",
      });
      setIsSubmitted(true);
    } catch {
      toast({
        title: "שגיאה בשליחה",
        description: "נסו שוב או דברו איתנו בוואטסאפ.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <CheckCircle size={18} className="text-accent shrink-0" />
        נרשמתם! נעדכן אתכם ברגע שהמערכת עולה לאוויר.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
    >
      <Input
        autoComplete="name"
        placeholder="שם"
        aria-label="שם"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="h-11 rounded-full px-5 bg-background sm:w-36"
      />
      <Input
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        dir="ltr"
        placeholder="טלפון"
        aria-label="מספר טלפון"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="h-11 rounded-full px-5 bg-background sm:w-40 text-right"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        variant="outline"
        className="h-11 rounded-full px-6 font-bold border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground whitespace-nowrap"
      >
        {isSubmitting ? "שולח..." : "עדכנו אותי"}
      </Button>
    </form>
  );
};

/** The full "coming soon" strip — headline + form. */
export const ResearchWaitlistStrip = () => (
  <Reveal>
    <div className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-5 flex flex-col lg:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-center lg:text-right">
        <span className="hidden sm:inline-flex w-9 h-9 rounded-full bg-accent/10 items-center justify-center shrink-0">
          <Sparkles size={16} className="text-accent" />
        </span>
        <p className="text-sm md:text-base text-foreground">
          <span className="font-bold text-accent ml-1">בקרוב:</span>
          <span className="font-bold">
            {" "}מערכת מחקר נדל״ן מקצועית במנוי חודשי.
          </span>{" "}
          <span className="text-muted-foreground">
            רוצים להיות ראשונים לדעת?
          </span>
        </p>
      </div>
      <ResearchWaitlistForm />
    </div>
  </Reveal>
);

export default ResearchWaitlistForm;
