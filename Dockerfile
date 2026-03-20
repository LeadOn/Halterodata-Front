FROM node:25-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Copier le code et builder l'application Nuxt
COPY . .
RUN npm run build

# Nuxt génère un serveur Node dans le dossier .output
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]