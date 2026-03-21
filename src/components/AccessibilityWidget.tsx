import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accessibility,
  X,
  ZoomIn,
  ZoomOut,
  Type,
  Contrast,
  MousePointer,
  Link2,
  Pause,
  RotateCcw,
  Eye,
  Brain,
  Zap,
  Palette,
  Space,
  FileText,
} from "lucide-react";
import AccessibilityStatement from "./AccessibilityStatement";

interface AccessibilitySettings {
  fontSize: number; // 0 = default, 1-5 levels
  lineHeight: boolean;
  readableFont: boolean;
  highContrast: boolean;
  invertColors: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  largeCursor: boolean;
  stopAnimations: boolean;
  // profiles
  colorBlindProfile: boolean;
  adhdProfile: boolean;
  epilepsyProfile: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 0,
  lineHeight: false,
  readableFont: false,
  highContrast: false,
  invertColors: false,
  grayscale: false,
  highlightLinks: false,
  largeCursor: false,
  stopAnimations: false,
  colorBlindProfile: false,
  adhdProfile: false,
  epilepsyProfile: false,
};

const STORAGE_KEY = "karnaf-accessibility";

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showStatement, setShowStatement] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Apply settings to document
  const applySettings = useCallback((s: AccessibilitySettings) => {
    const html = document.documentElement;
    const body = document.body;

    // Font size
    html.style.fontSize = s.fontSize > 0 ? `${100 + s.fontSize * 15}%` : "";

    // Line height
    body.classList.toggle("a11y-line-height", s.lineHeight);

    // Readable font
    body.classList.toggle("a11y-readable-font", s.readableFont);

    // High contrast
    body.classList.toggle("a11y-high-contrast", s.highContrast);

    // Invert colors
    body.classList.toggle("a11y-invert-colors", s.invertColors);

    // Grayscale
    body.classList.toggle("a11y-grayscale", s.grayscale);

    // Highlight links
    body.classList.toggle("a11y-highlight-links", s.highlightLinks);

    // Large cursor
    body.classList.toggle("a11y-large-cursor", s.largeCursor);

    // Stop animations
    body.classList.toggle("a11y-stop-animations", s.stopAnimations);

    // Profiles
    body.classList.toggle("a11y-colorblind", s.colorBlindProfile);
    body.classList.toggle("a11y-adhd", s.adhdProfile);
    body.classList.toggle("a11y-epilepsy", s.epilepsyProfile);
  }, []);

  useEffect(() => {
    applySettings(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings, applySettings]);

  const update = (key: keyof AccessibilitySettings, value: boolean | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetAll = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const hasActiveSettings = Object.entries(settings).some(
    ([key, val]) => val !== DEFAULT_SETTINGS[key as keyof AccessibilitySettings]
  );

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="פתח תפריט נגישות"
        title="נגישות"
      >
        <Accessibility className="w-6 h-6" />
        {hasActiveSettings && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-destructive" />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-[70] w-[340px] max-w-[90vw] bg-card shadow-2xl overflow-y-auto"
              dir="rtl"
              role="dialog"
              aria-label="תפריט נגישות"
            >
              {/* Header */}
              <div className="sticky top-0 bg-card z-10 flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Accessibility className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-bold text-foreground">תפריט נגישות</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="סגור תפריט נגישות"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="p-4 space-y-5">
                {/* Reset */}
                {hasActiveSettings && (
                  <button
                    onClick={resetAll}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors text-sm font-medium"
                  >
                    <RotateCcw className="w-4 h-4" />
                    איפוס כל ההגדרות
                  </button>
                )}

                {/* Text adjustments */}
                <Section title="התאמות תוכן">
                  <div className="flex items-center gap-2">
                    <ToggleButton
                      icon={<ZoomOut className="w-4 h-4" />}
                      label="הקטן"
                      active={false}
                      onClick={() => update("fontSize", Math.max(0, settings.fontSize - 1))}
                      disabled={settings.fontSize <= 0}
                    />
                    <span className="flex-1 text-center text-sm text-muted-foreground">
                      גודל טקסט {settings.fontSize > 0 ? `+${settings.fontSize}` : "רגיל"}
                    </span>
                    <ToggleButton
                      icon={<ZoomIn className="w-4 h-4" />}
                      label="הגדל"
                      active={false}
                      onClick={() => update("fontSize", Math.min(5, settings.fontSize + 1))}
                      disabled={settings.fontSize >= 5}
                    />
                  </div>
                  <ToggleRow
                    icon={<Space className="w-4 h-4" />}
                    label="מרווח שורות"
                    active={settings.lineHeight}
                    onClick={() => update("lineHeight", !settings.lineHeight)}
                  />
                  <ToggleRow
                    icon={<Type className="w-4 h-4" />}
                    label="גופן קריא (דיסלקסיה)"
                    active={settings.readableFont}
                    onClick={() => update("readableFont", !settings.readableFont)}
                  />
                </Section>

                {/* Color adjustments */}
                <Section title="התאמות צבעים">
                  <ToggleRow
                    icon={<Contrast className="w-4 h-4" />}
                    label="ניגודיות גבוהה"
                    active={settings.highContrast}
                    onClick={() => update("highContrast", !settings.highContrast)}
                  />
                  <ToggleRow
                    icon={<Palette className="w-4 h-4" />}
                    label="היפוך צבעים"
                    active={settings.invertColors}
                    onClick={() => update("invertColors", !settings.invertColors)}
                  />
                  <ToggleRow
                    icon={<Eye className="w-4 h-4" />}
                    label="גווני אפור"
                    active={settings.grayscale}
                    onClick={() => update("grayscale", !settings.grayscale)}
                  />
                </Section>

                {/* Navigation */}
                <Section title="ניווט ותנועה">
                  <ToggleRow
                    icon={<Link2 className="w-4 h-4" />}
                    label="הדגשת קישורים"
                    active={settings.highlightLinks}
                    onClick={() => update("highlightLinks", !settings.highlightLinks)}
                  />
                  <ToggleRow
                    icon={<MousePointer className="w-4 h-4" />}
                    label="סמן מוגדל"
                    active={settings.largeCursor}
                    onClick={() => update("largeCursor", !settings.largeCursor)}
                  />
                  <ToggleRow
                    icon={<Pause className="w-4 h-4" />}
                    label="עצירת אנימציות"
                    active={settings.stopAnimations}
                    onClick={() => update("stopAnimations", !settings.stopAnimations)}
                  />
                </Section>

                {/* Profiles */}
                <Section title="פרופילים מוכנים">
                  <ToggleRow
                    icon={<Palette className="w-4 h-4" />}
                    label="עיוורון צבעים"
                    active={settings.colorBlindProfile}
                    onClick={() => update("colorBlindProfile", !settings.colorBlindProfile)}
                  />
                  <ToggleRow
                    icon={<Brain className="w-4 h-4" />}
                    label="ADHD — ריכוז"
                    active={settings.adhdProfile}
                    onClick={() => update("adhdProfile", !settings.adhdProfile)}
                  />
                  <ToggleRow
                    icon={<Zap className="w-4 h-4" />}
                    label="אפילפסיה — ללא הבהובים"
                    active={settings.epilepsyProfile}
                    onClick={() => update("epilepsyProfile", !settings.epilepsyProfile)}
                  />
                </Section>

                {/* Accessibility statement */}
                <button
                  onClick={() => {
                    setShowStatement(true);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm font-medium text-foreground"
                >
                  <FileText className="w-4 h-4" />
                  הצהרת נגישות
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  תקן IS 5568 | WCAG 2.1 AA
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Statement modal */}
      <AnimatePresence>
        {showStatement && (
          <AccessibilityStatement onClose={() => setShowStatement(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

/* Sub-components */

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-sm font-semibold text-muted-foreground mb-2">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
);

const ToggleRow = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring ${
      active
        ? "border-primary bg-primary/10 text-primary"
        : "border-border bg-card text-foreground hover:bg-muted"
    }`}
    aria-pressed={active}
  >
    {icon}
    <span className="flex-1 text-right">{label}</span>
    <span
      className={`w-8 h-5 rounded-full transition-colors flex items-center ${
        active ? "bg-primary justify-start" : "bg-muted-foreground/30 justify-end"
      }`}
      dir="ltr"
    >
      <span
        className={`w-3.5 h-3.5 rounded-full bg-card shadow mx-0.5 transition-transform`}
      />
    </span>
  </button>
);

const ToggleButton = ({
  icon,
  label,
  active,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-30 disabled:cursor-not-allowed ${
      active
        ? "border-primary bg-primary/10 text-primary"
        : "border-border bg-card text-foreground hover:bg-muted"
    }`}
    aria-label={label}
    title={label}
  >
    {icon}
  </button>
);

export default AccessibilityWidget;
