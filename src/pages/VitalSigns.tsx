import { useState } from "react";
import BackLink from "@/components/BackLink";
import { AlertTriangle, Heart, Baby, Users, FlaskConical, ShieldAlert } from "lucide-react";

type VitalRow = { param: string; normal?: string; warning?: string; notes?: string };

const adultGeneral: VitalRow[] = [
  { param: "Blood Pressure", normal: "90–120 / 60–80 mmHg", warning: ">180 / <90 systolic" },
  { param: "Pulse (Heart Rate)", normal: "60–100 bpm", warning: ">130 or <40 bpm" },
  { param: "Respiratory Rate", normal: "12–20 breaths/min", warning: ">30 or <8" },
  { param: "Body Temperature", normal: "36.1–37.2 °C", warning: ">39 °C or <35 °C" },
  { param: "SpO₂ (Oxygen Sat.)", normal: "95–100%", warning: "<90%" },
  { param: "Blood Sugar (Random)", normal: "70–140 mg/dL", warning: ">300 or <60 mg/dL" },
  { param: "GCS (Glasgow Coma)", normal: "15 (fully alert)", warning: "≤8 (severe brain injury)" },
  { param: "Capillary Refill", normal: "<2 seconds", warning: ">3 seconds (poor perfusion)" },
  { param: "Urine Output", normal: "0.5–1 mL/kg/hr", warning: "<0.5 mL/kg/hr (kidney failure risk)" },
];

const adultMale: VitalRow[] = [
  { param: "Hemoglobin", normal: "13.5–17.5 g/dL" },
  { param: "Red Blood Cells", normal: "4.7–6.1 million/µL" },
  { param: "Hematocrit", normal: "38.3–48.6%" },
  { param: "Iron (Serum)", normal: "60–170 µg/dL" },
  { param: "Total Blood Volume", normal: "~5–6 L" },
  { param: "Creatinine", normal: "0.7–1.3 mg/dL" },
  { param: "BMI (Healthy)", normal: "18.5–24.9 kg/m²" },
  { param: "Testosterone", normal: "300–1000 ng/dL" },
];

const adultFemale: VitalRow[] = [
  { param: "Hemoglobin", normal: "12.0–15.5 g/dL" },
  { param: "Red Blood Cells", normal: "4.2–5.4 million/µL" },
  { param: "Hematocrit", normal: "35.5–44.9%" },
  { param: "Iron (Serum)", normal: "50–160 µg/dL" },
  { param: "Creatinine", normal: "0.6–1.1 mg/dL" },
  { param: "Vitamin B12", normal: "200–900 pg/mL" },
  { param: "TSH (Thyroid)", normal: "0.4–4.0 mIU/L" },
  { param: "BMI (Healthy)", normal: "18.5–24.9 kg/m²" },
];

const children: VitalRow[] = [
  { param: "Pulse", normal: "70–120 bpm", warning: ">150 bpm" },
  { param: "Respiratory Rate", normal: "20–30 breaths/min", warning: ">40" },
  { param: "Temperature", normal: "36.5–37.5 °C", warning: ">39 °C" },
  { param: "SpO₂", normal: "95–100%", warning: "<92%" },
  { param: "Fasting Blood Sugar", normal: "70–100 mg/dL", warning: "<60 or >200 mg/dL" },
  { param: "Blood Pressure (6-12y)", normal: "80–110 / 50–75 mmHg", warning: ">130 systolic" },
  { param: "Capillary Refill", normal: "<2 seconds", warning: ">3 seconds" },
  { param: "Weight-for-age", normal: "WHO growth chart percentile", warning: "<3rd percentile (malnutrition)" },
];

const elderly: VitalRow[] = [
  { param: "Blood Pressure", normal: "110–140 / 70–90 mmHg", notes: "Slightly higher acceptable" },
  { param: "Pulse", normal: "60–100 bpm", notes: "Irregular rhythm common" },
  { param: "Respiratory Rate", normal: "12–20 breaths/min", notes: "Same as adults" },
  { param: "SpO₂", normal: "94–100%", notes: "Slightly lower acceptable" },
  { param: "Temperature", normal: "36–37 °C", notes: "Fever may appear lower" },
  { param: "Fasting Blood Sugar", normal: "70–130 mg/dL", notes: "Slightly relaxed target" },
  { param: "eGFR (Kidney)", normal: ">60 mL/min", notes: "Declines with age" },
  { param: "BMI", normal: "22–27 kg/m²", notes: "Slightly higher range acceptable" },
];

const bloodMetabolic: VitalRow[] = [
  { param: "White Blood Cells", normal: "4,000–11,000 /µL" },
  { param: "Platelets", normal: "150,000–400,000 /µL" },
  { param: "Sodium", normal: "135–145 mmol/L" },
  { param: "Potassium", normal: "3.5–5.0 mmol/L" },
  { param: "Calcium", normal: "8.6–10.2 mg/dL" },
  { param: "Total Cholesterol", normal: "<200 mg/dL" },
  { param: "Triglycerides", normal: "<150 mg/dL" },
  { param: "Vitamin D", normal: "20–60 ng/mL" },
  { param: "HbA1c (Diabetes)", normal: "<5.7%  |  Diabetic: >6.5%" },
  { param: "CRP (Inflammation)", normal: "<1 mg/L  |  High: >10 mg/L" },
  { param: "BUN (Blood Urea)", normal: "7–20 mg/dL" },
  { param: "ALT (Liver)", normal: "7–56 U/L" },
  { param: "AST (Liver)", normal: "10–40 U/L" },
];

