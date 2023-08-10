import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_USER_PASS,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;