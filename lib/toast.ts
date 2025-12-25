export type ToastType = "info" | "success" | "error";

export function toast(message: string, type: ToastType = "info") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("devblog:toast", { detail: { message, type } }));
}

export default toast;
