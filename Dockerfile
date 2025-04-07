# مرحله build
FROM node:18 AS build-stage
WORKDIR /app

# حذف فایل‌های اضافی و نصب پکیج‌ها
COPY package*.json ./
RUN rm -rf node_modules package-lock.json
RUN npm install

# کپی بقیه سورس‌کد و build اپ
COPY . .
RUN npm run build

# مرحله production
FROM nginx:alpine

# کپی فایل‌های build شده به nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# کپی فایل کانفیگ nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# باز کردن پورت
EXPOSE 80

# اجرای nginx
CMD ["nginx", "-g", "daemon off;"]

# FROM node:18  AS build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN rm -rf node_modules package-lock.json
# #RUN npm cache clean --force

# RUN npm install  
# COPY . .
# RUN npm run build

# # Production stage
# FROM nginx:alpine
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]