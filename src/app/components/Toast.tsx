"use client";

import { useEffect } from "react";
import { useMoxsend } from "../context/MoxsendContext";

export default function Toast() {
  const { toastMessage, toastType, dismissToast } = useMoxsend();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(dismissToast, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, dismissToast]);

  if (!toastMessage) return null;

  const bgColor =
    toastType === "success"
      ? "bg-off-black"
      : toastType === "error"
      ? "bg-error"
      : "bg-off-black";

  const icon =
    toastType === "success"
      ? "check_circle"
      : toastType === "error"
      ? "error"
      : "info";

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-slide-in-bottom">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px]`}
      >
        <span className="material-symbols-outlined filled text-lg">
          {icon}
        </span>
        <span className="text-sm font-medium flex-1">{toastMessage}</span>
        <button
          onClick={dismissToast}
          className="material-symbols-outlined text-white/60 hover:text-white text-lg transition-colors"
        >
          close
        </button>
      </div>
    </div>
  );
}
