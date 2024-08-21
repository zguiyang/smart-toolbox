export default () => ({
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/lazy-admin',
    user: process.env.MONGODB_USER || '',
    password: process.env.MONGODB_PASSWORD || '',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY || 'lazy-admin-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
});
