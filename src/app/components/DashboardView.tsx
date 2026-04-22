"use client";

import { useState } from "react";
import { useMoxsend } from "../context/MoxsendContext";

export default function DashboardView() {
  const { productDescription, setProductDescription, generateEmails, isGenerating, setView } = useMoxsend();
  const [selectedTone, setSelectedTone] = useState("friendly");

  const tones = [
    { label: "Friendly Tone", icon: "temp_preferences_custom" },
    { label: "Professional", icon: "business" },
    { label: "Persuasive", icon: "campaign" },
  ];

  const canGenerate = productDescription.trim().length >= 20;

  return (
    <main className="pt-24 pb-32 px-6 max-w-5xl mx-auto">
      {/* Welcome Section */}
      <section className="mb-12 animate-fade-in-up">
        <span className="mono-label text-[12px] text-brand-primary font-medium mb-2 block">
          Welcome back, Sarah
        </span>
        <h1 className="text-[40px] md:text-[54px] saans-headline font-normal text-off-black mb-4">
          What are we sending today?
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
          Turn your product vision into high-converting email sequences in
          seconds using our AI-first helpdesk logic.
        </p>
      </section>

      {/* Main Input Canvas */}
      <div className="space-y-6">
        <div
          className="bg-bg-card card-shadow rounded-xl p-6 md:p-8 transition-all duration-300 animate-fade-in-up stagger-1"
          style={{ opacity: 0 }}
        >
          {/* Card Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-primary-fixed rounded-lg">
              <span className="material-symbols-outlined text-brand-primary">
                edit_note
              </span>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-normal saans-headline">
                New Email Campaign
              </h2>
              <p className="text-text-secondary text-sm">
                Briefly describe what you&apos;re building.
              </p>
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full min-h-[200px] md:min-h-[240px] bg-bg-primary border-none focus:ring-0 text-xl md:text-3xl font-normal saans-headline placeholder-border-default resize-none p-0 outline-none"
              placeholder="Describe your product & target audience..."
            />
            {productDescription.length > 0 && productDescription.length < 20 && (
              <p className="absolute bottom-2 right-0 text-xs text-text-secondary">
                {20 - productDescription.length} more characters needed
              </p>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between border-t border-border-default pt-6 gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              {tones.map((tone) => (
                <button
                  key={tone.label}
                  onClick={() => setSelectedTone(tone.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-[4px] text-sm font-medium transition-all btn-hover ${
                    selectedTone === tone.label
                      ? "bg-off-black text-white"
                      : "bg-surface-container border border-border-default"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {tone.icon}
                  </span>
                  {tone.label}
                </button>
              ))}
            </div>

            <button
              onClick={generateEmails}
              disabled={!canGenerate || isGenerating}
              className={`w-full md:w-auto px-8 h-12 rounded-[4px] font-bold text-base transition-all flex items-center justify-center gap-2 ${
                canGenerate && !isGenerating
                  ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20 btn-scale"
                  : "bg-surface-container-high text-text-secondary cursor-not-allowed"
              }`}
            >
              {isGenerating ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">
                    progress_activity
                  </span>
                  Generating...
                </>
              ) : (
                "Generate Email"
              )}
            </button>
          </div>
        </div>

        {/* Bulk CSV Section */}
        <div
          onClick={() => setView("csv")}
          className="bg-surface-container border border-border-default rounded-xl p-6 group cursor-pointer transition-colors hover:bg-white animate-fade-in-up stagger-2"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-text-secondary">
                upload_file
              </span>
              <div>
                <h3 className="font-bold text-off-black">
                  Bulk Generate via CSV
                </h3>
                <p className="text-sm text-text-secondary">
                  Scale your outreach by uploading a list of product
                  descriptions.
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-text-secondary transition-transform group-hover:translate-x-1">
              chevron_right
            </span>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in-up stagger-3"
        style={{ opacity: 0 }}
      >
        {/* Feature Card */}
        <div className="md:col-span-2 bg-bg-card card-shadow rounded-xl p-6 relative overflow-hidden group">
          <div className="relative z-10">
            <span className="mono-label text-[10px] text-brand-primary font-bold">
              New Feature
            </span>
            <h3 className="text-xl md:text-2xl saans-headline mt-2 mb-4">
              Integrate with Intercom Fin
            </h3>
            <p className="text-text-secondary text-sm max-w-sm mb-6">
              Automatically sync your AI-generated emails with your helpdesk to
              provide seamless customer experiences.
            </p>
            <button className="text-off-black font-bold text-sm border-b-2 border-off-black pb-1 hover:text-brand-orange hover:border-brand-orange transition-colors">
              Learn more
            </button>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 bg-primary-fixed rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
        </div>

        {/* Pro Templates Card */}
        <div className="bg-off-black rounded-xl p-6 flex flex-col justify-between text-white">
          <span className="material-symbols-outlined text-brand-orange text-4xl filled">
            workspace_premium
          </span>
          <div className="mt-4">
            <h3 className="text-xl saans-headline mb-2">Pro Templates</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Access 50+ conversion-optimized email flows designed by growth
              experts.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
