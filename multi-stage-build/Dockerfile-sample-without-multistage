# Use official Go image
FROM golang:1.25-alpine

# Set working directory
WORKDIR /app

# Install git (needed if your Go modules use remote dependencies)
RUN apk add --no-cache git

# Copy module files first for caching (optional but faster rebuilds)
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of your source code
COPY . .

# Run your Go program
CMD ["go", "run", "test.go"]
