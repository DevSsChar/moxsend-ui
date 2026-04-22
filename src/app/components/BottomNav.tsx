"use client";

import { useMoxsend } from "../context/MoxsendContext";

const navItems = [
  { label: "Create", icon: "edit_note" },
  { label: "History", icon: "history" },
  { label: "Templates", icon: "dashboard_customize" },
  { label: "Settings", icon: "settings" },
];

export default function BottomNav() {
  return (
    <footer className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 border-t border-border-default bg-bg-primary z-50">
      {navItems.map((item, i) => (
        <button
          key={item.label}
          className={`flex flex-col items-center justify-center pt-2 transition-all active:scale-90 ${
            i === 0
              ? "text-brand-orange border-t-2 border-brand-orange"
              : "text-text-secondary hover:text-off-black"
          }`}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="text-[12px] uppercase tracking-[0.6px]">
            {item.label}
          </span>
        </button>
      ))}
    </footer>
  );
}
