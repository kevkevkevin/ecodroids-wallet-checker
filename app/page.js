"use client";
import { useMemo, useState } from "react";
import Modal from "@/components/Modal";
import wallets from "@/data/wallets.json";
import BackgroundCarousel from "@/components/BackgroundCarousel";
import "./globals.css";

const SOLANA_BASE58_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export default function Page() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState(null);

  const WALLET_SET = useMemo(() => new Set(wallets), []);

  function checkAddress(input) {
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Please paste a wallet address.");
      return;
    }
    if (!SOLANA_BASE58_RE.test(trimmed)) {
      setError("That doesn’t look like a valid Solana address.");
      return;
    }
    setError(null);
    setResult(WALLET_SET.has(trimmed) ? "hit" : "miss");
    setOpen(true);
  }

  return (
    <main className="relative flex items-center justify-center min-h-screen">
      {/* 🔥 Background carousel */}
      <BackgroundCarousel />

      {/* Content on top */}
      <div className="relative z-10 rounded-2xl border bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md shadow-xl p-6 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-pink-600 dark:text-pink-300 flex items-center justify-center gap-3">
          <img src="images/astrid.gif" alt="Chick" className="w-10 h-10" />
          Ecodroids Wallet Checker
          <img src="images/bao.gif" alt="Penguin" className="w-10 h-10" />
        </h1>
        <p className="text-sm opacity-80 mb-6">
          Paste a wallet address to see if you’re on the cute list 💖
        </p>

        <div className="flex gap-2">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Solana wallet address"
            className="flex-1 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 bg-white dark:bg-zinc-800"
          />
          <button
            onClick={() => checkAddress(address)}
            className="rounded-xl px-5 py-3 font-medium border bg-pink-400 text-white hover:bg-pink-500 transition"
          >
            Check
          </button>
        </div>

        {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        variant={result === "hit" ? "success" : "error"}
        title={
        result === "hit" ? (
          <span>
            ✨ You’re on the list — beep boop 🤖
          </span>
        ) : (
          <span>
            🐱 Not on the list —{" "}
            <a
              href="https://www.daos.fun/4P8QWkbRaWnhv2EVqNA2U8PqEt6QWVewbzjym3V4daos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 underline hover:text-pink-800"
            >
              buy some $ESPRK
            </a>
          </span>
        )
      }

        description={
          result === "hit"
            ? "Welcome! You can enjoy your free mint 🤖🎀"
            : "Paste a different wallet or go pick up some TOKEN first 💎\nca: 4P8QWkbRaWnhv2EVqNA2U8PqEt6QWVewbzjym3V4daos"
        }
      />
    </main>
  );
}
