import { Sequelize } from 'sequelize';
import db from '../config/db.js';



const likesModel = db.define('likes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },


});




export default likesModel;