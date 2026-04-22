"use client";

import { useMoxsend } from "../context/MoxsendContext";

export default function ComparisonView() {
  const { improvement, acceptImprovement, keepOriginal, setView } = useMoxsend();

  if (!improvement) return null;

  const { original, improved, stats, insights } = improvement;

  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => setView("variations")}
        className="flex items-center gap-1 text-sm text-text-secondary hover:text-off-black transition-colors mb-6"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Back to Variations
      </button>

      {/* Header */}
      <div className="mb-10 md:mb-12 animate-fade-in-up">
        <p className="mono-label text-[12px] text-brand-orange font-bold mb-3">
          AI Optimization Engine
        </p>
        <h1 className="saans-display text-4xl md:text-5xl lg:text-6xl font-normal text-off-black max-w-3xl">
          Review your improved message.
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 mt-6 max-w-2xl font-light">
          We&apos;ve refined your tone for better professional engagement while
          maintaining your core message intent.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Summary Sidebar */}
        <div
          className="md:col-span-4 space-y-6 animate-fade-in-up stagger-1"
          style={{ opacity: 0 }}
        >
          <div className="bg-surface-container-low border border-border-default rounded-lg p-6">
            <h3 className="saans-headline text-xl md:text-2xl font-normal mb-4">
              Optimization Summary
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-brand-orange filled">
                  check_circle
                </span>
                <span className="text-sm font-medium">
                  Clarity: {stats.clarity}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-brand-orange filled">
                  check_circle
                </span>
                <span className="text-sm font-medium">
                  Tone: {stats.tone}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="material-symbols-outlined text-brand-orange filled">
                  check_circle
                </span>
                <span className="text-sm font-medium">
                  Length: {stats.length}
                </span>
              </li>
            </ul>
          </div>

          {/* AI Insights */}
          <div className="bg-off-black text-white rounded-lg p-6 overflow-hidden relative group">
            <div className="relative z-10">
              <h4 className="text-lg font-medium mb-2">AI Insights</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {insights}
              </p>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-20 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-8xl md:text-9xl">
                auto_awesome
              </span>
            </div>
          </div>
        </div>

        {/* Side-by-Side Panels */}
        <div
          className="md:col-span-8 grid grid-cols-1 lg:grid-cols-2 gap-6 h-full animate-fade-in-up stagger-2"
          style={{ opacity: 0 }}
        >
          {/* Original Card */}
          <div className="bg-white border border-border-default rounded-lg flex flex-col h-full min-h-[350px] md:min-h-[400px]">
            <div className="p-4 border-b border-border-default flex items-center justify-between">
              <span className="mono-label text-[10px] text-zinc-500 uppercase">
                Original Draft
              </span>
              <span className="material-symbols-outlined text-zinc-400 text-sm">
                history
              </span>
            </div>
            <div className="p-6 md:p-8 flex-grow">
              <p className="text-text-secondary leading-relaxed">
                <strong>Subject:</strong> {original.subjectLine}
                <br /><br />
                {original.opener}
                <br /><br />
                {original.body}
              </p>
            </div>
          </div>

          {/* Improved Card */}
          <div className="bg-white border-2 border-brand-orange rounded-lg flex flex-col h-full min-h-[350px] md:min-h-[400px] relative">
            <div className="p-4 border-b border-brand-orange/10 bg-brand-orange/[0.03] flex items-center justify-between">
              <span className="mono-label text-[10px] text-brand-orange uppercase font-bold">
                Moxsend AI Version
              </span>
              <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            </div>
            <div className="p-6 md:p-8 flex-grow">
              <p className="text-off-black leading-relaxed font-medium">
                <strong>Subject:</strong> {improved.subjectLine}
                <br /><br />
                {improved.opener}
                <br /><br />
                {improved.body.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
            {/* Recommended Badge */}
            <div className="absolute -top-3 -right-3 bg-brand-orange text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">
              Recommended
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className="mt-10 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-4 bg-white/80 backdrop-blur-md p-6 rounded-xl border border-border-default animate-fade-in-up stagger-3"
        style={{ opacity: 0 }}
      >
        <button
          onClick={acceptImprovement}
          className="w-full md:w-auto px-8 py-4 bg-off-black text-white rounded-[4px] text-base font-bold btn-scale transition-all flex items-center justify-center gap-2 group"
        >
          <span>Accept Improved Version</span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
        <button
          onClick={keepOriginal}
          className="w-full md:w-auto px-8 py-4 bg-transparent border border-off-black text-off-black rounded-[4px] text-base font-bold btn-scale transition-all flex items-center justify-center gap-2"
        >
          <span>Keep Original</span>
        </button>
      </div>
    </main>
  );
}
