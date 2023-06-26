import path from "path";
import roteiroModel from "../models/roteiro.js";
import roteiroTypeModel from "../models/roteiro_type.js";
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
    const { nome, descricao, data, roteiro_type_id } = req.body;
    const imagem = req.file;

    // Verifica se todos os campos estão preenchidos
    if (!nome || !descricao || !data || !roteiro_type_id) {
        return res.status(400).json({ message: "Falta preencher algo" });
    }

    try {
        let nomeImagem = null;

        // Se houver uma imagem, extrai o nome dela
        if (imagem) {
            const { filename } = imagem;
            nomeImagem = filename;
        }

        //verifica se o tipo de roteiro existe
        const roteiro_type = await roteiroTypeModel.findByPk(roteiro_type_id);
        if (!roteiro_type) {
            return res.status(400).json({ message: "Tipo de roteiro não existe" });
        }


        // Cria o roteiro com o nome da imagem
        const roteiro = await roteiroModel.create({
            nome,
            descricao,
            data,
            roteiro_type_id,  // Salva o nome do tipo de roteiro
            imagem: nomeImagem, // Salva apenas o nome da imagem
        });

        // Se houver uma imagem, cria o registro da imagem associada ao roteiro

        return res.status(201).json(roteiro);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar roteiro" });
    }
};

export const getRoteiro = async (req, res) => {
    try {
        const roteiros = await roteiroModel.findAll({
            include: [
                {
                    model: roteiroTypeModel,
                    as: "roteiro_type",
                },
            ],
        });

        return res.status(200).json(roteiros);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar roteiro" });
    }
};

  
export const getTypeRoteiro = async (req, res) => {
    try {
        const roteiros = await roteiroTypeModel.findAll({ 
        });

        return res.status(200).json(roteiros);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao buscar roteiro" });
    }
};




    





  



    

