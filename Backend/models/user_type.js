import { Sequelize } from "sequelize";
import db from "../config/db";
import UserModel from "./users.js";

const UserTypeModel = db.define('user_type', {
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

UserTypeModel.hasMany(UserModel, { foreignKey: 'user_type_id' });

export default UserTypeModel;


