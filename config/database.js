module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'ec2-44-2w09-24-62.compute-1.amazonaws.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'd2gmp8wf04qmcb'),
      user: env('DATABASE_USERNAME', 'hevzbswlsjgtoms'),
      password: env('DATABASE_PASSWORD', '0caweeeef68a1cfd333202a7fcf0ed9a9d604ad3b11a9b18e1d1eefc64866305dbfbb'),
      ssl: env.bool('DATABASE_SSL', false),
      ssl: {
        rejectUnauthorized: false
      }
    },
    acquireConnectionTimeout: 1000000,
pool: {
min: 0,
max: 150,
acquireTimeoutMillis: 300000,
createTimeoutMillis: 300000,
destroyTimeoutMillis: 300000,
idleTimeoutMillis: 30000,
reapIntervalMillis:1000,
createRetryIntervalMillis: 2000
},
debug: false,
    options: {
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});