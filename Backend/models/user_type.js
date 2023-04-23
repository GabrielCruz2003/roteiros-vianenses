import { Sequelize } from "sequelize";
import db from "../config/db.js";

const UserTypeModel = db.define('user_types', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default UserTypeModel;