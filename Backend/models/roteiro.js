import { Sequelize } from "sequelize";
import db from "../config/db.js";
import roteiroTypeModel from "./roteiro_type.js";
import likesModel from "./likes.js";
import comentariosModel from "./comentarios.js";



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
    data: {
        type: Sequelize.DATE,
        allowNull: true
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: false
    },
    

});

// Relacionamentos
roteiroModel.belongsTo(roteiroTypeModel, { foreignKey: 'roteiro_type_id' });
likesModel.belongsTo(roteiroModel, { foreignKey: 'roteiro_id' });
comentariosModel.belongsTo(roteiroModel, { foreignKey: 'roteiro_id' });

export default roteiroModel;
