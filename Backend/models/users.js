import { Sequelize } from "sequelize";
import db from "../config/db.js";
import UserTypeModel from "./user_type.js";
import likesModel from "./likes.js";
import comentariosModel from "./comentarios.js";

const UserModel = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        defaultValue: 'default.png',

    },
    user_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'user_types',
            key: 'id'
        }
    }
});

UserModel.belongsTo(UserTypeModel, { foreignKey: 'user_type_id' });
likesModel.belongsTo(UserModel, { foreignKey: 'user_id' });
comentariosModel.belongsTo(UserModel, { foreignKey: 'user_id' });

export default UserModel;