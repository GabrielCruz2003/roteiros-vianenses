import sequelize from 'sequelize';
import dbInstance from '../config/db.cjs';
import user_type from './user_type.js';

const users = dbInstance.define('users', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    image: {
        type: sequelize.STRING,
        allowNull: true
    },
    user_type_id: {
        type: sequelize.INTEGER,
        references: {
            model: user_type,
            key: 'id',
        },
    }  
    
});

users.belongsTo(user_type, { foreignKey: 'user_type_id' });

// sincronização dos modelos com a base de dados
dbInstance.sync({ force: false, alter: true })
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso.');
  })
  .catch((error) => {
    console.log('Erro ao sincronizar as tabelas:', error);
  });

users.belongTo(user_type, {foreignKey: 'user_type_id'});



export default users;