# WonderfulSite

WonderfulSite is a static gallery of personal websites shared in replies to two public posts by [@zarazhangrui](https://x.com/zarazhangrui). The site lists the 789 domains in [`data/sites.json`](data/sites.json).

- `/` — gallery, counts, and a filter for the two source threads
- `/s/[domain]/` — domain, visit link, excerpt, reply author, source conversation, and likes
- `/about/` — source of the list, unofficial status, and removal requests

## Previews

Cards and domain pages show a screenshot of the live URL. The first match wins:

1. A file at `public/previews/{domain}.webp`, when one is checked in.
2. A tall WordPress mshots capture (`https://s0.wp.com/mshots/v1/{url}?w=640&h=960`).
3. If that request errors, or the image is the small mshots placeholder, one mshots retry and then a still thum.io capture (`https://image.thum.io/get/width/640/crop/960/noanimate/{url}`).
4. The letter mark, when every source fails.

Checked-in WebP files are for domains where mshots only returns its default placeholder. No API key is required. The homepage has 789 cards. Screenshots use `loading="lazy"` and `content-visibility` so off-screen cards do not request images up front. The preview frame pans the tall image slowly, and speeds up on hover. Motion is turned off when the visitor prefers reduced motion.

## Requirements

- Node.js 22.23.4 or newer (see `.node-version`)
- pnpm 10 (see the `packageManager` field)

```bash
pnpm install
pnpm run dev
pnpm run build
```

`pnpm run build` checks `data/sites.json`, then writes the static site to `dist/`.

## Cloudflare Pages

Connect this repository and publish the static build. No Wrangler command and no Worker adapter are required.

| Setting | Value |
| --- | --- |
| Package manager | pnpm |
| Build command | `pnpm run build` |
| Destination directory | `dist` |
| Root directory | `/` |
| Node.js version | `22` (`NODE_VERSION=22`) |

`pnpm-lock.yaml` selects pnpm for the install step. The Pages build command is `pnpm run build`. The publish directory is `dist`.
