import { Sequelize } from "sequelize";
import db from "../config/db.js";


const roteiroModel = db.define('roteiro', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

export default roteiroModel;