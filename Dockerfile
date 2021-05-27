# Stage 1 (named "builder"): Production React Build
FROM node:14-alpine AS builder

WORKDIR /app
COPY ./client/package.json ./client/yarn.lock ./client/
RUN cd client && yarn install

COPY ./client ./client
RUN cd client && yarn run build

# Stage 2: Start fresh, install a static server,
# and copy just the build artifacts from the previous stage.
FROM node:14-alpine

WORKDIR /app
COPY ./server/package.json ./server/yarn.lock ./server/
COPY ./server/tsconfig.json ./server/tsconfig.json ./server/
RUN cd server && yarn install
COPY ./server ./server
RUN cd server && yarn build
COPY --from=builder /app/client/build ./client/build
RUN mkdir -p /app/server/build/uploads/csv
EXPOSE 5000

CMD [ "node", "server/build/index.js" ]
