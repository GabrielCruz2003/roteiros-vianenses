import { Sequelize } from "sequelize";
import db from "../config/db.js";
import roteiroModel from "./roteiro.js";


const roteiroTypeModel = db.define("roteiro_type", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
});


export default roteiroTypeModel;