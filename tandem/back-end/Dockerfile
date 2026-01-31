FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

FROM base AS development
COPY . .
CMD ["npm", "run", "start:dev"]

FROM base AS build
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:22-alpine AS production
WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist/prisma.config.js ./prisma.config.js

EXPOSE 3000

CMD ["npm", "run", "start:prod"]