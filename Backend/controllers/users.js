import path from "path";
import UserModel from "../models/users.js";
import UserTypeModel from "../models/user_type.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();


export const createTypeUser = async (req, res) => {
  const { type } = req.body;

  // Verifica se todos os campos estão preenchidos
  if (!type) {
    return res.status(400).json({ message: "Falta preencher algo" });
  }

  try {
    const userType = await UserTypeModel.create({
      type,
    });
    return res.status(201).json(userType);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar tipo de usuário" });
  }
};


export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user_type_id = 2;

  // Verifica se todos os campos estão preenchidos
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Preencha todos os campos obrigatórios" });
  }


  // Verifica se o usuário já está registrado
  const existingUser = await UserModel.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "O email já está registrado" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      user_type_id,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar usuário" });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;

  // Verifica se todos os campos estão preenchidos
  if (!email || !password) {
    return res.status(400).json({ message: "Falta preencher algo" });
  }

  try {
    // Verifica se o usuário existe no banco de dados
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verifica se a senha informada é a mesma que está no banco de dados
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    // Gera um token de autenticação
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

    return res.status(200).json({ message: "Login realizado com sucesso", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao fazer login" });
  }
};