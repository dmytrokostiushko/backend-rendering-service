FROM node:21.6-alpine3.18 as builder

ARG build_dir=/app/pdf-generator

RUN mkdir -p $build_dir

COPY . $build_dir

WORKDIR $build_dir

RUN npm install

RUN npm run build


FROM  ghcr.io/puppeteer/puppeteer:21.7.0

VOLUME /tmp
USER root

ARG run_dir=/app/pdf-generator

COPY . $run_dir

WORKDIR $run_dir

COPY --from=builder /app/pdf-generator .

ENV APP_ROOT_DIR=/app/pdf-generator
ENV NODE_ENV=production

RUN npx puppeteer browsers install chrome

ENTRYPOINT ["npm", "run", "start"]
