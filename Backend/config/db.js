import Sequelize from "sequelize";


const db = new Sequelize('roteiros-vianenses', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

// Chamar o método associate() para estabelecer as associações
Object.values(db.models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(db.models));


export default db;
