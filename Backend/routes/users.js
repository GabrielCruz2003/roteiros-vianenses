import Router from "express";
import { createUser } from "../controllers/users.js";

const userRoutes = Router();

userRoutes.post("/create", createUser);


export default userRoutes;