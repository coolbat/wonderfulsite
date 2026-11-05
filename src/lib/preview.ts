import { existsSync } from "node:fs";
import { join } from "node:path";

const PREVIEWS_DIR = join(process.cwd(), "public", "previews");

/**
 * WordPress mshots, no API key. `h=960` asks for a tall capture so the card
 * can pan through the page instead of a single short stamp.
 * @see https://s0.wp.com/mshots/v1/
 */
const MSHOTS_WIDTH = 640;
const MSHOTS_HEIGHT = 960;

/**
 * File name for an optional local screenshot at public/previews/{name}.
 * Domains in data/sites.json are already lowercase hostname characters.
 */
export function previewFileName(domain: string): string | undefined {
  const safe = domain.toLowerCase().replace(/[^a-z0-9.-]/g, "");
  if (!safe || safe.includes("..") || safe.startsWith(".")) return undefined;
  return `${safe}.webp`;
}

/** Remote screenshot URL for a page. */
export function remotePreviewUrl(url: string): string {
  const shot = encodeURIComponent(url);
  return `https://s0.wp.com/mshots/v1/${shot}?w=${MSHOTS_WIDTH}&h=${MSHOTS_HEIGHT}`;
}

/**
 * Screenshot for a site card or detail page.
 * A file at public/previews/{domain}.webp wins over the remote shot so a
 * later batch can drop images in without changing call sites.
 */
export function previewUrl(url: string, domain?: string): string {
  if (domain) {
    const name = previewFileName(domain);
    if (name && existsSync(join(PREVIEWS_DIR, name))) {
      return `/previews/${name}`;
    }
  }
  return remotePreviewUrl(url);
}

/**
 * Seconds of negative delay so neighboring cards are slightly out of phase.
 * Kept small so each preview still opens near the top of the page.
 */
export function previewPanOffset(domain: string): number {
  let hash = 0;
  for (let index = 0; index < domain.length; index += 1) {
    hash = (hash + domain.charCodeAt(index) * (index + 1)) % 5;
  }
  return hash;
}
