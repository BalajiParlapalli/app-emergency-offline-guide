import { useEffect } from "react";
import { useBattery } from "@/hooks/use-battery";
import { Battery, BatteryWarning } from "lucide-react";

const PowerSaveBanner = () => {
  const { isLowBattery, level, supported } = useBattery();

  useEffect(() => {
    if (isLowBattery) {
      document.documentElement.classList.add("power-save");
    } else {
      document.documentElement.classList.remove("power-save");
    }
    return () => document.documentElement.classList.remove("power-save");
  }, [isLowBattery]);

  if (!isLowBattery) return null;

  return (
    <div
      role="status"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-destructive/90 text-destructive-foreground px-4 py-1.5 text-xs font-semibold"
    >
      <BatteryWarning className="h-3.5 w-3.5" aria-hidden="true" />
      <span>Power saving mode · {Math.round(level * 100)}% battery · Animations disabled</span>
    </div>
  );
};

export default PowerSaveBanner;
