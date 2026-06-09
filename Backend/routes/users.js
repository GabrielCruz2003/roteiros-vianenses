import Router from "express";
import { createTypeUser, createUser, login, getUsers, getUserById, updateUser } from "../controllers/users.js";
import multer from "multer";



const upload = multer({ storage: multer.memoryStorage() });


const userRoutes = Router();

userRoutes.post("/createUser",  upload.single('image'), createUser);

userRoutes.post("/createTypeUser", createTypeUser);

userRoutes.get("/getUsers", getUsers);

userRoutes.get("/getUserById/:id", getUserById);

userRoutes.put("/updateUser/:user_id", upload.single('image'), updateUser);

userRoutes.post("/login", login);



export default userRoutes;