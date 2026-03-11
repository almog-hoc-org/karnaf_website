import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const STORAGE_KEY = "karnaf-welcome-shown";

const WelcomePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-md text-right" dir="rtl">
        <DialogHeader className="items-center gap-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <GraduationCap className="h-7 w-7 text-primary" />
          </div>
          <DialogTitle className="text-xl text-center">
            🎉 האתר החדש שלנו באוויר!
          </DialogTitle>
          <DialogDescription className="text-center text-base leading-relaxed">
            תלמידים ותיקים יקרים — הגישה שלכם לפורטל הקורסים באתר הישן קיימת
            בלחיצה על הכפתור{" "}
            <strong className="text-primary">״אזור תלמידים״</strong> שנמצא
            בצד שמאל למעלה.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={handleClose} className="w-full mt-2 font-bold">
          הבנתי, תודה! 🙌
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;
