const dotenv = require('dotenv');

const loadEnv = () => {
  dotenv.config();
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    throw new Error('Environment variables missing');
  }
};

module.exports = loadEnv;
