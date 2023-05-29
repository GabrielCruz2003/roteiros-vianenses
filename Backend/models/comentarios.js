import { Sequelize } from "sequelize";
import db from "../config/db.js";

const comentariosModel = db.define('comentarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comentario: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

export default comentariosModel;
