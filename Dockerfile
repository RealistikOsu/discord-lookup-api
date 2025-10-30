FROM oven/bun:latest

WORKDIR /src

COPY package.json .
COPY bun.lock .

RUN bun install

COPY . .

CMD bun src/index.ts