FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npx", "nodemon", "--watch", ".", "--ext", "ts", "--exec", "npx ts-node src/index.ts"]
