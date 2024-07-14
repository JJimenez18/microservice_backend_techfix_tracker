FROM node:12.18.3-alpine as buildnode
LABEL stage="builder_inventarios"
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN echo "Termina construccion de proyecto"

FROM node:12.18.3-alpine
WORKDIR /app
RUN apk --no-cache add curl
COPY package*.json ./
ENV TZ America/Mexico_City
COPY --from=buildnode /app/build build
RUN npm ci --only=production && npm cache clean --force
CMD ["node", "build/index.js"]
