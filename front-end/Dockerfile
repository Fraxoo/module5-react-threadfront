FROM node AS build
WORKDIR /app
COPY . /app
RUN npm install && npm run build

FROM httpd:2.4
COPY --from=build /app/dist /usr/local/apache2/htdocs/
