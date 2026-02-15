import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const formatCurrency = (n: number) => new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(n);

const MortgageCalculator = () => {
  const [price, setPrice] = useState(1500000);
  const [downPercent, setDownPercent] = useState(25);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(25);

  const result = useMemo(() => {
    const loanAmount = price * (1 - downPercent / 100);
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    const monthly = monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;
    const totalPaid = monthly * numPayments;
    const totalInterest = totalPaid - loanAmount;

    const chartData = [];
    let remainingPrincipal = loanAmount;
    let totalInterestPaid = 0;
    for (let year = 0; year <= years; year += 1) {
      chartData.push({
        year: `שנה ${year}`,
        principal: Math.round(loanAmount - remainingPrincipal),
        interest: Math.round(totalInterestPaid),
      });
      for (let m = 0; m < 12 && year < years; m++) {
        const interestPayment = remainingPrincipal * monthlyRate;
        const principalPayment = monthly - interestPayment;
        remainingPrincipal -= principalPayment;
        totalInterestPaid += interestPayment;
      }
    }

    return { loanAmount, monthly, totalPaid, totalInterest, chartData };
  }, [price, downPercent, rate, years]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <Calculator size={20} />
        </div>
        <div>
          <h3 className="text-foreground font-bold text-xl">מחשבון משכנתא</h3>
          <p className="text-muted-foreground text-sm">גלו כמה תשלמו בחודש</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <SliderInput
            label="מחיר הנכס"
            value={price}
            min={500000}
            max={5000000}
            step={50000}
            format={formatCurrency}
            onChange={setPrice}
          />
          <SliderInput
            label="הון עצמי"
            value={downPercent}
            min={10}
            max={70}
            step={5}
            format={(v) => `${v}%`}
            onChange={setDownPercent}
          />
          <SliderInput
            label="ריבית שנתית"
            value={rate}
            min={2}
            max={8}
            step={0.1}
            format={(v) => `${v}%`}
            onChange={setRate}
          />
          <SliderInput
            label="תקופת הלוואה"
            value={years}
            min={5}
            max={30}
            step={1}
            format={(v) => `${v} שנים`}
            onChange={setYears}
          />
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="החזר חודשי" value={formatCurrency(result.monthly)} primary />
            <ResultCard label="סכום הלוואה" value={formatCurrency(result.loanAmount)} />
            <ResultCard label="סה״כ ריבית" value={formatCurrency(result.totalInterest)} />
            <ResultCard label="עלות כוללת" value={formatCurrency(result.totalPaid)} />
          </div>

          <div className="bg-background rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
              <TrendingUp size={14} className="text-primary" />
              <span>פילוח קרן vs ריבית</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={result.chartData}>
                <defs>
                  <linearGradient id="principalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(25 100% 50%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(25 100% 50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="interestGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0 80% 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(0 80% 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 90%)" />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: "hsl(215 16% 47%)" }} interval={4} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215 16% 47%)" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(220 13% 90%)", borderRadius: 8, fontSize: 12, color: "hsl(215 40% 20%)" }}
                  formatter={(value: number, name: string) => [formatCurrency(value), name === "principal" ? "קרן" : "ריבית"]}
                />
                <Area type="monotone" dataKey="principal" stroke="hsl(25 100% 50%)" fill="url(#principalGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="interest" stroke="hsl(0 80% 55%)" fill="url(#interestGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SliderInput = ({
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

const ResultCard = ({ label, value, primary }: { label: string; value: string; primary?: boolean }) => (
  <div className={`rounded-xl p-3 border text-center ${primary ? "bg-primary/10 border-primary/30" : "bg-background border-border"}`}>
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className={`font-bold text-lg ${primary ? "text-primary" : "text-foreground"}`}>{value}</p>
  </div>
);

export default MortgageCalculator;
