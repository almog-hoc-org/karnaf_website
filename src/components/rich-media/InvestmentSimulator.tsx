import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart3, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const formatCurrency = (n: number) => new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(n);

const InvestmentSimulator = () => {
  const [investment, setInvestment] = useState(800000);
  const [rent, setRent] = useState(3500);
  const [appreciation, setAppreciation] = useState(4);
  const [holdYears, setHoldYears] = useState(10);

  const result = useMemo(() => {
    const karnafBoost = 1.5; // 50% better results with Karnaf
    const marketAppreciation = appreciation;
    const karnafAppreciation = appreciation * karnafBoost * 0.85;

    const chartData = [];
    let marketValue = investment;
    let karnafValue = investment;
    let marketTotalRent = 0;
    let karnafTotalRent = 0;

    for (let year = 0; year <= holdYears; year++) {
      chartData.push({
        year: `שנה ${year}`,
        market: Math.round(marketValue + marketTotalRent),
        karnaf: Math.round(karnafValue + karnafTotalRent),
      });
      marketValue *= 1 + marketAppreciation / 100;
      karnafValue *= 1 + karnafAppreciation / 100;
      marketTotalRent += rent * 12;
      karnafTotalRent += rent * karnafBoost * 12;
    }

    const marketTotal = Math.round(marketValue + marketTotalRent);
    const karnafTotal = Math.round(karnafValue + karnafTotalRent);
    const marketROI = ((marketTotal - investment) / investment * 100).toFixed(1);
    const karnafROI = ((karnafTotal - investment) / investment * 100).toFixed(1);
    const diff = karnafTotal - marketTotal;

    return { chartData, marketTotal, karnafTotal, marketROI, karnafROI, diff };
  }, [investment, rent, appreciation, holdYears]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <BarChart3 size={20} />
        </div>
        <div>
          <h3 className="text-foreground font-bold text-xl">סימולטור השקעות</h3>
          <p className="text-muted-foreground text-sm">השוו תשואות — עם וללא ליווי קרנף</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <SimSlider label="סכום השקעה" value={investment} min={300000} max={3000000} step={50000} format={formatCurrency} onChange={setInvestment} />
          <SimSlider label="שכירות חודשית" value={rent} min={1500} max={10000} step={250} format={formatCurrency} onChange={setRent} />
          <SimSlider label="עליית ערך שנתית" value={appreciation} min={1} max={10} step={0.5} format={(v) => `${v}%`} onChange={setAppreciation} />
          <SimSlider label="תקופת החזקה" value={holdYears} min={3} max={20} step={1} format={(v) => `${v} שנים`} onChange={setHoldYears} />
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3 border border-border bg-background text-center">
              <p className="text-xs text-muted-foreground mb-1">ממוצע שוק</p>
              <p className="font-bold text-lg text-foreground">{formatCurrency(result.marketTotal)}</p>
              <p className="text-xs text-muted-foreground">תשואה {result.marketROI}%</p>
            </div>
            <div className="rounded-xl p-3 border border-primary/30 bg-primary/10 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Sparkles size={10} className="text-primary" />
                <p className="text-xs text-primary font-medium">עם ליווי קרנף</p>
              </div>
              <p className="font-bold text-lg text-primary">{formatCurrency(result.karnafTotal)}</p>
              <p className="text-xs text-primary/70">תשואה {result.karnafROI}%</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-xl p-4 border border-primary/20 bg-primary/5 text-center"
          >
            <p className="text-sm text-muted-foreground">ההפרש לטובתכם</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(result.diff)}</p>
          </motion.div>

          <div className="bg-background rounded-xl p-4 border border-border">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={result.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: "hsl(215 16% 47%)" }} interval={Math.max(1, Math.floor(holdYears / 5))} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215 16% 47%)" }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(220 13% 90%)", borderRadius: 8, fontSize: 12, color: "hsl(215 40% 20%)" }}
                  formatter={(value: number, name: string) => [formatCurrency(value), name === "karnaf" ? "עם קרנף" : "ממוצע שוק"]}
                />
                <Legend formatter={(value) => (value === "karnaf" ? "עם קרנף" : "ממוצע שוק")} />
                <Line type="monotone" dataKey="market" stroke="hsl(215 16% 47%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="karnaf" stroke="hsl(25 100% 50%)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SimSlider = ({
  label, value, min, max, step, format, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number; format: (v: number) => string; onChange: (v: number) => void;
}) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-bold text-primary">{format(value)}</span>
    </div>
    <Slider value={[value]} min={min} max={max} step={step} onValueChange={([v]) => onChange(v)} className="cursor-pointer" />
  </div>
);

export default InvestmentSimulator;