const criticalTriage: VitalRow[] = [
  { param: "SpO₂", warning: "<90%" },
  { param: "Pulse", warning: ">130 bpm" },
  { param: "Respiratory Rate", warning: ">30 breaths/min" },
  { param: "Temperature", warning: ">39 °C" },
  { param: "Blood Sugar", warning: ">300 mg/dL" },
  { param: "Blood Pressure", warning: ">180 systolic" },
  { param: "GCS Score", warning: "≤8 (intubation needed)" },
  { param: "Capillary Refill", warning: ">3 sec (shock indicator)" },
  { param: "Urine Output", warning: "<0.5 mL/kg/hr (renal failure)" },
];

type TabKey = "adults" | "male" | "female" | "children" | "elderly" | "blood" | "critical";

const tabs: { key: TabKey; label: string; emoji: string; icon: typeof Heart }[] = [
  { key: "adults", label: "Adults", emoji: "🫀", icon: Heart },
  { key: "male", label: "Male", emoji: "♂", icon: Users },
  { key: "female", label: "Female", emoji: "♀", icon: Users },
  { key: "children", label: "Children", emoji: "👶", icon: Baby },
  { key: "elderly", label: "Elderly", emoji: "👴", icon: Users },
  { key: "blood", label: "Blood Tests", emoji: "🩸", icon: FlaskConical },
  { key: "critical", label: "⚠ Danger", emoji: "🚨", icon: ShieldAlert },
];

const dataMap: Record<TabKey, VitalRow[]> = {
  adults: adultGeneral,
  male: adultMale,
  female: adultFemale,
  children,
  elderly,
  blood: bloodMetabolic,
  critical: criticalTriage,
};

const VitalCard = ({ row, isCritical }: { row: VitalRow; isCritical?: boolean }) => (
  <div className={`rounded-lg border p-3 transition-colors ${
    isCritical 
      ? "border-destructive/40 bg-destructive/5" 
      : "border-border bg-card"
  }`}>
    <p className="font-semibold text-sm leading-tight mb-1.5">{row.param}</p>
    {row.normal && (
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-block w-2 h-2 rounded-full bg-accent shrink-0" aria-label="Normal range" />
        <span className="text-xs text-muted-foreground">{row.normal}</span>
      </div>
    )}
    {row.warning && (
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-block w-2 h-2 rounded-full bg-destructive shrink-0" aria-label="Danger level" />
        <span className="text-xs font-medium text-destructive">{row.warning}</span>
      </div>
    )}
    {row.notes && (
      <p className="text-xs text-muted-foreground italic mt-1">ℹ {row.notes}</p>
    )}
  </div>
);

const VitalSigns = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("critical");

  const rows = dataMap[activeTab];
  const isCritical = activeTab === "critical";

  return (
    <main className="min-h-screen px-4 py-8 max-w-lg mx-auto pb-24" aria-label="Emergency Vital Signs Chart">
      <BackLink to="/" label="Home" />

      {/* Header */}
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-primary mb-1">🫀 Vital Signs</h1>
        <p className="text-sm text-muted-foreground">
          Quick-reference chart for emergencies · WHO &amp; ICMR data
        </p>
      </div>

      {/* Critical banner */}
      {isCritical && (
        <div className="flex items-center gap-3 rounded-lg border-2 border-destructive/50 bg-destructive/10 p-3 mb-4">
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0" aria-hidden="true" />
          <p className="text-xs text-destructive font-medium">
            If any parameter hits danger level → seek immediate medical help. Call <strong>112</strong> or <strong>108</strong>.
          </p>
        </div>
      )}

      {/* Tab pills */}
      <div className="flex flex-wrap gap-1.5 mb-5" role="tablist" aria-label="Vital signs categories">
        {tabs.map(tab => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              activeTab === tab.key
                ? tab.key === "critical"
                  ? "bg-destructive text-destructive-foreground border-destructive"
                  : "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-secondary-foreground border-border hover:border-primary/40"
            }`}
          >
            {tab.emoji} {tab.label}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="tabpanel">
        {rows.map((row, i) => (
          <VitalCard key={i} row={row} isCritical={isCritical} />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 border border-border rounded-lg p-3">
        <p className="text-xs font-semibold mb-2">Legend</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="text-xs text-muted-foreground">Normal range</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
            <span className="text-xs text-muted-foreground">Danger — seek help</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground italic">ℹ</span>
            <span className="text-xs text-muted-foreground">Age-specific note</span>
          </div>
        </div>
      </div>

      {/* Source */}
      <p className="text-xs text-muted-foreground text-center mt-6 mono">
        Sources: WHO · ICMR · NDMA · Harrison's Principles of Internal Medicine
      </p>
    </main>
  );
};

export default VitalSigns;
