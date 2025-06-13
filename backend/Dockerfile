FROM node:20-alpine

WORKDIR /app

# Copia package.json y package-lock.json al directorio actual
COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
