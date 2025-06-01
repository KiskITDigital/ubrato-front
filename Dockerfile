FROM node:24.1-alpine AS builder

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY ./index.html ./server.js ./postcss.config.js \
     ./tsconfig.json ./tsconfig.node.json ./typesense-config.json ./typesense.config.ts \
     ./vite.config.ts ./tailwind.config.js ./

RUN npm run build

FROM caddy:2.10-alpine AS runner

COPY --from=builder /app/dist/client /srv/www
COPY ./caddy/Caddyfile /etc/caddy/Caddyfile
