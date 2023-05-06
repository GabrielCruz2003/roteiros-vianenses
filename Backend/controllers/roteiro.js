import path from "path";
import roteiroModel from "../models/roteiro.js";


export const createRoteiro = async (req, res) => {
    const { nome, descricao } = req.body;
    
    // Verifica se todos os campos estão preenchidos
    if (!nome || !descricao) {
        return res.status(400).json({ message: "Falta preencher algo" });
    }
    
    try {
        const roteiro = await roteiroModel.create({
        nome,
        descricao,
        });
        return res.status(201).json(roteiro);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar roteiro" });
    }
};
    