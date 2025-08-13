"use client";
import { useState, createContext, useContext, useEffect } from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<Partial<Pick<ThemeContextType, "theme">>>({
    theme: "light",
  });

  const toggleTheme = () => {
    setTheme((prev) => ({
      theme: prev.theme === "light" ? "dark" : "light",
    }));
  };

  useEffect(() => {
    // Check localStorage first, then system preference
    setIsMounted(true);
    const savedTheme = localStorage.getItem(
      "theme"
    ) as ThemeContextType["theme"];
    if (savedTheme) {
      setTheme({ theme: savedTheme });
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      console.log("🚀 ~ ThemePrivider ~ systemPrefersDark:", systemPrefersDark);
      setTheme({ theme: systemPrefersDark ? "dark" : "light" });
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("theme", theme.theme ?? "light");
      if (theme.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme, isMounted]);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme.theme ?? "light",
        setTheme: (newTheme) => setTheme({ theme: newTheme }),
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
