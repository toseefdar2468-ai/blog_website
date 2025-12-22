"use client";

import * as React from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      if (!serviceId || !templateId || !publicKey) {
        setStatus("Email service not configured. See .env.local.example.");
        return;
      }

      const templateParams = { from_name: name, from_email: email, message } as Record<string, string>;

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus("Message sent.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-200">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
          placeholder="Your name"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-200">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
          placeholder="you@example.com"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-200">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
          placeholder="How can I help?"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send message"}
      </button>
      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
}
