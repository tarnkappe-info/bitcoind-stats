FROM node:18.19.0-bookworm as builder
RUN mkdir -p btc-stats
COPY . btc-stats
WORKDIR /btc-stats
RUN chown -R node:node /btc-stats
RUN npm install
RUN npm run build

FROM nginx:1.25-bookworm as server
COPY --from=builder /btc-stats/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
