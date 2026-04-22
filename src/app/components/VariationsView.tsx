"use client";

import { useMoxsend, EmailVariation } from "../context/MoxsendContext";

function VariationCard({
  variation,
  index,
}: {
  variation: EmailVariation;
  index: number;
}) {
  const { copyEmail, improveEmail, isImproving } = useMoxsend();

  const dotIndicators = ["A", "B", "C"];

  return (
    <article
      className="group bg-white rounded-3xl p-6 md:p-8 sunken-shadow flex flex-col h-full border border-transparent hover:border-border-variant/10 transition-all duration-300 animate-fade-in-up"
      style={{ opacity: 0, animationDelay: `${index * 0.15}s` }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6 md:mb-8">
        <span className="px-4 py-1.5 rounded-full bg-surface-container-highest text-text-tertiary text-[11px] font-bold tracking-wider uppercase">
          Variation {variation.label}
        </span>
        <div className="flex gap-1">
          {dotIndicators.map((dot, i) => (
            <span
              key={dot}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-brand-primary" : "bg-surface-variant"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 md:space-y-6 flex-1">
        <section>
          <h4 className="text-[10px] text-text-tertiary font-bold uppercase tracking-widest mb-2">
            Subject Line
          </h4>
          <p className="text-lg md:text-xl font-bold leading-snug">
            {variation.subjectLine}
          </p>
        </section>

        <section>
          <h4 className="text-[10px] text-text-tertiary font-bold uppercase tracking-widest mb-2">
            Opening
          </h4>
          <p className="text-text-primary leading-relaxed italic">
            {variation.opener}
          </p>
        </section>

        <section>
          <h4 className="text-[10px] text-text-tertiary font-bold uppercase tracking-widest mb-2">
            Body excerpt
          </h4>
          <p className="text-text-primary leading-relaxed">{variation.body}</p>
        </section>
      </div>

      {/* Actions */}
      <div className="mt-8 md:mt-10 pt-6 md:pt-8 flex items-center justify-between gap-3 border-t border-surface-container-low">
        <button
          onClick={() => copyEmail(variation)}
          className="flex-1 py-3 px-4 rounded-full bg-surface-container-highest text-text-primary font-semibold text-sm hover:bg-surface-container-high transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">
            content_copy
          </span>
          Copy
        </button>
        <button
          onClick={() => improveEmail(variation)}
          disabled={isImproving}
          className="material-symbols-outlined w-12 h-12 rounded-full bg-surface-container-highest text-text-primary hover:text-brand-orange transition-all active:scale-95 flex items-center justify-center disabled:opacity-50"
        >
          auto_fix_high
        </button>
      </div>
    </article>
  );
}

export default function VariationsView() {
  const { variations, setView } = useMoxsend();

  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-10 md:mb-12 space-y-3 animate-fade-in-up">
        <button
          onClick={() => setView("dashboard")}
          className="flex items-center gap-1 text-sm text-text-secondary hover:text-off-black transition-colors mb-4"
        >
          <span className="material-symbols-outlined text-lg">
            arrow_back
          </span>
          Back to Create
        </button>
        <div className="inline-flex items-center px-3 py-1 bg-primary-fixed text-brand-primary text-[10px] font-bold tracking-widest uppercase rounded-full">
          AI Analysis Complete
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-primary">
          Choose your narrative.
        </h2>
        <p className="text-text-tertiary max-w-xl text-base md:text-lg leading-relaxed">
          We&apos;ve crafted three distinct approaches for your partnership
          request. Select the tone that best fits your relationship with the
          recipient.
        </p>
      </header>

      {/* Variations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        {variations.map((v, i) => (
          <VariationCard key={v.id} variation={v} index={i} />
        ))}
      </div>

      {/* AI Insight Panel */}
      <section
        className="mt-12 p-6 md:p-8 rounded-2xl md:rounded-[2rem] bg-surface-container-low border border-border-variant/10 flex flex-col md:flex-row gap-6 md:gap-8 items-center animate-fade-in-up"
        style={{ opacity: 0, animationDelay: "0.5s" }}
      >
        <div className="w-full md:w-1/3">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-brand-primary to-brand-orange">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-7xl opacity-30 filled">
                auto_awesome
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <span className="text-white font-bold text-xs uppercase tracking-widest">
                Sentiment Analysis Engine
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight">
            AI Recommendation
          </h3>
          <p className="text-text-tertiary leading-relaxed text-sm md:text-base">
            Based on Synergy Corp&apos;s recent public disclosures and brand
            voice analysis,{" "}
            <strong className="text-text-primary">Variation A</strong> has a 78%
            higher probability of a positive response. The professional tone
            aligns with their conservative corporate communication style.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1 bg-primary-fixed-dim text-brand-primary text-[10px] font-bold rounded-full">
              High Conversion
            </span>
            <span className="px-3 py-1 bg-surface-container-high text-text-tertiary text-[10px] font-bold rounded-full">
              Strategic Tone
            </span>
            <span className="px-3 py-1 bg-surface-container-high text-text-tertiary text-[10px] font-bold rounded-full">
              Personalized Insight
            </span>
          </div>
        </div>
      </section>

      {/* Floating Refine Bar */}
      <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
        <div className="glass-panel sunken-shadow rounded-full p-2 flex items-center gap-2 border border-border-variant/10">
          <div className="w-10 h-10 rounded-full primary-gradient flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="material-symbols-outlined text-white filled">
              auto_awesome
            </span>
          </div>
          <input
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-text-primary placeholder:text-text-secondary/50 px-4 outline-none"
            placeholder="Refine these emails... (e.g., 'Make them more urgent')"
            type="text"
          />
          <button className="px-6 py-2.5 rounded-full text-white primary-gradient font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex-shrink-0">
            Execute
          </button>
        </div>
      </div>
    </main>
  );
}
