FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:mainline-alpine

COPY --from=build /app/dist/leo-iot-web-mobile /usr/share/nginx/html
