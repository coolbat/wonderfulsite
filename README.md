# WonderfulSite

WonderfulSite is a static gallery of personal websites shared in replies to two public posts by [@zarazhangrui](https://x.com/zarazhangrui). The site lists the 789 domains in [`data/sites.json`](data/sites.json).

- `/` — gallery, counts, and a filter for the two source threads
- `/s/[domain]/` — domain, visit link, excerpt, reply author, source conversation, and likes
- `/about/` — source of the list, unofficial status, and removal requests

Screenshots are not included. Each card uses a letter in place of a thumbnail.

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
