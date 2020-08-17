FROM node:12.4.0-alpine as build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

ARG REACT_APP_API
ENV REACT_APP_API=${REACT_APP_API}

EXPOSE 3000

CMD ["npm", "run", "start"]
