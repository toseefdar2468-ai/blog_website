export function getSiteUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  const vercelUrl = process.env.VERCEL_URL;

  let baseUrl = "";
  if (envUrl && envUrl.length > 0) {
    baseUrl = envUrl;
  } else if (vercelUrl && vercelUrl.length > 0) {
    baseUrl = `https://${vercelUrl}`;
  } else {
    baseUrl = "http://localhost:3000";
  }

  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}
