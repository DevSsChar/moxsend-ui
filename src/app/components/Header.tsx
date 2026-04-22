"use client";

import { useMoxsend } from "../context/MoxsendContext";

export default function Header() {
  const { view, setView, resetSession } = useMoxsend();

  const navItems = [
    { label: "Create", view: "dashboard" as const, active: view === "dashboard" || view === "variations" || view === "comparison" },
    { label: "History", view: null, active: false },
    { label: "Templates", view: null, active: false },
    { label: "Settings", view: null, active: false },
  ];

  return (
    <header className="fixed top-0 w-full z-50 border-b border-border-default bg-bg-primary flex items-center justify-between px-6 h-16">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={resetSession}
      >
        <span className="material-symbols-outlined text-brand-orange filled">
          bolt
        </span>
        <span className="text-xl font-bold tracking-[-0.96px] text-off-black">
          Moxsend AI
        </span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => item.view && setView(item.view)}
            className={`transition-transform duration-200 hover:scale-110 font-medium ${
              item.active ? "text-off-black" : "text-text-secondary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {view !== "dashboard" && (
          <button
            onClick={resetSession}
            className="bg-off-black text-white px-4 py-2 rounded-[4px] text-sm font-bold btn-hover"
          >
            New Message
          </button>
        )}
        <button className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-brand-orange to-brand-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
            S
          </div>
        </button>
      </div>
    </header>
  );
}
