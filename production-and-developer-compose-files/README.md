
# Example Express App — Docker + Compose (dev & prod)

This small example demonstrates a minimal Express application packaged with a Dockerfile and two Docker Compose profiles: one for development and one for production. Use the files in this folder to run the app locally, in a container, or with compose for development and production workflows.

## What this folder contains

- `index.js` - Minimal Express server exposing:
  - `GET /` -> hello string
  - `GET /health` -> `{ status: 'ok' }` JSON
- `package.json` - scripts and dependencies
- `Dockerfile` - image build definition
- `compose.dev.yml` - development compose file (hot-reload / dev tools)
- `compose.prod.yml` - production compose file
- `docker-compose.yml` - a simple compose example

## Prerequisites

- Node.js 18+ (if running locally) or Docker 22+
- npm (for local install)

## Quick start — run locally

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm start
```

3. Endpoints:

- http://localhost:3000/  — hello string
- http://localhost:3000/health  — JSON health check

You can set the server port with the `PORT` environment variable:

```bash
PORT=4000 npm start
```

## Development mode (hot reload)

If the project includes a dev script (for example `npm run dev` using `nodemon`), use:

```bash
npm run dev
```

This is useful when working locally and iterating on the server.

## Build and run with Docker

Build the Docker image and run it (production mode):

```bash
docker build -t example-app .
docker run -p 3000:3000 -e NODE_ENV=production example-app
```

The container will listen on port `3000` by default.

## Docker Compose

Use Compose to start the app with the development or production configs included in this folder.

- Development (builds and runs dev config, typically runs `npm run dev`):

```bash
docker compose -f production-and-developer-compose-files/compose.dev.yml up --build
```

- Production (builds and runs the production service, typically runs `npm start`):

```bash
docker compose -f production-and-developer-compose-files/compose.prod.yml up --build
```

There is also a simple `docker-compose.yml` included as an example; inspect it to see a minimal setup.

## Environment variables

- `PORT` — server port (defaults to 3000 in the app if not set)
- `NODE_ENV` — `development` or `production` (used by Dockerfile and run scripts)

Set env vars inline or with a `.env` file (if compose files reference it).

## Files of interest

- `index.js` — express app and endpoints
- `package.json` — scripts and dependency definitions
- `Dockerfile` — image build rules
- `compose.dev.yml` — development compose configuration
- `compose.prod.yml` — production compose configuration
- `docker-compose.yml` — alternate/simple compose example

## Notes & tips

- The `Dockerfile` may install only production dependencies when `NODE_ENV=production` to keep images small.
- Use the dev compose file to mount source code into the container and enable auto-reload.
- If you change ports or commands, update the compose files and `Dockerfile` accordingly.

## Contributing

Small improvements or documentation fixes are welcome. Open a PR with a clear description of the change.

## License

This example is provided as-is. Add a license file if you intend to reuse or publish it.
