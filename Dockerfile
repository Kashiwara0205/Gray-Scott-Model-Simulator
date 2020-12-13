FROM node:12.0.0-alpine

WORKDIR /gray-scott-model-simulator

RUN apk update && \
    npm install -g npm && \
    npm install -g @vue/cli

CMD ["/bin/ash"]