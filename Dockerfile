FROM node:18  AS build-stage
WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules package-lock.json
#RUN npm cache clean --force

RUN npm install  
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]