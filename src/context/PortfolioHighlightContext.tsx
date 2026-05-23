"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PortfolioHighlightContextValue = {
  highlightCaseId: string | null;
  setHighlightCaseId: (id: string | null) => void;
  scrollToPortfolio: (caseId?: string) => void;
};

const PortfolioHighlightContext =
  createContext<PortfolioHighlightContextValue | null>(null);

export function PortfolioHighlightProvider({ children }: { children: ReactNode }) {
  const [highlightCaseId, setHighlightCaseId] = useState<string | null>(null);

  const scrollToPortfolio = useCallback((caseId?: string) => {
    if (caseId) setHighlightCaseId(caseId);
    const el = document.getElementById("portofolio");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const value = useMemo(
    () => ({
      highlightCaseId,
      setHighlightCaseId,
      scrollToPortfolio,
    }),
    [highlightCaseId, scrollToPortfolio]
  );

  return (
    <PortfolioHighlightContext.Provider value={value}>
      {children}
    </PortfolioHighlightContext.Provider>
  );
}

export function usePortfolioHighlight() {
  const ctx = useContext(PortfolioHighlightContext);
  if (!ctx) {
    throw new Error("usePortfolioHighlight must be used within PortfolioHighlightProvider");
  }
  return ctx;
}
