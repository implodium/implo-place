FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:mainline-alpine

EXPOSE 80

COPY --from=build /app/dist/web /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
