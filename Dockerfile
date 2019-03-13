FROM node:alpine AS AdminPanel

WORKDIR /app
COPY . /app 
RUN npm install



