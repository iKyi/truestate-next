#Dependecy installer
FROM node:14-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

#App builder
FROM node:14-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Bundle app source
FROM node:14-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app .

ENV PORT 3000

CMD ["npm","start" ]