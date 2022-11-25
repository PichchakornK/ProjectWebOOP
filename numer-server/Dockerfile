FROM node:14-slim

# Setting Working Directory
WORKDIR /numerapp/src/app

# Copying only package.json
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy rest of the code to container
COPY . .

EXPOSE 1337

# Run the API on Nodemon
CMD ["npm", "run", "dev"]