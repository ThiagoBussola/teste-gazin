FROM node:16.9.0-slim
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./" ]
RUN npm install
COPY . .
CMD ["npm", "start"]