import db from '../config/db.js';
import  Sequelize  from 'sequelize';
import UserModel from './users.js';
import roteiroModel from './roteiro.js';


const inscricoesModel = db.define('inscricoes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
}); 

inscricoesModel.belongsTo(UserModel, {foreignKey: 'user_id'});
inscricoesModel.belongsTo(roteiroModel, {foreignKey: 'roteiro_id'});


export default inscricoesModel;


