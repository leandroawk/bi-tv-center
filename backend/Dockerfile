FROM node:20-alpine AS builder

WORKDIR /app

# Inicialmente copiaremos apenas o package.json (quando existir)
# COPY package*.json ./
# RUN npm install

# Copia o resto dos arquivos
# COPY . .

# RUN npm run build

FROM node:20-alpine

WORKDIR /app
# COPY --from=builder /app ./

EXPOSE 3000

# Comando temporário até o projeto ser inicializado
CMD ["echo", "Backend não inicializado"]
