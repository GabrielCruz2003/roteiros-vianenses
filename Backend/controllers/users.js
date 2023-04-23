import path from "path";
import UserModel from "../models/users.js";

export const createUser = async (req, res) => {
  const { name, email, password, genero } = req.body;

  // Verifica se todos os campos estão preenchidos
  if (!name || !email || !password || !genero) {
    return res.status(400).json({ message: "Falta preencher algo" });
  }

  // Verifica se a imagem foi enviada
  if (!req.file) {
    return res.status(400).json({ message: "É necessário enviar uma imagem" });
  }

  const { filename } = req.file;

  try {
    const user = await UserModel.create({
      name,
      email,
      password,
      genero,
      image: filename,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar usuário" });
  }
};


