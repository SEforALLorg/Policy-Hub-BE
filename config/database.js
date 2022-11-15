module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'vkh'),
      user: env('DATABASE_USERNAME', 'vkh'),
      password: env('DATABASE_PASSWORD', 'Admin@123'),
      ssl: env.bool('DATABASE_SSL', false),
      ssl: {
        rejectUnauthorized: false
      }
    },
    options: {
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
