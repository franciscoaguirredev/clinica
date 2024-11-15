export const EnvConfig = () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT), 
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_DATABASE,
})