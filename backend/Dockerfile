FROM node:18-alpine
WORKDIR /app
COPY package.json ./
COPY db_api_falsa.json ./
RUN npm install
EXPOSE 3000
CMD ["npx", "json-server", "db_api_falsa.json", "--port", "3000", "--host", "0.0.0.0"]
