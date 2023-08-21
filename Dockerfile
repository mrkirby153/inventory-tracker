FROM node:18-alpine AS base

FROM base as deps
run apk add --no-cache libc6-compat

WORKDIR /app

COPY --link package.json package-lock.json ./

RUN npm ci

FROM base as builder
WORKDIR /app

COPY --from=deps --link /app/node_modules ./node_modules
COPY --link . .

RUN npm run prisma-generate && npm run build

FROM base as runner

WORKDIR /app

ENV NODE_ENV production
ENV DATABASE_URL ""

RUN addgroup --system --gid 1001 nodejs; adduser --system --uid 1001 nextjs

COPY --from=builder --link /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --link --chown=1001:1001 /app/.next/standalone ./
COPY --from=builder --link --chown=1001:1001 /app/.next/static ./.next/static

COPY ./startup.sh ./
COPY prisma/ ./prisma/
RUN npm install -g prisma
RUN chmod +x ./startup.sh

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME localhost

CMD ["./startup.sh"]