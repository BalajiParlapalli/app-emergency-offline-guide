export interface VitalSignEntry {
  category: string;
  param: string;
  normal?: string;
  warning?: string;
}

export const vitalSignsSearchIndex: VitalSignEntry[] = [
  // Adults General
  { category: "Adults", param: "Blood Pressure", normal: "90–120 / 60–80 mmHg", warning: ">180 / <90 systolic" },
  { category: "Adults", param: "Pulse (Heart Rate)", normal: "60–100 bpm", warning: ">130 or <40 bpm" },
  { category: "Adults", param: "Respiratory Rate", normal: "12–20 breaths/min", warning: ">30 or <8" },
  { category: "Adults", param: "Body Temperature", normal: "36.1–37.2 °C", warning: ">39 °C or <35 °C" },
  { category: "Adults", param: "SpO₂ (Oxygen Saturation)", normal: "95–100%", warning: "<90%" },
  { category: "Adults", param: "Blood Sugar (Random)", normal: "70–140 mg/dL", warning: ">300 or <60 mg/dL" },
  { category: "Adults", param: "GCS (Glasgow Coma Scale)", normal: "15 (fully alert)", warning: "≤8 (severe brain injury)" },
  { category: "Adults", param: "Capillary Refill", normal: "<2 seconds", warning: ">3 seconds" },
  { category: "Adults", param: "Urine Output", normal: "0.5–1 mL/kg/hr", warning: "<0.5 mL/kg/hr" },

  // Adult Male
  { category: "Adult Male", param: "Hemoglobin (Male)", normal: "13.5–17.5 g/dL" },
  { category: "Adult Male", param: "Red Blood Cells (Male)", normal: "4.7–6.1 million/µL" },
  { category: "Adult Male", param: "Hematocrit (Male)", normal: "38.3–48.6%" },
  { category: "Adult Male", param: "Iron Serum (Male)", normal: "60–170 µg/dL" },
  { category: "Adult Male", param: "Creatinine (Male)", normal: "0.7–1.3 mg/dL" },
  { category: "Adult Male", param: "Testosterone", normal: "300–1000 ng/dL" },

  // Adult Female
  { category: "Adult Female", param: "Hemoglobin (Female)", normal: "12.0–15.5 g/dL" },
  { category: "Adult Female", param: "Red Blood Cells (Female)", normal: "4.2–5.4 million/µL" },
  { category: "Adult Female", param: "Hematocrit (Female)", normal: "35.5–44.9%" },
  { category: "Adult Female", param: "Iron Serum (Female)", normal: "50–160 µg/dL" },
  { category: "Adult Female", param: "Creatinine (Female)", normal: "0.6–1.1 mg/dL" },
  { category: "Adult Female", param: "Vitamin B12", normal: "200–900 pg/mL" },
  { category: "Adult Female", param: "TSH (Thyroid)", normal: "0.4–4.0 mIU/L" },

  // Children
  { category: "Children", param: "Pulse (Children)", normal: "70–120 bpm", warning: ">150 bpm" },
  { category: "Children", param: "Respiratory Rate (Children)", normal: "20–30 breaths/min", warning: ">40" },
  { category: "Children", param: "Temperature (Children)", normal: "36.5–37.5 °C", warning: ">39 °C" },
  { category: "Children", param: "SpO₂ (Children)", normal: "95–100%", warning: "<92%" },
  { category: "Children", param: "Fasting Blood Sugar (Children)", normal: "70–100 mg/dL", warning: "<60 or >200 mg/dL" },
  { category: "Children", param: "Blood Pressure (Children 6-12y)", normal: "80–110 / 50–75 mmHg", warning: ">130 systolic" },

  // Elderly
  { category: "Elderly", param: "Blood Pressure (Elderly)", normal: "110–140 / 70–90 mmHg" },
  { category: "Elderly", param: "SpO₂ (Elderly)", normal: "94–100%" },
  { category: "Elderly", param: "eGFR (Kidney)", normal: ">60 mL/min" },

  // Blood & Metabolic
  { category: "Blood Tests", param: "White Blood Cells (WBC)", normal: "4,000–11,000 /µL" },
  { category: "Blood Tests", param: "Platelets", normal: "150,000–400,000 /µL" },
  { category: "Blood Tests", param: "Sodium", normal: "135–145 mmol/L" },
  { category: "Blood Tests", param: "Potassium", normal: "3.5–5.0 mmol/L" },
  { category: "Blood Tests", param: "Calcium", normal: "8.6–10.2 mg/dL" },
  { category: "Blood Tests", param: "Total Cholesterol", normal: "<200 mg/dL" },
  { category: "Blood Tests", param: "Triglycerides", normal: "<150 mg/dL" },
  { category: "Blood Tests", param: "Vitamin D", normal: "20–60 ng/mL" },
  { category: "Blood Tests", param: "HbA1c (Diabetes)", normal: "<5.7% | Diabetic: >6.5%" },
  { category: "Blood Tests", param: "CRP (Inflammation)", normal: "<1 mg/L | High: >10 mg/L" },
  { category: "Blood Tests", param: "ALT (Liver)", normal: "7–56 U/L" },
  { category: "Blood Tests", param: "AST (Liver)", normal: "10–40 U/L" },
];
