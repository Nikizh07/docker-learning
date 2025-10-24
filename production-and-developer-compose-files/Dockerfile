FROM node:22-slim

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json package-lock.json* ./

# Install only production dependencies when NODE_ENV is production
RUN if [ "$NODE_ENV" = "production" ]; then \
        npm ci --only=production; \
    else \
        npm ci; \
    fi

COPY . .

CMD ["npm", "start"]