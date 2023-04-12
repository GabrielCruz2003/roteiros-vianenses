import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('roteirosvianenses', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});


export default {
  sequelize,
  Sequelize
};
