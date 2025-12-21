"use client";

import * as React from "react";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For now, just log or fake a success
    console.log("Form submitted");
    alert("Message sent (demo)!");
  };

  return (
    <form
      className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-200">
          Name
        </label>
        <input
          type="text"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-200">
          Email
        </label>
        <input
          type="email"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-200">
          Message
        </label>
        <textarea
          rows={4}
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
          placeholder="How can I help?"
        ></textarea>
      </div>
      <button
        type="submit"
        className="inline-flex rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600"
      >
        Send message
      </button>
    </form>
  );
}
