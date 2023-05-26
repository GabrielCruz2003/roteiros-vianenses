import { Sequelize } from "sequelize";
import db from "../config/db.js";
import roteiroModel from "./roteiro.js";
import { storage } from "../config/multerconfig.js";

const imagensModel = db.define("imagens", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: Sequelize.STRING(200),
        allowNull: false,
    },
});




export default imagensModel;


