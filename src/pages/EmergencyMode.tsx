import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import BackLink from "@/components/BackLink";
import { Phone, Heart, Flashlight, Radio, MapPin, Volume2, VolumeX } from "lucide-react";

const emergencyNumbers = [
  { label: "National Emergency", number: "112", note: "Works without SIM" },
  { label: "Ambulance (EMRI)", number: "108", note: "15+ states" },
  { label: "Police", number: "100", note: "" },
  { label: "Fire Brigade", number: "101", note: "" },
  { label: "Disaster (NDMA)", number: "1078", note: "" },
  { label: "Women Helpline", number: "181", note: "" },
  { label: "Childline", number: "1098", note: "" },
  { label: "Ambulance (NHM)", number: "102", note: "" },
];

const EmergencyMode = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locError, setLocError] = useState<string | null>(null);
  const [sosActive, setSosActive] = useState(false);
  const [sosFlash, setSosFlash] = useState(false);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [alarmOn, setAlarmOn] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const sosAbort = useRef(false);

  // Get location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocError("Location access denied. Share manually."),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLocError("Geolocation not supported.");
    }
  }, []);

  // Flashlight toggle (white screen)
  const toggleFlashlight = () => setFlashlightOn(f => !f);

  // Alarm
  const toggleAlarm = useCallback(() => {
    if (alarmOn) {
      oscRef.current?.stop();
      oscRef.current = null;
      audioRef.current?.close();
      audioRef.current = null;
      setAlarmOn(false);
    } else {
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = 880;
        gain.gain.value = 0.5;
        osc.connect(gain);
        gain.connect(ctx.destination);
        // Modulate for siren effect
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 2;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 400;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        osc.start();
        audioRef.current = ctx;
        oscRef.current = osc;
        setAlarmOn(true);
      } catch {
        // Audio not supported
      }
    }
  }, [alarmOn]);

  // SOS blinking
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
  const startSOS = useCallback(async () => {
    sosAbort.current = false;
    setSosActive(true);
    while (!sosAbort.current) {
      // S: 3 short
      for (let i = 0; i < 3 && !sosAbort.current; i++) {
        setSosFlash(true); await sleep(200); setSosFlash(false); await sleep(200);
      }
      await sleep(400);
      // O: 3 long
      for (let i = 0; i < 3 && !sosAbort.current; i++) {
        setSosFlash(true); await sleep(600); setSosFlash(false); await sleep(200);
      }
      await sleep(400);
      // S: 3 short
      for (let i = 0; i < 3 && !sosAbort.current; i++) {
        setSosFlash(true); await sleep(200); setSosFlash(false); await sleep(200);
      }
      await sleep(1400);
    }
    setSosFlash(false);
    setSosActive(false);
  }, []);

  const stopSOS = () => { sosAbort.current = true; };

  // Cleanup
  useEffect(() => {
    return () => {
      oscRef.current?.stop();
      audioRef.current?.close();
      sosAbort.current = true;
    };
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 max-w-lg mx-auto pb-24" role="main" aria-label="Emergency Mode">
      {/* SOS flash overlay */}
      {sosFlash && <div className="fixed inset-0 z-50 bg-white" onClick={stopSOS} />}
      {/* Flashlight overlay */}
      {flashlightOn && <div className="fixed inset-0 z-50 bg-white" onClick={toggleFlashlight} />}

      <BackLink />
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-destructive mb-1">🚨 EMERGENCY MODE</h1>
        <p className="text-sm text-muted-foreground">Tap any number to call · All tools below</p>
      </div>

      {/* Emergency numbers */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {emergencyNumbers.map(({ label, number, note }) => (
          <a
            key={number}
            href={`tel:${number}`}
            className="flex items-center gap-3 border-2 border-destructive/50 rounded-lg p-3 bg-destructive/10 hover:bg-destructive/20 transition-colors active:scale-95"
          >
            <Phone className="h-5 w-5 text-destructive shrink-0" />
            <div>
              <p className="font-bold text-lg leading-tight mono">{number}</p>
              <p className="text-xs text-muted-foreground leading-tight">{label}</p>
              {note && <p className="text-xs text-muted-foreground/60">{note}</p>}
            </div>
          </a>
        ))}
      </div>

      {/* Quick tools */}
      <h2 className="text-lg font-semibold mb-3">Quick Tools</h2>
      <div className="grid grid-cols-2 gap-2 mb-6">
        <button
          onClick={toggleFlashlight}
          className="touch-target flex flex-col items-center gap-2 border border-border rounded-lg p-4 hover:border-primary/50 transition-colors bg-card"
          aria-label="Toggle flashlight — turns screen white"
        >
          <Flashlight className="h-8 w-8 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold">🔦 Flashlight</span>
        </button>

        <button
          onClick={() => sosActive ? stopSOS() : startSOS()}
          className={`touch-target flex flex-col items-center gap-2 border rounded-lg p-4 transition-colors ${
            sosActive ? "border-destructive bg-destructive/20" : "border-border bg-card hover:border-primary/50"
          }`}
          aria-label={sosActive ? "Stop SOS blinking signal" : "Start SOS blinking signal"}
        >
          <Radio className="h-8 w-8 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold">{sosActive ? "⬛ Stop SOS" : "📡 SOS Signal"}</span>
        </button>

        <button
          onClick={toggleAlarm}
          className={`touch-target flex flex-col items-center gap-2 border rounded-lg p-4 transition-colors ${
            alarmOn ? "border-destructive bg-destructive/20" : "border-border bg-card hover:border-primary/50"
          }`}
          aria-label={alarmOn ? "Stop loud alarm" : "Start loud alarm siren"}
        >
          {alarmOn ? <VolumeX className="h-8 w-8 text-destructive" aria-hidden="true" /> : <Volume2 className="h-8 w-8 text-primary" aria-hidden="true" />}
          <span className="text-sm font-semibold">{alarmOn ? "🔇 Stop Alarm" : "🔊 Loud Alarm"}</span>
        </button>

        <Link
          to="/guide/first-aid-medical"
          className="flex flex-col items-center gap-2 border border-border rounded-lg p-4 hover:border-primary/50 transition-colors bg-card"
        >
          <Heart className="h-8 w-8 text-primary" />
          <span className="text-sm font-semibold">First Aid Guide</span>
        </Link>
      </div>

      {/* Location */}
      <div className="border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">📍 Your Location</h3>
        </div>
        {location ? (
          <div>
            <p className="mono text-sm text-primary">
              {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Share these coordinates with emergency services</p>
            <button
              onClick={() => navigator.clipboard?.writeText(`${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`)}
              className="mt-2 text-xs text-primary hover:text-primary/80 mono"
            >
              📋 Copy Coordinates
            </button>
          </div>
        ) : locError ? (
          <p className="text-sm text-muted-foreground">{locError}</p>
        ) : (
          <p className="text-sm text-muted-foreground animate-pulse">Getting location...</p>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-2">
        <Link to="/emergency-checklist" className="border border-border rounded-lg p-3 text-center hover:border-primary/50 transition-colors bg-card">
          <span className="text-sm font-semibold">⚡ Emergency Checklist</span>
        </Link>
        <Link to="/sos" className="border border-border rounded-lg p-3 text-center hover:border-primary/50 transition-colors bg-card">
          <span className="text-sm font-semibold">🚨 SOS Signals</span>
        </Link>
        <Link to="/morse" className="border border-border rounded-lg p-3 text-center hover:border-primary/50 transition-colors bg-card">
          <span className="text-sm font-semibold">📡 Morse Code</span>
        </Link>
        <Link to="/guide" className="border border-border rounded-lg p-3 text-center hover:border-primary/50 transition-colors bg-card">
          <span className="text-sm font-semibold">📖 Survival Guide</span>
        </Link>
      </div>

      <div className="mt-6 border border-border rounded-lg p-3">
        <p className="text-xs text-muted-foreground text-center">
          📋 Numbers verified via NDMA, MoHFW, Indian Red Cross Society, Civil Defence India (2024)
        </p>
      </div>
    </div>
  );
};

export default EmergencyMode;
