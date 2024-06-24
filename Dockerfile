# Etapa de producción - Primera etapa: Instalación de dependencias
FROM --platform=$BUILDPLATFORM node:22.3.0-alpine3.20 AS build-deps
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile && npm cache clean --force

# Etapa de producción - Segunda etapa: Construcción del proyecto
FROM build-deps AS builder
COPY --from=build-deps package*.json ./
COPY src ./src
COPY tsconfig.json ./
RUN npm run build

# Etapa de producción - Tercera etapa: Preparación del entorno de ejecución
FROM --platform=$BUILDPLATFORM node:22.3.0-alpine3.20 AS production
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
RUN npm install --omit=dev --frozen-lockfile && npm cache clean --force

# Crear un usuario sin privilegios para ejecutar la aplicación
RUN addgroup -S crucegroup && adduser --disabled-password -S cruceuser -G crucegroup
RUN chown -R cruceuser:crucegroup /app
USER cruceuser

CMD ["node", "build/index.js"]