import { Button } from "@src/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@src/providers/theme-provider";

export const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleTheme}
      data-testid="darkmode-toggle"
    >
      {theme === "dark" ? (
        <Moon className="stroke-accent1" />
      ) : (
        <Sun className="stroke-accent1" />
      )}
    </Button>
  );
};
