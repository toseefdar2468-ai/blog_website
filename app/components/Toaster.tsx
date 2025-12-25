"use client";

import * as React from "react";
import type { ToastType } from "../../lib/toast";

type Toast = { id: number; message: string; type: ToastType };

export default function Toaster() {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const idRef = React.useRef(1);

  React.useEffect(() => {
    function onToast(e: Event) {
      const detail = (e as CustomEvent).detail as { message: string; type: ToastType };
      const id = idRef.current++;
      setToasts((s) => [...s, { id, message: detail.message, type: detail.type }]);
      // auto remove after 4s
      setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), 4000);
    }

    window.addEventListener("devblog:toast", onToast as EventListener);
    return () => window.removeEventListener("devblog:toast", onToast as EventListener);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-4 top-4 z-[9999] flex w-auto flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`max-w-sm rounded-md border px-3 py-2 text-sm shadow-lg transition-opacity ` +
            (t.type === "success"
              ? "bg-green-600 text-white"
              : t.type === "error"
              ? "bg-red-600 text-white"
              : "bg-slate-800 text-slate-100")}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
