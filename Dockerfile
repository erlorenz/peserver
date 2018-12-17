FROM node:jessie
WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY ./dist /app
COPY .env /app
ENV PORT 3001
CMD ["/bin/bash"]
EXPOSE 3001