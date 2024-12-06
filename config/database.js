module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'c8fhdp7jp8t0ci.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'd2emc12s80p4dv'),
      user: env('DATABASE_USERNAME', 'uernt11ei5ie3l'),
      password: env('DATABASE_PASSWORD', 'pbb9b352d94c3e126fee1d1e3ad9d401c87dce6e59fee08cc2bf5367d2f54a4c5'),
      ssl: env.bool('DATABASE_SSL', false),
      ssl: {
        rejectUnauthorized: false
      }
    },
    pool: { min: 2, max: 20 },
    asyncStackTraces: true,
    options: {
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
