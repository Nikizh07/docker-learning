# Docker Learning

This repository is my personal playground for learning Docker. I’m collecting small, focused examples organized folder‑wise. Each folder contains its own README with quick start commands and notes.

## Prerequisites

- Docker 22+ (includes Docker Compose v2)
- Optional: Node.js 18+ and npm (only if you run examples locally without containers)

## Folder-wise index

- `production-and-developer-compose-files/` — Example Express app with:
  - A minimal API (`/` and `/health`)
  - A `Dockerfile` for building the image
  - Two Compose configs: development (hot reload) and production
  - Start here if you want to see a clean dev vs prod Compose workflow
  - Read more: `production-and-developer-compose-files/README.md`

## How to use

- Pick a folder and read its README for exact commands.
- Typical flow for Docker/Compose examples:
  1) Change into the example folder
  2) Build and run with Compose (dev or prod profile)

Example for the Express app:

```bash
cd production-and-developer-compose-files
# Development (hot reload)
docke compose -f compose.dev.yml up --build
# Production (optimized run)
docker compose -f compose.prod.yml up --build
```

## Conventions

- Each example is self-contained and documented in its own folder.
- Compose files prefer explicit flags (`-f`) to keep commands clear.
- Defaults aim for local development ergonomics (e.g., port 3000 where applicable).

## Roadmap

- Add more folders covering: multi-service stacks, volumes, networks, healthchecks, Dockerfiles best practices, and CI pipelines for images.

## Notes

If you see a gap or a place where more explanation would help, feel free to open an issue or a PR.