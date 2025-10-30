FROM oven/bun:latest

WORKDIR /src

COPY package.json .
COPY bun.lock .

RUN bun install

COPY . .

RUN bun src/index.ts