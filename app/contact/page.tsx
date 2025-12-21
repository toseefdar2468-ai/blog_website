import type { Metadata } from "next";
import ContactForm from "./contactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for questions, feedback, collaborations, or sponsorship opportunities.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-50">Contact</h1>
        <p className="text-sm text-slate-300">
          Have a question, suggestion, or collaboration idea? Feel free to
          reach out. I read every message and try to respond where possible.
        </p>
      </div>

      {/* 👇 This is now a Client Component */}
      <ContactForm />

      <div className="space-y-1 text-sm text-slate-300">
        <p>
          You can also reach me directly via email:
          <span className="ml-1 font-medium text-indigo-300">
            your-email@example.com
          </span>
        </p>
      </div>
    </div>
  );
}
