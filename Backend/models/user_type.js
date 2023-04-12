import sequelize from 'sequelize';
import dbInstance from '../config/db.cjs';

const user_type = dbInstance.define('user_type', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_type: {
        type: sequelize.STRING,
        allowNull: false
    }
}, {
  timestamps: false
});

dbInstance.sync()
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((err) => {
    console.error('An error occurred while synchronizing the models:', err);
  });


export default user_type;
