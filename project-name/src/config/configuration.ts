export default () => ({
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 3000,
    name: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER || 'postgres',
  },
});
