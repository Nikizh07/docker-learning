#building stage

FROM golang:1.25-alpine AS build

WORKDIR /app

RUN apk add --no-cache git

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o app main.go

# running stage


FROM alpine:latest

WORKDIR /app

COPY --from=build /app/app .

CMD ["./app"]