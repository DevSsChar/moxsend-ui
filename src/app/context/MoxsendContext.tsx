"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

// ── Types ──
export interface EmailVariation {
  id: string;
  label: "A" | "B" | "C";
  subjectLine: string;
  opener: string;
  body: string;
  tone: string;
}

export interface ImprovementResult {
  original: EmailVariation;
  improved: EmailVariation;
  stats: {
    clarity: string;
    tone: string;
    length: string;
  };
  insights: string;
}

export type AppView = "dashboard" | "variations" | "comparison" | "csv";

interface MoxsendState {
  view: AppView;
  productDescription: string;
  variations: EmailVariation[];
  selectedVariation: EmailVariation | null;
  improvement: ImprovementResult | null;
  isGenerating: boolean;
  isImproving: boolean;
  toastMessage: string | null;
  toastType: "success" | "error" | "info";
}

interface MoxsendContextType extends MoxsendState {
  setView: (view: AppView) => void;
  setProductDescription: (desc: string) => void;
  generateEmails: () => Promise<void>;
  selectVariation: (v: EmailVariation) => void;
  improveEmail: (v: EmailVariation) => Promise<void>;
  acceptImprovement: () => void;
  keepOriginal: () => void;
  copyEmail: (email: EmailVariation) => void;
  resetSession: () => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  dismissToast: () => void;
}

const MoxsendContext = createContext<MoxsendContextType | undefined>(undefined);

// ── Mock Data Generators ──
const mockVariations: EmailVariation[] = [
  {
    id: "var-a",
    label: "A",
    subjectLine: "Scaling our Q4 impact: A strategic proposal for Synergy Corp",
    opener:
      '"I\'ve been following Synergy Corp\'s expansion into the EMEA market with great interest..."',
    body: "Given our shared focus on sustainable infrastructure, I believe a formal partnership could accelerate both our roadmaps. Our current pilot data suggests a 14% efficiency gain when integrated with your existing API stack.",
    tone: "Professional",
  },
  {
    id: "var-b",
    label: "B",
    subjectLine: "Let's build something incredible together — a partnership pitch",
    opener:
      '"Your recent keynote on innovation culture really resonated with our team..."',
    body: "We've been quietly building a solution that complements your flagship product perfectly. I'd love to share a quick demo — we've seen 3x engagement lift in beta, and I think your audience would go wild for it.",
    tone: "Creative",
  },
  {
    id: "var-c",
    label: "C",
    subjectLine: "Partnership inquiry: Integration & Co-Marketing",
    opener:
      '"Hi team, I\'m reaching out to discuss a potential collaboration between our firms."',
    body: "Our latest feature release directly solves the friction point mentioned in your recent whitepaper. I'd like to propose a 15-minute sync next Tuesday to explore how we can provide immediate value to your client base.",
    tone: "Direct",
  },
];

const mockImprovement: Omit<ImprovementResult, "original"> = {
  improved: {
    id: "var-improved",
    label: "A",
    subjectLine: "Project Update & Launch Timeline Check-in",
    opener: '"I hope your week is going well."',
    body: 'Following our conversation last Tuesday, I\'m checking in to see if there are any updates on the project status. We want to ensure everything remains aligned for next month\'s launch.\n\nCould you let me know if you have a few minutes to connect this week?\n\nBest regards,\nAlex',
    tone: "Professional",
  },
  stats: {
    clarity: "Increased by 42%",
    tone: "Professional & Warm",
    length: "12% more concise",
  },
  insights:
    "The original version contained passive phrasing. We adjusted the call-to-action to be more direct yet polite.",
};

// ── Provider ──
export function MoxsendProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MoxsendState>({
    view: "dashboard",
    productDescription: "",
    variations: [],
    selectedVariation: null,
    improvement: null,
    isGenerating: false,
    isImproving: false,
    toastMessage: null,
    toastType: "info",
  });

  const setView = useCallback((view: AppView) => {
    setState((prev) => ({ ...prev, view }));
  }, []);

  const setProductDescription = useCallback((desc: string) => {
    setState((prev) => ({ ...prev, productDescription: desc }));
  }, []);

  const generateEmails = useCallback(async () => {
    setState((prev) => ({ ...prev, isGenerating: true }));
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setState((prev) => ({
      ...prev,
      isGenerating: false,
      variations: mockVariations,
      view: "variations",
    }));
  }, []);

  const selectVariation = useCallback((v: EmailVariation) => {
    setState((prev) => ({ ...prev, selectedVariation: v }));
  }, []);

  const improveEmail = useCallback(async (v: EmailVariation) => {
    setState((prev) => ({ ...prev, isImproving: true, selectedVariation: v }));
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setState((prev) => ({
      ...prev,
      isImproving: false,
      improvement: { ...mockImprovement, original: v },
      view: "comparison",
    }));
  }, []);

  const acceptImprovement = useCallback(() => {
    setState((prev) => {
      if (!prev.improvement) return prev;
      const updated = prev.variations.map((v) =>
        v.id === prev.improvement!.original.id ? prev.improvement!.improved : v
      );
      return {
        ...prev,
        variations: updated,
        improvement: null,
        view: "variations",
        toastMessage: "Improved version accepted!",
        toastType: "success" as const,
      };
    });
  }, []);

  const keepOriginal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      improvement: null,
      view: "variations",
      toastMessage: "Original version kept.",
      toastType: "info" as const,
    }));
  }, []);

  const copyEmail = useCallback((email: EmailVariation) => {
    const text = `Subject: ${email.subjectLine}\n\n${email.opener}\n\n${email.body}`;
    navigator.clipboard.writeText(text).then(() => {
      setState((prev) => ({
        ...prev,
        toastMessage: "Email copied to clipboard!",
        toastType: "success" as const,
      }));
    });
  }, []);

  const resetSession = useCallback(() => {
    setState({
      view: "dashboard",
      productDescription: "",
      variations: [],
      selectedVariation: null,
      improvement: null,
      isGenerating: false,
      isImproving: false,
      toastMessage: null,
      toastType: "info",
    });
  }, []);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      setState((prev) => ({ ...prev, toastMessage: message, toastType: type }));
    },
    []
  );

  const dismissToast = useCallback(() => {
    setState((prev) => ({ ...prev, toastMessage: null }));
  }, []);

  return (
    <MoxsendContext.Provider
      value={{
        ...state,
        setView,
        setProductDescription,
        generateEmails,
        selectVariation,
        improveEmail,
        acceptImprovement,
        keepOriginal,
        copyEmail,
        resetSession,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </MoxsendContext.Provider>
  );
}

export function useMoxsend() {
  const ctx = useContext(MoxsendContext);
  if (!ctx) throw new Error("useMoxsend must be used within a MoxsendProvider");
  return ctx;
}
