// Multilingual Emergency Phrases — Hindi, Tamil, Telugu, Kannada
// 100% offline · hardcoded · ~120KB estimated

export interface Phrase {
  id: string;
  english: string;
  hindi: { text: string; transliteration: string };
  tamil: { text: string; transliteration: string };
  telugu: { text: string; transliteration: string };
  kannada: { text: string; transliteration: string };
}

export interface PhraseCategory {
  id: string;
  title: string;
  emoji: string;
  desc: string;
  phrases: Phrase[];
}

export type LangKey = "hindi" | "tamil" | "telugu" | "kannada";

export const languages: { key: LangKey; label: string; native: string }[] = [
  { key: "hindi", label: "Hindi", native: "हिन्दी" },
  { key: "tamil", label: "Tamil", native: "தமிழ்" },
  { key: "telugu", label: "Telugu", native: "తెలుగు" },
  { key: "kannada", label: "Kannada", native: "ಕನ್ನಡ" },
];

export const phraseCategories: PhraseCategory[] = [
  {
    id: "help",
    title: "Asking for Help",
    emoji: "🆘",
    desc: "Critical phrases to call for rescue",
    phrases: [
      {
        id: "h1",
        english: "Help me!",
        hindi: { text: "मदद करो!", transliteration: "Madad karo!" },
        tamil: { text: "உதவி செய்யுங்கள்!", transliteration: "Udhavi seiyyungal!" },
        telugu: { text: "నాకు సహాయం చేయండి!", transliteration: "Naaku sahaayam cheyandi!" },
        kannada: { text: "ನನಗೆ ಸಹಾಯ ಮಾಡಿ!", transliteration: "Nanage sahaaya maadi!" },
      },
      {
        id: "h2",
        english: "Call an ambulance!",
        hindi: { text: "एम्बुलेंस बुलाओ!", transliteration: "Ambulance bulaao!" },
        tamil: { text: "ஆம்புலன்ஸ் அழையுங்கள்!", transliteration: "Ambulance azhaiyungal!" },
        telugu: { text: "అంబులెన్స్ పిలవండి!", transliteration: "Ambulance pilavandi!" },
        kannada: { text: "ಆಂಬುಲೆನ್ಸ್ ಕರೆಯಿರಿ!", transliteration: "Ambulance kareyiri!" },
      },
      {
        id: "h3",
        english: "Call the police!",
        hindi: { text: "पुलिस को बुलाओ!", transliteration: "Police ko bulaao!" },
        tamil: { text: "போலீஸை அழையுங்கள்!", transliteration: "Polisai azhaiyungal!" },
        telugu: { text: "పోలీసులను పిలవండి!", transliteration: "Polisulanu pilavandi!" },
        kannada: { text: "ಪೊಲೀಸರನ್ನು ಕರೆಯಿರಿ!", transliteration: "Polisarannu kareyiri!" },
      },
      {
        id: "h4",
        english: "I am injured",
        hindi: { text: "मुझे चोट लगी है", transliteration: "Mujhe chot lagi hai" },
        tamil: { text: "எனக்கு காயம் ஆகிவிட்டது", transliteration: "Enakku kaayam aagividtadhu" },
        telugu: { text: "నాకు గాయం అయింది", transliteration: "Naaku gaayam ayindi" },
        kannada: { text: "ನನಗೆ ಗಾಯವಾಗಿದೆ", transliteration: "Nanage gaayavaagide" },
      },
      {
        id: "h5",
        english: "Someone is unconscious",
        hindi: { text: "कोई बेहोश है", transliteration: "Koi behosh hai" },
        tamil: { text: "ஒருவர் மயக்கமாக இருக்கிறார்", transliteration: "Oruvar mayakkamaga irukkiraar" },
        telugu: { text: "ఒకరు స్పృహ లేకుండా ఉన్నారు", transliteration: "Okaru spruha lekunda unnaru" },
        kannada: { text: "ಯಾರೋ ಪ್ರಜ್ಞೆ ತಪ್ಪಿದ್ದಾರೆ", transliteration: "Yaaro prajne tappiddaare" },
      },
      {
        id: "h6",
        english: "There is a fire!",
        hindi: { text: "आग लगी है!", transliteration: "Aag lagi hai!" },
        tamil: { text: "தீ பிடித்துவிட்டது!", transliteration: "Thee pidiththuvidtadhu!" },
        telugu: { text: "అగ్ని అంటుకుంది!", transliteration: "Agni antukundi!" },
        kannada: { text: "ಬೆಂಕಿ ಹತ್ತಿದೆ!", transliteration: "Benki hattide!" },
      },
      {
        id: "h7",
        english: "There is a gas leak!",
        hindi: { text: "गैस लीक हो रही है!", transliteration: "Gas leak ho rahi hai!" },
        tamil: { text: "எரிவாயு கசிவு!", transliteration: "Erivaayu kasivu!" },
        telugu: { text: "గ్యాస్ లీక్ అవుతోంది!", transliteration: "Gas leak avuthondi!" },
        kannada: { text: "ಅನಿಲ ಸೋರಿಕೆ ಆಗಿದೆ!", transliteration: "Anila sorike aagide!" },
      },
      {
        id: "h8",
        english: "I need water",
        hindi: { text: "मुझे पानी चाहिए", transliteration: "Mujhe paani chahiye" },
        tamil: { text: "எனக்கு தண்ணீர் வேண்டும்", transliteration: "Enakku thanneer vendum" },
        telugu: { text: "నాకు నీళ్ళు కావాలి", transliteration: "Naaku neellu kaavaali" },
        kannada: { text: "ನನಗೆ ನೀರು ಬೇಕು", transliteration: "Nanage neeru beku" },
      },
      {
        id: "h9",
        english: "I need food",
        hindi: { text: "मुझे खाना चाहिए", transliteration: "Mujhe khaana chahiye" },
        tamil: { text: "எனக்கு உணவு வேண்டும்", transliteration: "Enakku unavu vendum" },
        telugu: { text: "నాకు ఆహారం కావాలి", transliteration: "Naaku aahaaram kaavaali" },
        kannada: { text: "ನನಗೆ ಆಹಾರ ಬೇಕು", transliteration: "Nanage aahaara beku" },
      },
      {
        id: "h10",
        english: "I need medicine",
        hindi: { text: "मुझे दवाई चाहिए", transliteration: "Mujhe davaai chahiye" },
        tamil: { text: "எனக்கு மருந்து வேண்டும்", transliteration: "Enakku marundhu vendum" },
        telugu: { text: "నాకు మందు కావాలి", transliteration: "Naaku mandu kaavaali" },
        kannada: { text: "ನನಗೆ ಔಷಧ ಬೇಕು", transliteration: "Nanage aushadha beku" },
      },
    ],
  },
  {
    id: "medical",
    title: "Medical Communication",
    emoji: "🏥",
    desc: "Convey medical needs to helpers",
    phrases: [
      {
        id: "m1",
        english: "I am diabetic",
        hindi: { text: "मुझे मधुमेह है", transliteration: "Mujhe madhumeh hai" },
        tamil: { text: "எனக்கு நீரிழிவு நோய் உள்ளது", transliteration: "Enakku neerizhibu noi ulladhu" },
        telugu: { text: "నాకు మధుమేహం ఉంది", transliteration: "Naaku madhumeham undi" },
        kannada: { text: "ನನಗೆ ಮಧುಮೇಹ ಇದೆ", transliteration: "Nanage madhumeha ide" },
      },
      {
        id: "m2",
        english: "I have heart disease",
        hindi: { text: "मुझे हृदय रोग है", transliteration: "Mujhe hriday rog hai" },
        tamil: { text: "எனக்கு இதய நோய் உள்ளது", transliteration: "Enakku idhaya noi ulladhu" },
        telugu: { text: "నాకు గుండె జబ్బు ఉంది", transliteration: "Naaku gunde jabbu undi" },
        kannada: { text: "ನನಗೆ ಹೃದಯ ರೋಗ ಇದೆ", transliteration: "Nanage hrudaya roga ide" },
      },
      {
        id: "m3",
        english: "I am pregnant",
        hindi: { text: "मैं गर्भवती हूँ", transliteration: "Main garbhavati hoon" },
        tamil: { text: "நான் கர்ப்பமாக இருக்கிறேன்", transliteration: "Naan karppamaaga irukkiren" },
        telugu: { text: "నేను గర్భవతిని", transliteration: "Nenu garbhavatini" },
        kannada: { text: "ನಾನು ಗರ್ಭಿಣಿ", transliteration: "Naanu garbhini" },
      },
      {
        id: "m4",
        english: "He/She is not breathing",
        hindi: { text: "वो साँस नहीं ले रहा/रही", transliteration: "Vo saans nahi le raha/rahi" },
        tamil: { text: "அவர் சுவாசிக்கவில்லை", transliteration: "Avar suvaasikkavlllai" },
        telugu: { text: "అతను/ఆమె ఊపిరి తీయడం లేదు", transliteration: "Atanu/Aame oopiri tiyadam ledu" },
        kannada: { text: "ಅವರು ಉಸಿರಾಡುತ್ತಿಲ್ಲ", transliteration: "Avaru usiraaduttilla" },
      },
      {
        id: "m5",
        english: "There is heavy bleeding",
        hindi: { text: "बहुत खून बह रहा है", transliteration: "Bahut khoon bah raha hai" },
        tamil: { text: "அதிகமாக இரத்தம் வருகிறது", transliteration: "Adhikamaaga iratham varugiradhu" },
        telugu: { text: "చాలా రక్తస్రావం అవుతోంది", transliteration: "Chaala raktasraavam avuthondi" },
        kannada: { text: "ತುಂಬಾ ರಕ್ತಸ್ರಾವ ಆಗುತ್ತಿದೆ", transliteration: "Tumba raktasraava aaguttide" },
      },
      {
        id: "m6",
        english: "I am in pain here (chest)",
        hindi: { text: "यहाँ दर्द हो रहा है (छाती)", transliteration: "Yahaan dard ho raha hai (chhaati)" },
        tamil: { text: "இங்கே வலிக்கிறது (நெஞ்சு)", transliteration: "Ingae valikkiradhu (nenju)" },
        telugu: { text: "ఇక్కడ నొప్పిగా ఉంది (ఛాతీ)", transliteration: "Ikkada noppiga undi (chhaati)" },
        kannada: { text: "ಇಲ್ಲಿ ನೋವಾಗುತ್ತಿದೆ (ಎದೆ)", transliteration: "Illi novaaguttide (ede)" },
      },
      {
        id: "m7",
        english: "I am in pain here (stomach)",
        hindi: { text: "यहाँ दर्द हो रहा है (पेट)", transliteration: "Yahaan dard ho raha hai (pet)" },
        tamil: { text: "இங்கே வலிக்கிறது (வயிறு)", transliteration: "Ingae valikkiradhu (vayiru)" },
        telugu: { text: "ఇక్కడ నొప్పిగా ఉంది (కడుపు)", transliteration: "Ikkada noppiga undi (kadupu)" },
        kannada: { text: "ಇಲ್ಲಿ ನೋವಾಗುತ್ತಿದೆ (ಹೊಟ್ಟೆ)", transliteration: "Illi novaaguttide (hotte)" },
      },
      {
        id: "m8",
        english: "I am in pain here (head)",
        hindi: { text: "यहाँ दर्द हो रहा है (सिर)", transliteration: "Yahaan dard ho raha hai (sir)" },
        tamil: { text: "இங்கே வலிக்கிறது (தலை)", transliteration: "Ingae valikkiradhu (thalai)" },
        telugu: { text: "ఇక్కడ నొప్పిగా ఉంది (తల)", transliteration: "Ikkada noppiga undi (tala)" },
        kannada: { text: "ಇಲ್ಲಿ ನೋವಾಗುತ್ತಿದೆ (ತಲೆ)", transliteration: "Illi novaaguttide (tale)" },
      },
      {
        id: "m9",
        english: "How many tablets? How often?",
        hindi: { text: "कितनी गोलियाँ? कितनी बार?", transliteration: "Kitni goliyan? Kitni baar?" },
        tamil: { text: "எத்தனை மாத்திரை? எவ்வளவு நேரத்திற்கு ஒருமுறை?", transliteration: "Eththanai maathirai? Evvalavu neraththirku orumurai?" },
        telugu: { text: "ఎన్ని మాత్రలు? ఎంత తరచుగా?", transliteration: "Enni maatralu? Entha tarachuga?" },
        kannada: { text: "ಎಷ್ಟು ಮಾತ್ರೆ? ಎಷ್ಟು ಬಾರಿ?", transliteration: "Eshtu maatre? Eshtu baari?" },
      },
      {
        id: "m10",
        english: "I am allergic to ___",
        hindi: { text: "मुझे ___ से एलर्जी है", transliteration: "Mujhe ___ se allergy hai" },
        tamil: { text: "எனக்கு ___ அலர்ஜி உள்ளது", transliteration: "Enakku ___ allergy ulladhu" },
        telugu: { text: "నాకు ___ అలర్జీ ఉంది", transliteration: "Naaku ___ allergy undi" },
        kannada: { text: "ನನಗೆ ___ ಅಲರ್ಜಿ ಇದೆ", transliteration: "Nanage ___ allergy ide" },
      },
    ],
  },
  {
    id: "rescue",
    title: "Rescue Coordination",
    emoji: "🚁",
    desc: "Communicate with rescue teams",
    phrases: [
      {
        id: "r1",
        english: "We are trapped on the ___ floor",
        hindi: { text: "हम ___ मंज़िल पर फँसे हैं", transliteration: "Hum ___ manzil par phase hain" },
        tamil: { text: "நாங்கள் ___ மாடியில் சிக்கியுள்ளோம்", transliteration: "Naangal ___ maadiyil sikkiyullom" },
        telugu: { text: "మేము ___ అంతస్తులో చిక్కుకున్నాము", transliteration: "Memu ___ antastulo chikkukunnaamu" },
        kannada: { text: "ನಾವು ___ ಮಹಡಿಯಲ್ಲಿ ಸಿಕ್ಕಿಹಾಕಿಕೊಂಡಿದ್ದೇವೆ", transliteration: "Naavu ___ mahadiyalli sikkihaakikondiddeeve" },
      },
      {
        id: "r2",
        english: "There are ___ people here",
        hindi: { text: "यहाँ ___ लोग हैं", transliteration: "Yahaan ___ log hain" },
        tamil: { text: "இங்கே ___ பேர் இருக்கிறார்கள்", transliteration: "Ingae ___ per irukkiraarkal" },
        telugu: { text: "ఇక్కడ ___ మంది ఉన్నారు", transliteration: "Ikkada ___ mandi unnaaru" },
        kannada: { text: "ಇಲ್ಲಿ ___ ಜನರಿದ್ದಾರೆ", transliteration: "Illi ___ janariddaare" },
      },
      {
        id: "r3",
        english: "There is a child here",
        hindi: { text: "यहाँ एक बच्चा है", transliteration: "Yahaan ek bachcha hai" },
        tamil: { text: "இங்கே ஒரு குழந்தை இருக்கிறது", transliteration: "Ingae oru kuzhandhai irukkiradhu" },
        telugu: { text: "ఇక్కడ ఒక పిల్లవాడు ఉన్నాడు", transliteration: "Ikkada oka pillavadu unnaadu" },
        kannada: { text: "ಇಲ್ಲಿ ಒಂದು ಮಗು ಇದೆ", transliteration: "Illi ondu magu ide" },
      },
      {
        id: "r4",
        english: "There is an elderly person here",
        hindi: { text: "यहाँ एक बुज़ुर्ग है", transliteration: "Yahaan ek buzurg hai" },
        tamil: { text: "இங்கே ஒரு வயதானவர் இருக்கிறார்", transliteration: "Ingae oru vayadhaanavar irukkkiraar" },
        telugu: { text: "ఇక్కడ వృద్ధుడు ఉన్నారు", transliteration: "Ikkada vruddhhudu unnaaru" },
        kannada: { text: "ಇಲ್ಲಿ ವೃದ್ಧರಿದ್ದಾರೆ", transliteration: "Illi vruddhhariddaare" },
      },
      {
        id: "r5",
        english: "We have no water since ___ hours",
        hindi: { text: "हमें ___ घंटे से पानी नहीं मिला", transliteration: "Hamein ___ ghante se paani nahi mila" },
        tamil: { text: "___ மணி நேரமாக தண்ணீர் இல்லை", transliteration: "___ mani neramaaga thanneer illai" },
        telugu: { text: "___ గంటల నుండి మాకు నీళ్ళు లేవు", transliteration: "___ gantala nundi maaku neellu levu" },
        kannada: { text: "___ ಗಂಟೆಗಳಿಂದ ನೀರು ಇಲ್ಲ", transliteration: "___ gantegalinda neeru illa" },
      },
      {
        id: "r6",
        english: "We have been trapped since ___",
        hindi: { text: "हम ___ से फँसे हुए हैं", transliteration: "Hum ___ se phase hue hain" },
        tamil: { text: "நாங்கள் ___ -லிருந்து சிக்கியுள்ளோம்", transliteration: "Naangal ___ -lirundhu sikkiyullom" },
        telugu: { text: "మేము ___ నుండి చిక్కుకుని ఉన్నాము", transliteration: "Memu ___ nundi chikkukuni unnaamu" },
        kannada: { text: "ನಾವು ___ ಇಂದ ಸಿಕ್ಕಿಹಾಕಿಕೊಂಡಿದ್ದೇವೆ", transliteration: "Naavu ___ inda sikkihaakikondiddeeve" },
      },
      {
        id: "r7",
        english: "There is a disabled person here",
        hindi: { text: "यहाँ एक विकलांग व्यक्ति है", transliteration: "Yahaan ek viklang vyakti hai" },
        tamil: { text: "இங்கே ஒரு மாற்றுத்திறனாளி இருக்கிறார்", transliteration: "Ingae oru maatruthiranaali irukkiraar" },
        telugu: { text: "ఇక్కడ వికలాంగ వ్యక్తి ఉన్నారు", transliteration: "Ikkada vikalanga vyakti unnaaru" },
        kannada: { text: "ಇಲ್ಲಿ ವಿಕಲಚೇತನ ವ್ಯಕ್ತಿ ಇದ್ದಾರೆ", transliteration: "Illi vikalachetana vyakti iddaare" },
      },
    ],
  },
  {
    id: "disaster",
    title: "Disaster-Specific",
    emoji: "🌊",
    desc: "Floods, earthquakes, bites & leaks",
    phrases: [
      {
        id: "d1",
        english: "The river is rising fast",
        hindi: { text: "नदी का पानी तेज़ी से बढ़ रहा है", transliteration: "Nadi ka paani tezi se badh raha hai" },
        tamil: { text: "ஆறு வேகமாக உயர்கிறது", transliteration: "Aaru vegamaaga uyargiradhu" },
        telugu: { text: "నది వేగంగా పెరుగుతోంది", transliteration: "Nadi veganga peruguthondi" },
        kannada: { text: "ನದಿ ವೇಗವಾಗಿ ಏರುತ್ತಿದೆ", transliteration: "Nadi vegavaagi eruttide" },
      },
      {
        id: "d2",
        english: "The building is cracking",
        hindi: { text: "इमारत में दरारें आ रही हैं", transliteration: "Imaarat mein daraarein aa rahi hain" },
        tamil: { text: "கட்டடத்தில் விரிசல் ஏற்படுகிறது", transliteration: "Kattadathil virisal etrpadugiadhu" },
        telugu: { text: "భవనంలో పగుళ్ళు వస్తున్నాయి", transliteration: "Bhavanamlo pagullu vasthunnayi" },
        kannada: { text: "ಕಟ್ಟಡ ಬಿರುಕು ಬಿಡುತ್ತಿದೆ", transliteration: "Kattada biruku biduttide" },
      },
      {
        id: "d3",
        english: "There is a snake bite",
        hindi: { text: "साँप ने काटा है", transliteration: "Saanp ne kaata hai" },
        tamil: { text: "பாம்பு கடித்துவிட்டது", transliteration: "Paambu kadiththuvidtadhu" },
        telugu: { text: "పాము కరిచింది", transliteration: "Paamu karichindi" },
        kannada: { text: "ಹಾವು ಕಚ್ಚಿದೆ", transliteration: "Haavu kachchide" },
      },
      {
        id: "d4",
        english: "What did the snake look like?",
        hindi: { text: "साँप कैसा दिखता था?", transliteration: "Saanp kaisa dikhta tha?" },
        tamil: { text: "பாம்பு எப்படி இருந்தது?", transliteration: "Paambu eppadi irundhadu?" },
        telugu: { text: "పాము ఎలా ఉంది?", transliteration: "Paamu ela undi?" },
        kannada: { text: "ಹಾವು ಹೇಗೆ ಕಾಣುತ್ತಿತ್ತು?", transliteration: "Haavu hege kaanuttittu?" },
      },
      {
        id: "d5",
        english: "I smell gas",
        hindi: { text: "गैस की गंध आ रही है", transliteration: "Gas ki gandh aa rahi hai" },
        tamil: { text: "எரிவாயு வாசனை வருகிறது", transliteration: "Erivaayu vaasanai varugiadhu" },
        telugu: { text: "గ్యాస్ వాసన వస్తోంది", transliteration: "Gas vaasana vasthondi" },
        kannada: { text: "ಅನಿಲ ವಾಸನೆ ಬರುತ್ತಿದೆ", transliteration: "Anila vaasane baruttide" },
      },
      {
        id: "d6",
        english: "The road is blocked",
        hindi: { text: "सड़क बंद है", transliteration: "Sadak band hai" },
        tamil: { text: "சாலை அடைக்கப்பட்டுள்ளது", transliteration: "Saalai adaikkappatulladu" },
        telugu: { text: "రోడ్డు బ్లాక్ అయింది", transliteration: "Roddu block ayindi" },
        kannada: { text: "ರಸ್ತೆ ನಿರ್ಬಂಧವಾಗಿದೆ", transliteration: "Raste nirbandhawaagide" },
      },
      {
        id: "d7",
        english: "The bridge is broken",
        hindi: { text: "पुल टूट गया है", transliteration: "Pul toot gaya hai" },
        tamil: { text: "பாலம் உடைந்துவிட்டது", transliteration: "Paalam udaindhuvidtadhu" },
        telugu: { text: "వంతెన విరిగిపోయింది", transliteration: "Vantena virigipoyindi" },
        kannada: { text: "ಸೇತುವೆ ಮುರಿದಿದೆ", transliteration: "Sethuve muridide" },
      },
      {
        id: "d8",
        english: "Train has derailed",
        hindi: { text: "ट्रेन पटरी से उतर गई है", transliteration: "Train patri se utar gayi hai" },
        tamil: { text: "ரயில் தடம் புரண்டது", transliteration: "Rayil thadam purandadhu" },
        telugu: { text: "రైలు పట్టాలు తప్పింది", transliteration: "Railu pattaalu tappindi" },
        kannada: { text: "ರೈಲು ಹಳಿ ತಪ್ಪಿದೆ", transliteration: "Railu hali tappide" },
      },
      {
        id: "d9",
        english: "A child is stuck in a borewell",
        hindi: { text: "बच्चा बोरवेल में फँसा है", transliteration: "Bachcha borewell mein phansa hai" },
        tamil: { text: "குழந்தை ஆழ்துளை கிணற்றில் சிக்கியுள்ளது", transliteration: "Kuzhandhai aazhthulai kinarril sikkiyulladhu" },
        telugu: { text: "పిల్లవాడు బోర్‌వెల్‌లో చిక్కుకున్నాడు", transliteration: "Pillavadu borewell lo chikkukunnaadu" },
        kannada: { text: "ಮಗು ಕೊಳವೆ ಬಾವಿಯಲ್ಲಿ ಸಿಕ್ಕಿಹಾಕಿಕೊಂಡಿದೆ", transliteration: "Magu kolave baaviyalli sikkihaakikondide" },
      },
      {
        id: "d10",
        english: "How many in your family? (flood boat rescue)",
        hindi: { text: "आपके परिवार में कितने लोग हैं?", transliteration: "Aapke parivaar mein kitne log hain?" },
        tamil: { text: "உங்கள் குடும்பத்தில் எத்தனை பேர்?", transliteration: "Ungal kudumbathil eththanai per?" },
        telugu: { text: "మీ కుటుంబంలో ఎంత మంది ఉన్నారు?", transliteration: "Mee kutumbamlo entha mandi unnaaru?" },
        kannada: { text: "ನಿಮ್ಮ ಕುಟುಂಬದಲ್ಲಿ ಎಷ್ಟು ಜನ?", transliteration: "Nimma kutumbadalli eshtu jana?" },
      },
    ],
  },
  {
    id: "authorities",
    title: "With Authorities",
    emoji: "🏛️",
    desc: "Relief camps, documents & needs",
    phrases: [
      {
        id: "a1",
        english: "Where is the relief camp?",
        hindi: { text: "राहत शिविर कहाँ है?", transliteration: "Raahat shivir kahaan hai?" },
        tamil: { text: "நிவாரண முகாம் எங்கே?", transliteration: "Nivarana mugaam engae?" },
        telugu: { text: "సహాయ శిబిరం ఎక్కడ ఉంది?", transliteration: "Sahaaya shibiram ekkada undi?" },
        kannada: { text: "ಪರಿಹಾರ ಶಿಬಿರ ಎಲ್ಲಿದೆ?", transliteration: "Parihaara shibira ellide?" },
      },
      {
        id: "a2",
        english: "I have lost my family member",
        hindi: { text: "मेरे परिवार का सदस्य लापता है", transliteration: "Mere parivaar ka sadasya laapata hai" },
        tamil: { text: "என் குடும்ப உறுப்பினர் காணவில்லை", transliteration: "En kudumba urupinar kaanavillai" },
        telugu: { text: "నా కుటుంబ సభ్యుడు తప్పిపోయాడు", transliteration: "Naa kutumba sabhyudu tappipoyaadu" },
        kannada: { text: "ನನ್ನ ಕುಟುಂಬದ ಸದಸ್ಯ ಕಾಣೆಯಾಗಿದ್ದಾರೆ", transliteration: "Nanna kutumbada sadasya kaaneyaagiddaare" },
      },
      {
        id: "a3",
        english: "My ID / documents are lost",
        hindi: { text: "मेरे दस्तावेज़ खो गए हैं", transliteration: "Mere dastaavez kho gaye hain" },
        tamil: { text: "என் ஆவணங்கள் தொலைந்துவிட்டன", transliteration: "En aavanankal tholaindhuvidtan" },
        telugu: { text: "నా పత్రాలు పోయాయి", transliteration: "Naa patralu poyaayi" },
        kannada: { text: "ನನ್ನ ದಾಖಲೆಗಳು ಕಳೆದುಹೋಗಿವೆ", transliteration: "Nanna daakhalegalu kaleduhogive" },
      },
      {
        id: "a4",
        english: "I need to charge my phone",
        hindi: { text: "मुझे फ़ोन चार्ज करना है", transliteration: "Mujhe phone charge karna hai" },
        tamil: { text: "எனக்கு போன் சார்ஜ் செய்ய வேண்டும்", transliteration: "Enakku phone charge seyya vendum" },
        telugu: { text: "నాకు ఫోన్ ఛార్జ్ చేయాలి", transliteration: "Naaku phone charge cheyaali" },
        kannada: { text: "ನನಗೆ ಫೋನ್ ಚಾರ್ಜ್ ಮಾಡಬೇಕು", transliteration: "Nanage phone charge maadabeku" },
      },
      {
        id: "a5",
        english: "Is this water safe to drink?",
        hindi: { text: "क्या यह पानी पीने योग्य है?", transliteration: "Kya yeh paani peene yogya hai?" },
        tamil: { text: "இந்த தண்ணீர் குடிக்க பாதுகாப்பானதா?", transliteration: "Indha thanneer kudikka paadhukaappaanathaa?" },
        telugu: { text: "ఈ నీరు తాగడానికి సురక్షితమా?", transliteration: "Ee neeru taagadaaniki surakshitamaa?" },
        kannada: { text: "ಈ ನೀರು ಕುಡಿಯಲು ಸುರಕ್ಷಿತವೇ?", transliteration: "Ee neeru kudiyalu surakshitave?" },
      },
      {
        id: "a6",
        english: "Where can I get rations?",
        hindi: { text: "राशन कहाँ मिलेगा?", transliteration: "Rashan kahaan milega?" },
        tamil: { text: "ரேஷன் எங்கே கிடைக்கும்?", transliteration: "Ration engae kidaikkum?" },
        telugu: { text: "రేషన్ ఎక్కడ దొరుకుతుంది?", transliteration: "Ration ekkada dorukuthundi?" },
        kannada: { text: "ಪಡಿತರ ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ?", transliteration: "Paditara elli siguttade?" },
      },
    ],
  },
  {
    id: "rescuer",
    title: "For Rescuers",
    emoji: "🦺",
    desc: "NDRF-style phrases to help victims",
    phrases: [
      {
        id: "re1",
        english: "Don't move — stay still!",
        hindi: { text: "हिलो मत — रुको!", transliteration: "Hilo mat — ruko!" },
        tamil: { text: "அசையாதீர்கள் — நில்லுங்கள்!", transliteration: "Asaiyaadheerkal — nillungal!" },
        telugu: { text: "కదలకండి — ఆగండి!", transliteration: "Kadalakandi — aagandi!" },
        kannada: { text: "ಅಲುಗಾಡಬೇಡಿ — ನಿಲ್ಲಿ!", transliteration: "Alugaadabedi — nilli!" },
      },
      {
        id: "re2",
        english: "We are here to help you",
        hindi: { text: "हम आपकी मदद के लिए आए हैं", transliteration: "Hum aapki madad ke liye aaye hain" },
        tamil: { text: "நாங்கள் உங்களுக்கு உதவ வந்துள்ளோம்", transliteration: "Naangal ungalukku udhava vandhullom" },
        telugu: { text: "మేము మీకు సహాయం చేయడానికి వచ్చాము", transliteration: "Memu meeku sahaayam cheyadaaniki vachchaamu" },
        kannada: { text: "ನಾವು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಬಂದಿದ್ದೇವೆ", transliteration: "Naavu nimage sahaaya maadalu bandiddeeve" },
      },
      {
        id: "re3",
        english: "An ambulance is coming",
        hindi: { text: "एम्बुलेंस आ रही है", transliteration: "Ambulance aa rahi hai" },
        tamil: { text: "ஆம்புலன்ஸ் வருகிறது", transliteration: "Ambulance varugiadhu" },
        telugu: { text: "అంబులెన్స్ వస్తోంది", transliteration: "Ambulance vasthondi" },
        kannada: { text: "ಆಂಬುಲೆನ್ಸ್ ಬರುತ್ತಿದೆ", transliteration: "Ambulance baruttide" },
      },
      {
        id: "re4",
        english: "Can you hear me?",
        hindi: { text: "क्या आप मुझे सुन सकते हैं?", transliteration: "Kya aap mujhe sun sakte hain?" },
        tamil: { text: "என்னைக் கேட்க முடிகிறதா?", transliteration: "Ennaik ketka mudigiradhaa?" },
        telugu: { text: "నేను చెప్పేది వినిపిస్తోందా?", transliteration: "Nenu cheppedi vinipistondaa?" },
        kannada: { text: "ನನ್ನ ಮಾತು ಕೇಳಿಸುತ್ತಿದೆಯಾ?", transliteration: "Nanna maatu kelisuttideyaa?" },
      },
      {
        id: "re5",
        english: "Breathe slowly",
        hindi: { text: "धीरे-धीरे साँस लो", transliteration: "Dheere-dheere saans lo" },
        tamil: { text: "மெதுவாக சுவாசியுங்கள்", transliteration: "Medhuvaaga suvaasiyungal" },
        telugu: { text: "నెమ్మదిగా ఊపిరి తీయండి", transliteration: "Nemmadiga oopiri teeyandi" },
        kannada: { text: "ನಿಧಾನವಾಗಿ ಉಸಿರಾಡಿ", transliteration: "Nidhaanavaagi usiraadi" },
      },
      {
        id: "re6",
        english: "You are safe now",
        hindi: { text: "अब आप सुरक्षित हैं", transliteration: "Ab aap surakshit hain" },
        tamil: { text: "நீங்கள் இப்போது பாதுகாப்பாக இருக்கிறீர்கள்", transliteration: "Neengal ipodhu paadhukaappaaga irukkireerkal" },
        telugu: { text: "మీరు ఇప్పుడు సురక్షితంగా ఉన్నారు", transliteration: "Meeru ippudu surakshitanga unnaaru" },
        kannada: { text: "ನೀವು ಈಗ ಸುರಕ್ಷಿತವಾಗಿದ್ದೀರಿ", transliteration: "Neevu eega surakshitavaagiddeeri" },
      },
      {
        id: "re7",
        english: "Do not drink this water",
        hindi: { text: "यह पानी मत पीजिए", transliteration: "Yeh paani mat peejiye" },
        tamil: { text: "இந்த தண்ணீரை குடிக்காதீர்கள்", transliteration: "Indha thaneerai kudikkaadheerkal" },
        telugu: { text: "ఈ నీరు తాగకండి", transliteration: "Ee neeru taagakandi" },
        kannada: { text: "ಈ ನೀರು ಕುಡಿಯಬೇಡಿ", transliteration: "Ee neeru kudiyabedi" },
      },
      {
        id: "re8",
        english: "Show me where it hurts",
        hindi: { text: "दिखाओ कहाँ दर्द है", transliteration: "Dikhaao kahaan dard hai" },
        tamil: { text: "எங்கே வலிக்கிறது காட்டுங்கள்", transliteration: "Engae valikkiradhu kaattungal" },
        telugu: { text: "ఎక్కడ నొప్పిగా ఉందో చూపించండి", transliteration: "Ekkada noppiga undo choopinchandi" },
        kannada: { text: "ಎಲ್ಲಿ ನೋವಾಗುತ್ತಿದೆ ತೋರಿಸಿ", transliteration: "Elli novaaguttide thorisi" },
      },
    ],
  },
];

// Flat search index for global search integration
export const phrasesSearchIndex = phraseCategories.flatMap((cat) =>
  cat.phrases.map((p) => ({
    phraseId: p.id,
    categoryId: cat.id,
    categoryTitle: cat.title,
    english: p.english,
    hindi: p.hindi.text,
    tamil: p.tamil.text,
    telugu: p.telugu.text,
    kannada: p.kannada.text,
    link: "/phrases",
  }))
);

// Phrase of the day — deterministic by date
export function getPhraseOfTheDay(): { phrase: Phrase; category: PhraseCategory; lang: LangKey } {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const allPhrases = phraseCategories.flatMap((cat) =>
    cat.phrases.map((p) => ({ phrase: p, category: cat }))
  );
  const idx = dayOfYear % allPhrases.length;
  const langIdx = dayOfYear % languages.length;
  return { ...allPhrases[idx], lang: languages[langIdx].key };
}
