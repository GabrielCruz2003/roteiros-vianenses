import { config } from "dotenv";
import Sequelize from "sequelize";

config();

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
    },
  },
  pool: {
    max: 2,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

// Chamar o método associate() para estabelecer as associações
Object.values(db.models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(db.models));

export default db;
