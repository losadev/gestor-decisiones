FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Se ejecuta al construir la imagen
# Se usa --legacy-peer-deps para evitar problemas de dependencias
RUN npm install --legacy-peer-deps 

COPY . .

EXPOSE 5173

# Se ejecuta al iniciar el contenedor
CMD ["npm", "run", "dev"]
