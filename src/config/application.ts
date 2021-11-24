export default {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'dev',
  dbUri: process.env.MONGO_URI || 'mongodb://localhost:27017/dev',
};
