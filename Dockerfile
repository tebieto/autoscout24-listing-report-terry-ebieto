# Stage 1 Build react app
FROM node:14-alpine AS client-builder

WORKDIR /app
COPY ./client/package.json ./client/yarn.lock ./client/
RUN cd client && yarn install

COPY ./client ./client
RUN cd client && yarn run build

# Stage 2: build express app
FROM node:14-alpine AS server-builder

WORKDIR /app
COPY ./server/package.json ./server/yarn.lock ./server/
COPY ./server/tsconfig.json ./server/tsconfig.json ./server/
RUN cd server && yarn install
COPY ./server ./server
RUN cd server && yarn build

# Stage 3: copy just the build artifacts from the previous stages.
FROM node:14-alpine

WORKDIR /app
COPY --from=client-builder /app/client/build ./client/build
COPY --from=server-builder /app/server/build ./server/build
RUN mkdir -p /app/server/build/uploads/csv
EXPOSE 5000

CMD [ "node", "server/build/index.js" ]
