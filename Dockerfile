FROM node:18-alpine3.15 as builder
WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn --silent
COPY ./ /app
RUN yarn tsc 
RUN yarn vite build
# CMD ["yarn", "build"] # this does not work
RUN ls /app

FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets over
COPY --from=builder /app/dist /usr/share/nginx/html
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]