import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const ClockWidget = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert to IST (UTC+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000;
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const ist = new Date(utc + istOffset);
  const timeStr = ist.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  const dateStr = ist.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="w-full border border-border rounded-xl bg-card p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Current Time</span>
          </div>
          <p className="text-2xl font-bold mono text-primary leading-tight" aria-live="polite" aria-label={`Current time in IST: ${timeStr}`}>
            {timeStr} <span className="text-sm align-middle">IST</span>
          </p>
          <p className="text-sm mono text-muted-foreground" aria-label={`Current date: ${dateStr}`}>
            {dateStr}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClockWidget;
