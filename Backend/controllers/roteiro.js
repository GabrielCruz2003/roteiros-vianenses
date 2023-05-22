import path from "path";
import roteiroModel from "../models/roteiro.js";
import roteiroTypeModel from "../models/roteiro_type.js";
import imagensModel from "../models/imagens.js";
import roteiroRoutes from "../routes/roteiro.js";
import multer from "multer";
import { storage } from "../config/multerconfig.js";


const upload = multer({ storage: storage });



export const createTypeRoteiro = async (req, res) => {
    const { type } = req.body;
    
    // Verifica se todos os campos estão preenchidos
    if (!type) {
        return res.status(400).json({ message: "Falta preencher algo" });
    }
    
    try {
        const roteiro = await roteiroTypeModel.create({
        type,
        });
        return res.status(201).json(roteiro);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar roteiro" });
    }
};

export const createRoteiro = async (req, res) => {
    const { nome, descricao, roteiro_type_id } = req.body;
  
    // Verifica se todos os campos estão preenchidos
    if (!nome || !descricao || !roteiro_type_id) {
        return res.status(400).json({ message: "Falta preencher algo" });
    }
    
    try {
        const roteiro = await roteiroModel.create({
        nome,
        descricao,
        roteiro_type_id,
        });
        return res.status(201).json(roteiro);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar roteiro" });
    }
};

export const getRoteiro = async (req, res) => {
  try {
    const roteiros = await roteiroModel.findAll({
      include: imagensModel, // Inclui os dados relacionados do modelo de imagens
    });

    return res.status(200).json(roteiros);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao buscar roteiro" });
  }
};


export const addImagem = async (req, res) => {

    const { roteiro_id } = req.body;
    const { nome } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!nome || !roteiro_id) {
        return res.status(400).json({ message: "Falta preencher algo" });
    }

    const { filename } = req.file;
    const time = new Date().getTime();
    const imagem = `${time}_${filename}`;

    try {
        const roteiro = await imagensModel.create({
            nome,
            imagem,
            roteiro_id,
        });
        return res.status(201).json(roteiro);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar roteiro" });
    }
};


    





  



    

