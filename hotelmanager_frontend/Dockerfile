FROM node:18.13 as build-stage

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

FROM nginx:latest
COPY --from=build-stage /app/dist/hotelmanager-fe /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80