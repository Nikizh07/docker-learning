FROM node:18-alpine AS build 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM gcr.io/distroless/nodejs18 AS runtime

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

COPY package*.json ./

CMD ["node", "dist/server.js"]