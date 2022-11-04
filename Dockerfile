FROM node as builder

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

FROM nginx

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .

COPY nginx.conf /etc/nginx/conf.d/default.conf