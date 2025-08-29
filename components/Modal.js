"use client";
import { useEffect } from "react";

export default function Modal({ open, onClose, title, description, variant = "success" }) {
  useEffect(() => {
    const onEsc = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className={`relative w-full max-w-md rounded-2xl border shadow-xl p-6 bg-white dark:bg-zinc-900 ${
          variant === "success" ? "border-green-500" : "border-rose-500"
        }`}
      >
        <h2
          className={`text-xl font-semibold mb-2 ${
            variant === "success" ? "text-green-600" : "text-rose-600"
          }`}
        >
          {title}
        </h2>
        {description && <p className="text-sm opacity-80">{description}</p>}
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl border px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5"
        >
          Close
        </button>
      </div>
    </div>
  );
}
