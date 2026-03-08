import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="touch-target flex items-center justify-center rounded-lg border border-border bg-card p-2 transition-colors hover:border-primary/50"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-primary" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5 text-primary" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
