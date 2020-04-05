FROM node:lts-alpine as build

WORKDIR /app
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:lts-alpine

WORKDIR /app
COPY public public
COPY --from=build /app/package.json package.json
COPY --from=build /app/yarn.lock yarn.lock
COPY --from=build /app/.next .next

RUN yarn install --production --frozen-lockfile

EXPOSE 3000
CMD ["yarn", "start:next"]
