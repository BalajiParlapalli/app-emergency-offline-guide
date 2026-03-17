import BackLink from "@/components/BackLink";
import { Brain, Heart, Users, Baby, Shield, AlertTriangle } from "lucide-react";

interface Section {
  title: string;
  emoji: string;
  icon: typeof Brain;
  points: { heading: string; details: string[] }[];
}

const sections: Section[] = [
  {
    title: "Panic Control",
    emoji: "🧘",
    icon: Brain,
    points: [
      {
        heading: "4-7-8 Breathing Technique (Immediate Calm)",
        details: [
          "Breathe IN through nose for 4 seconds",
          "HOLD breath for 7 seconds",
          "Breathe OUT through mouth for 8 seconds",
          "Repeat 3–4 times — this activates your parasympathetic nervous system",
          "Works within 60 seconds — used by military and first responders worldwide",
          "If 7-second hold is hard, start with 4-4-6 and build up",
        ],
      },
      {
        heading: "5-4-3-2-1 Grounding (Stop Panic Attack)",
        details: [
          "Name 5 things you can SEE",
          "Name 4 things you can TOUCH (and touch them)",
          "Name 3 things you can HEAR",
          "Name 2 things you can SMELL",
          "Name 1 thing you can TASTE",
          "This interrupts the panic loop by forcing your brain to focus on the present",
          "Speak out loud if possible — engages more brain regions",
        ],
      },
      {
        heading: "Cognitive Override (Think Clearly Under Stress)",
        details: [
          "Tell yourself: 'I am not dying. My body is having a stress response. This will pass.'",
          "Focus on ONE immediate action — not the entire problem",
          "Break the situation into 3 steps: What do I need RIGHT NOW? (water/shelter/safety)",
          "Avoid 'what if' thinking — deal with what IS, not what might be",
          "Stress hormones (cortisol, adrenaline) peak at 20 minutes — if you survive 20 minutes of panic without acting irrationally, you'll think clearer",
          "Action reduces anxiety: doing something (even small) is better than waiting helplessly",
        ],
      },
    ],
  },
  {
    title: "Helping Children in Emergencies",
    emoji: "👶",
    icon: Baby,
    points: [
      {
        heading: "Communication with Children",
        details: [
          "Stay calm — children mirror adult emotions. If you panic, they'll panic more",
          "Use simple, honest language: 'There's a storm. We're going to a safe place.'",
          "Don't say 'Don't worry' — instead say 'I'm here. We know what to do.'",
          "Answer their questions honestly but age-appropriately",
          "Avoid graphic details — they don't need to know everything happening",
          "Let them ask questions repeatedly — repetition helps children process fear",
        ],
      },
      {
        heading: "Keeping Children Occupied",
        details: [
          "Give them a task: 'Hold the torch', 'Count the water bottles', 'Watch the bag'",
          "Tasks reduce fear — feeling useful is the opposite of feeling helpless",
          "For toddlers: keep a comfort object (blanket, toy) in the emergency bag",
          "For 5–10 year olds: simple games, drawing, storytelling",
          "For teens: involve them in planning and decision-making — treat them as capable",
          "Physical contact: hold hands, hug, keep them close — touch reduces cortisol",
        ],
      },
      {
        heading: "Post-Disaster Child Psychology",
        details: [
          "Bedwetting, nightmares, clinginess are NORMAL after trauma — don't punish",
          "Maintain routines as much as possible — routine = safety for children",
          "Let children draw or play-act what happened — this is how they process trauma",
          "Watch for withdrawal, aggression, or refusal to eat beyond 4 weeks — seek professional help",
          "NIMHANS helpline: 080-46110007 | Vandrevala Foundation: 1860-2662-345",
          "Don't force children to 'be brave' — let them express fear safely",
        ],
      },
    ],
  },
  {
    title: "Helping Injured Person Stay Conscious",
    emoji: "🩺",
    icon: Heart,
    points: [
      {
        heading: "Keep Them Engaged",
        details: [
          "Talk to them continuously — ask their name, age, family members' names",
          "Maintain eye contact — this creates a human connection that anchors them",
          "Ask simple questions: 'What's your name? Where do you live? Who should I call?'",
          "Do NOT say 'Stay awake!' (creates anxiety) — instead keep conversation going naturally",
          "Tell them help is coming — even if you're unsure. Hope keeps people alive",
          "Touch their hand or shoulder — physical contact triggers oxytocin which reduces shock",
        ],
      },
      {
        heading: "Physical Stabilisation",
        details: [
          "Keep them warm: cover with blanket, jacket, anything available — shock causes hypothermia",
          "Raise legs 30 cm if no spinal injury suspected — improves blood flow to brain",
          "Do NOT give water if abdominal injury or surgery might be needed",
          "If they're cold and shivering, it's actually a good sign — body is trying to warm up",
          "If they stop shivering but are still cold, this is dangerous — severe hypothermia",
          "Loosen tight clothing: belt, tie, collar — helps breathing and circulation",
          "Recovery position (on side) if they lose consciousness but are breathing",
        ],
      },
      {
        heading: "Signs of Deterioration (Call 108 Immediately)",
        details: [
          "Confusion or inability to answer simple questions",
          "Skin turning blue or grey (cyanosis) — especially lips, fingernails",
          "Pulse becoming very weak, fast (>120 bpm), or irregular",
          "Breathing becoming shallow, gasping, or stopping",
          "Eyes becoming unfocused or pupils unequal in size",
          "Loss of consciousness — start CPR if no breathing/pulse detected",
          "Bleeding that won't stop despite 10 minutes of direct pressure",
        ],
      },
    ],
  },
  {
    title: "Group Behaviour in Emergencies",
    emoji: "👥",
    icon: Users,
    points: [
      {
        heading: "Preventing Stampedes",
        details: [
          "Stampedes kill more people in India than most natural disasters — Elphinstone Bridge (2017), Hathras (2024)",
          "Never push — crowd pressure of 4.5 kN/m² is lethal (compression asphyxia)",
          "If caught in crowd surge: keep arms crossed over chest (boxer stance) to protect ribs",
          "Move diagonally to the flow — not against it, not with it",
          "If you fall, immediately get into foetal position: knees to chest, hands protecting head",
          "In narrow exits, take turns — shoving causes a 'crowd crush' bottleneck that kills people at the front",
          "Shout clear directions: 'Move LEFT slowly' — not 'RUN!' (triggers panic)",
        ],
      },
      {
        heading: "Leadership in Crisis",
        details: [
          "In disasters, most people freeze (70–75%) — they're not calm, they're in shock",
          "Take charge with clear, simple instructions: 'You — call 112. You — get water. You — check that exit.'",
          "Point at specific people when giving instructions — 'everybody' means nobody acts",
          "Use confident body language even if you're scared — people follow perceived confidence",
          "Delegate tasks — this snaps people out of freeze response",
          "Don't ask 'Can someone help?' — Say 'You in the blue shirt, I need your help NOW'",
        ],
      },
      {
        heading: "Helping Vulnerable Groups",
        details: [
          "Elderly: may have limited mobility, hearing/vision impairment — speak clearly, offer arm support",
          "Disabled: ask 'How can I help?' — don't assume what they need",
          "Wheelchair users: in stairs, two people carry the chair — practice is important",
          "Pregnant women: heat stress and dehydration are more dangerous — prioritise shade and water",
          "People with chronic conditions: help them access medications — insulin, heart medication, inhalers",
          "Non-Hindi/English speakers: use gestures, point to exits, use universal symbols",
          "Lost children: take them to a visible landmark and wait — don't wander looking for parents",
        ],
      },
    ],
  },
  {
    title: "Mental Health After Disasters",
    emoji: "💚",
    icon: Shield,
    points: [
      {
        heading: "Normal Stress Reactions (Not Mental Illness)",
        details: [
          "Difficulty sleeping, nightmares, flashbacks — normal for 2–4 weeks after trauma",
          "Irritability, anger, mood swings — your nervous system is still in fight-or-flight",
          "Numbness or feeling disconnected — this is your brain's protective dissociation",
          "Hyper-alertness (jumping at sounds, checking exits) — survival instinct, not paranoia",
          "Crying, sadness, grief — necessary emotional processing, not weakness",
          "These are NORMAL responses to abnormal events — they usually resolve within 4–6 weeks",
        ],
      },
      {
        heading: "When to Seek Professional Help",
        details: [
          "Symptoms persisting beyond 6 weeks with no improvement",
          "Inability to carry out daily activities: eating, sleeping, working",
          "Using alcohol or substances to cope",
          "Thoughts of self-harm or suicide — call KIRAN: 1800-599-0019 (toll-free, 24/7) or iCall: 9152987821",
          "Emotional numbness that doesn't lift — feeling 'nothing' for weeks",
          "Persistent avoidance of anything related to the event (places, people, conversations)",
          "Children showing regression that lasts more than 4 weeks",
        ],
      },
      {
        heading: "Self-Care After Trauma",
        details: [
          "Re-establish routine as quickly as possible — structure is healing",
          "Physical exercise: even walking 20 minutes/day reduces cortisol significantly",
          "Talk about what happened — but only when you're ready, don't force it",
          "Limit news and social media exposure about the disaster — re-traumatises",
          "Sleep hygiene: dark room, no screens 1 hour before bed, same bedtime daily",
          "Eat regular meals — stress depletes nutrients; include protein and complex carbs",
          "Help others in recovery — purpose and community connection are powerful healers",
          "Be patient with yourself — recovery is not linear, bad days don't mean you're not healing",
        ],
      },
    ],
  },
];

const PsychologicalSurvival = () => (
  <div className="min-h-screen flex flex-col items-center px-4 py-8 pb-24">
    <div className="w-full max-w-2xl">
      <BackLink />
      <h1 className="text-3xl font-bold text-primary mb-1">🧠 Psychological Survival</h1>
      <p className="text-sm text-muted-foreground mb-2">
        In disasters, panic kills faster than the disaster itself. Learn to control fear, help others, and recover.
      </p>
      <p className="text-xs text-muted-foreground mb-6">
        Based on WHO Psychological First Aid guidelines and NIMHANS disaster mental health protocols.
      </p>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{section.emoji}</span>
              <h2 className="text-xl font-bold">{section.title}</h2>
            </div>
            <div className="space-y-4">
              {section.points.map((sub) => (
                <div key={sub.heading} className="rounded-xl border border-border bg-card p-4">
                  <h3 className="font-bold text-sm mb-3">{sub.heading}</h3>
                  <ul className="space-y-2">
                    {sub.details.map((d, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="text-muted-foreground font-mono text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  </div>
);

export default PsychologicalSurvival;
