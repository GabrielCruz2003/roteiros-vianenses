import Router from "express";
import { createTypeUser, createUser, login, getUsers, getUserById, updateUser } from "../controllers/users.js";
import multer from "multer";



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/img-users'); // Define o destino do upload para a pasta 'uploads'
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname;
        cb(null, originalName); // Define o nome do arquivo para o nome original
    }
});

const upload = multer({ storage: storage });


const userRoutes = Router();

userRoutes.post("/createUser",  upload.single('image'), createUser);

userRoutes.post("/createTypeUser", createTypeUser);

userRoutes.get("/getUsers", getUsers);

userRoutes.get("/getUserById/:id", getUserById);

userRoutes.put("/updateUser/:user_id", upload.single('image'), updateUser);

userRoutes.post("/login", login);



export default userRoutes;