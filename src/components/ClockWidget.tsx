import { useState, useEffect, useCallback, useRef } from "react";
import { Clock, Bell, BellOff, X } from "lucide-react";

const ALARM_KEY = "survival-alarm";

const ClockWidget = () => {
  const [now, setNow] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState<string>(() => localStorage.getItem(ALARM_KEY) || "");
  const [alarmActive, setAlarmActive] = useState(!!localStorage.getItem(ALARM_KEY));
  const [alarmRinging, setAlarmRinging] = useState(false);
  const [showAlarmInput, setShowAlarmInput] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Check alarm
  useEffect(() => {
    if (!alarmActive || !alarmTime) return;
    const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    if (hhmm === alarmTime && now.getSeconds() === 0) {
      setAlarmRinging(true);
      startAlarmSound();
    }
  }, [now, alarmActive, alarmTime]);

  const startAlarmSound = useCallback(() => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 660;
      gain.gain.value = 0.4;
      osc.connect(gain);
      gain.connect(ctx.destination);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 4;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 200;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      osc.start();
      audioRef.current = ctx;
      oscRef.current = osc;
    } catch {
      // Audio not supported
    }
  }, []);

  const stopAlarm = useCallback(() => {
    oscRef.current?.stop();
    oscRef.current = null;
    audioRef.current?.close();
    audioRef.current = null;
    setAlarmRinging(false);
  }, []);

  const setAlarm = (time: string) => {
    setAlarmTime(time);
    setAlarmActive(true);
    localStorage.setItem(ALARM_KEY, time);
    setShowAlarmInput(false);
  };

  const clearAlarm = () => {
    setAlarmTime("");
    setAlarmActive(false);
    localStorage.removeItem(ALARM_KEY);
    stopAlarm();
  };

  useEffect(() => {
    return () => {
      oscRef.current?.stop();
      audioRef.current?.close();
    };
  }, []);

  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  const dateStr = now.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="w-full border border-border rounded-xl bg-card p-4 mb-6">
      {/* Alarm ringing overlay */}
      {alarmRinging && (
        <div className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center" onClick={stopAlarm}>
          <div className="text-center p-8 animate-pulse" onClick={(e) => e.stopPropagation()}>
            <p className="text-6xl mb-4" aria-hidden="true">⏰</p>
            <p className="text-3xl font-bold text-destructive mb-2">ALARM!</p>
            <p className="text-xl mono text-primary mb-6">{alarmTime}</p>
            <button
              onClick={stopAlarm}
              className="touch-target bg-destructive text-destructive-foreground px-8 py-3 rounded-lg font-semibold text-lg"
              aria-label="Dismiss alarm"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Current Time</span>
          </div>
          <p className="text-2xl font-bold mono text-primary leading-tight" aria-live="polite" aria-label={`Current time: ${timeStr}`}>
            {timeStr}
          </p>
          <p className="text-sm mono text-muted-foreground" aria-label={`Current date: ${dateStr}`}>
            {dateStr}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1">
          {alarmActive && alarmTime ? (
            <div className="flex items-center gap-2">
              <span className="text-xs mono text-primary">⏰ {alarmTime}</span>
              <button
                onClick={clearAlarm}
                className="touch-target p-2 text-muted-foreground hover:text-destructive transition-colors"
                aria-label="Remove alarm"
              >
                <BellOff className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Remove alarm</span>
              </button>
            </div>
          ) : showAlarmInput ? (
            <div className="flex items-center gap-1">
              <input
                type="time"
                className="bg-secondary border border-border rounded px-2 py-1 text-sm mono focus:outline-none focus:ring-1 focus:ring-primary"
                onChange={(e) => e.target.value && setAlarm(e.target.value)}
                aria-label="Set alarm time"
                autoFocus
              />
              <button
                onClick={() => setShowAlarmInput(false)}
                className="touch-target p-2 text-muted-foreground hover:text-foreground"
                aria-label="Cancel setting alarm"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAlarmInput(true)}
              className="touch-target flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors p-2"
              aria-label="Set an alarm"
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="text-xs font-semibold">Set Alarm</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClockWidget;
