# Go API — Multi‑stage Docker Build

Small Gin app showing how a multi‑stage Docker build produces a much smaller image than a single‑stage build.

Files:
- [multi-stage-build/Dockerfile](Dockerfile) — multi‑stage build
- [multi-stage-build/main.go](main.go) — Gin server on port 8080
- [multi-stage-build/Dockerfil-sample-without-multistage](Dockerfil-sample-without-multistage) — naive single‑stage example (for size comparison)

## Quick start (multi‑stage)

```bash
# From repo root (or cd multi-stage-build)
cd multi-stage-build

# Build the optimized multi-stage image
docker build -t goapi:latest -f Dockerfile .

# Run the container
docker run --rm -p 8080:8080 goapi
```

Test endpoints:

```bash
curl -s http://localhost:8080/
curl -s http://localhost:8080/hi
curl -s http://localhost:8080/notes
```

Expected JSON:
- GET / → {"status":"running"}
- GET /hi → {"status":"hi route works"}
- GET /notes → {"notes":[]}

## Image size comparison

Example output after building both images (multi‑stage vs single‑stage):

```text
REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
goapi        latest    0b1d57429be5   3 minutes ago   28.4MB
gapp         latest    fa3e069c710f   2 hours ago     427MB
```

## Reproduce the “large” image (single‑stage)

The provided single‑stage file is illustrative. To build it as-is, first make it run main.go:

```bash
# Fix the sample to run main.go (once)
sed -i 's/test.go/main.go/' Dockerfil-sample-without-multistage

# Build the large single-stage image
docker build -t gapp:latest -f Dockerfil-sample-without-multistage .

# Compare sizes
docker images | grep -E 'goapi|gapp'
```

## Run locally without Docker (optional)

```bash
# Requires Go installed locally
go run main.go
# Server on http://localhost:8080
```

## Clean up

```bash
# Stop and remove containers (if any)
docker ps -aq | xargs -r docker rm -f

# Remove images (optional)
docker rmi goapi gapp 2>/dev/null || true
```
