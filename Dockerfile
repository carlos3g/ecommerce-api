# Dockerfile best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# Dockerized NodeJS best practices
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# https://www.bretfisher.com/node-docker-good-defaults/
# http://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

FROM node:16-alpine AS development

USER node
WORKDIR /home/node

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock .

RUN yarn install

COPY --chown=node:node . .

RUN yarn prisma generate

RUN yarn run build

# ---

FROM node:16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

USER node
WORKDIR /home/node

COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock .

RUN yarn install --production=true

COPY --chown=node:node . .

RUN yarn prisma generate

COPY --from=development --chown=node:node /home/node/package*.json ./
COPY --from=development --chown=node:node /home/node/yarn.lock ./
COPY --from=development --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=development --chown=node:node /home/node/dist ./dist

CMD ["node", "dist/main"]
