### STAGE 1: Build ###
FROM node:21.7.1-alpine3.18@sha256:88a2a0bf05ec222e3b42ba6609c880a3acfa4e98693632aee13686a6b6595c2c as builder

ARG API_PROD_URL
ENV API_PROD_URL=${API_PROD_URL}

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


### STAGE 2: Run ###
FROM nginx:1.25.2-alpine3.18@sha256:34b58b4f5c6d133d97298cbaae140283dc325ff1aeffb28176f63078baeffd14
COPY --from=builder /app/dist /var/www/default
COPY ./deployment/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80