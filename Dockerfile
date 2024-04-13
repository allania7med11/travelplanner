FROM node:14-alpine
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN mkdir  /client
WORKDIR /client
COPY package.json package-lock.json /client/
RUN npm install
COPY . /client
# build necessary, even if no static files are needed,
# since it builds the server as well

# expose 5000 on container
EXPOSE 3000
# start the app
ENTRYPOINT ["sh", "./run.sh"]
