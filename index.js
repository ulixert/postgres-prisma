const { Sequelize, QueryTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const main = async () => {
  try {
    await sequelize.authenticate();
    const notes = await sequelize.query('SELECT * FROM notes', {
      type: QueryTypes.SELECT,
    });
    console.log(notes);
    void sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

void main();
