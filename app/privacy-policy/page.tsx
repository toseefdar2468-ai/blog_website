// app/privacy-policy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read how DevCraft Blog handles data, cookies, analytics, and third-party advertising.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto space-y-4 text-sm text-slate-300">
      <h1 className="text-2xl font-bold text-slate-50">Privacy Policy</h1>
      <p>
        This Privacy Policy describes how this website (&quot;DevCraft
        Blog&quot;, &quot;we&quot;, &quot;us&quot;) collects, uses, and
        protects information when you visit and interact with this site.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-slate-50">
        Information We Collect
      </h2>
      <p>
        This site may collect non-personal information such as browser type,
        device information, IP address, and pages visited. This data is
        typically aggregated and used for analytics and performance
        optimization.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-slate-50">Cookies</h2>
      <p>
        Cookies are small text files stored on your device. They may be used to
        remember preferences, understand how visitors use the site, and
        personalize content or ads. You can disable cookies in your browser
        settings, but some site features may not function correctly.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-slate-50">
        Analytics and Advertising
      </h2>
      <p>
        This site may use third-party analytics services (such as Google
        Analytics) to understand traffic and usage patterns. We also display
        third-party advertising (Google AdSense). These providers may use
        cookies or similar technologies to serve ads based on your visits to
        this and other websites.
      </p>
      <p>
        Google uses cookies to serve ads on this site. You can opt out of
        personalized advertising by visiting https://adssettings.google.com or
        www.aboutads.info. If you are located in the EEA, UK, or Switzerland,
        you will be asked to consent to personalized ads where required.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-slate-50">
        Third-Party Links
      </h2>
      <p>
        Articles may contain links to external websites. We are not responsible
        for the content or privacy practices of those sites. We recommend
        reviewing their privacy policies separately.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-slate-50">
        Changes to This Policy
      </h2>
      <p>
        This Privacy Policy may be updated periodically. Changes will be
        reflected on this page with an updated &quot;Last updated&quot; date.
      </p>

      <h2 className="mt-4 text-lg font-semibold text-slate-50">Contact</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        via the contact page.
      </p>

      <p className="mt-4 text-xs text-slate-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
