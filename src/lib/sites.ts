import sitesJson from "../../data/sites.json";

export interface Site {
  domain: string;
  url: string;
  author: string;
  tweet_id: string;
  source_conversation_id: string;
  likes: number;
  excerpt: string;
}

export const THREADS = {
  "2113148949842534482": {
    id: "2113148949842534482",
    key: "resume",
    label: "Resume",
    title: "Your personal website is the new resume",
    href: "https://x.com/zarazhangrui/status/2113148949842534482",
  },
  "2108047745936466373": {
    id: "2108047745936466373",
    key: "coolest",
    label: "Coolest",
    title: "Who has the coolest personal website?",
    href: "https://x.com/zarazhangrui/status/2108047745936466373",
  },
} as const;

export type ThreadId = keyof typeof THREADS;
export type ThreadKey = (typeof THREADS)[ThreadId]["key"];
export type ThreadInfo = (typeof THREADS)[ThreadId];

function isSite(value: unknown): value is Site {
  if (!value || typeof value !== "object") return false;
  const site = value as Record<string, unknown>;
  return (
    typeof site.domain === "string" &&
    typeof site.url === "string" &&
    typeof site.author === "string" &&
    typeof site.tweet_id === "string" &&
    typeof site.source_conversation_id === "string" &&
    typeof site.likes === "number" &&
    typeof site.excerpt === "string"
  );
}

const parsed = sitesJson.filter(isSite);
if (parsed.length !== 789 || parsed.length !== sitesJson.length) {
  throw new Error(`Expected 789 sites, found ${parsed.length}`);
}

export const sites: Site[] = parsed;

const byDomain = new Map(sites.map((site) => [site.domain, site]));

export function getSite(domain: string): Site | undefined {
  return byDomain.get(domain);
}

export function threadFor(site: Site): ThreadInfo {
  const thread = THREADS[site.source_conversation_id as ThreadId];
  if (!thread) {
    throw new Error(`Unknown conversation for ${site.domain}`);
  }
  return thread;
}

export function authorHandle(author: string): string {
  return author.replace(/^@/, "");
}

export function authorHref(author: string): string {
  return `https://x.com/${authorHandle(author)}`;
}

export function replyHref(site: Site): string {
  return `https://x.com/${authorHandle(site.author)}/status/${site.tweet_id}`;
}

export function formatLikes(likes: number): string {
  const formatted = likes.toLocaleString("en-US");
  return likes === 1 ? "1 like" : `${formatted} likes`;
}

export function initialFor(domain: string): string {
  return domain.charAt(0).toUpperCase();
}

export const counts = {
  total: sites.length,
  resume: sites.filter((site) => threadFor(site).key === "resume").length,
  coolest: sites.filter((site) => threadFor(site).key === "coolest").length,
  withoutExcerpt: sites.filter((site) => site.excerpt.length === 0).length,
};
