import Router from "express";
import { createTypeUser, createUser, login } from "../controllers/users.js";
import multer from "multer";



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define o destino do upload para a pasta 'uploads'
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Define o nome do arquivo com data e hora para evitar colisões de nomes
    }
});

const upload = multer({ storage: storage });


const userRoutes = Router();

userRoutes.post("/create", createUser);

userRoutes.post("/createTypeUser", createTypeUser);

userRoutes.post("/login", login);



export default userRoutes;