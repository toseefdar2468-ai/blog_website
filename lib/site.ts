const FALLBACK_SITE_URL = "https://osama-portfolio-jarh.vercel.app";

export function getSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  const baseUrl = envUrl && envUrl.length > 0 ? envUrl : FALLBACK_SITE_URL;
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}
