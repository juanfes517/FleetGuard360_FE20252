import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface AccessibilityContextValue {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (value: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined);

const STORAGE_KEY = "accessibility-mode";
const ACCESSIBILITY_ATTRIBUTE = "data-accessibility-mode";
const ACCESSIBILITY_VALUE = "accessible";

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [enabled, setEnabledState] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(STORAGE_KEY) === "enabled";
  });

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;

    if (enabled) {
      root.setAttribute(ACCESSIBILITY_ATTRIBUTE, ACCESSIBILITY_VALUE);
      window.localStorage.setItem(STORAGE_KEY, "enabled");
    } else {
      root.removeAttribute(ACCESSIBILITY_ATTRIBUTE);
      window.localStorage.setItem(STORAGE_KEY, "disabled");
    }
  }, [enabled]);

  const toggle = () => setEnabledState((previous) => !previous);
  const setEnabled = (value: boolean) => setEnabledState(value);

  const value = useMemo<AccessibilityContextValue>(() => ({
    enabled,
    toggle,
    setEnabled,
  }), [enabled]);

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibilityMode = () => {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error("useAccessibilityMode must be used within an AccessibilityProvider");
  }

  return context;
};
