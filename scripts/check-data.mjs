import { readFileSync } from "node:fs";

const REQUIRED = [
  "domain",
  "url",
  "author",
  "tweet_id",
  "source_conversation_id",
  "likes",
  "excerpt",
];
const THREADS = new Set(["2113148949842534482", "2108047745936466373"]);

const sites = JSON.parse(readFileSync(new URL("../data/sites.json", import.meta.url), "utf8"));

if (!Array.isArray(sites)) {
  throw new Error("data/sites.json must be an array");
}
if (sites.length !== 789) {
  throw new Error(`Expected 789 sites, found ${sites.length}`);
}

const domains = new Set();
for (const site of sites) {
  for (const key of REQUIRED) {
    if (!(key in site)) {
      throw new Error(`Missing ${key} on an entry`);
    }
  }
  if (!/^[a-z0-9.-]+$/.test(site.domain)) {
    throw new Error(`Unexpected domain: ${site.domain}`);
  }
  if (domains.has(site.domain)) {
    throw new Error(`Duplicate domain: ${site.domain}`);
  }
  domains.add(site.domain);
  if (!/^https:\/\//.test(site.url)) {
    throw new Error(`URL must be https: ${site.url}`);
  }
  if (!/^@[A-Za-z0-9_]+$/.test(site.author)) {
    throw new Error(`Unexpected author: ${site.author}`);
  }
  if (!/^[0-9]+$/.test(site.tweet_id) || !THREADS.has(site.source_conversation_id)) {
    throw new Error(`Unexpected source ids for ${site.domain}`);
  }
  if (typeof site.likes !== "number" || !Number.isInteger(site.likes) || site.likes < 0) {
    throw new Error(`Unexpected likes for ${site.domain}`);
  }
  if (typeof site.excerpt !== "string") {
    throw new Error(`Excerpt must be a string for ${site.domain}`);
  }
}

const resume = sites.filter((site) => site.source_conversation_id === "2113148949842534482").length;
const coolest = sites.filter((site) => site.source_conversation_id === "2108047745936466373").length;
if (resume !== 532 || coolest !== 257) {
  throw new Error(`Unexpected thread counts: resume ${resume}, coolest ${coolest}`);
}
