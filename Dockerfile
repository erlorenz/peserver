FROM node:lts-jessie
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --production
COPY ./dist ./dist
COPY .env .
CMD ["/bin/bash"]
EXPOSE 3001