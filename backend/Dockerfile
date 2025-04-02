FROM node:20.12.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm run build

RUN npm run prisma:generate


FROM node:20.12.0-alpine


COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma


EXPOSE 4000

CMD ["npm", "run", "start:migrate:prod"]
