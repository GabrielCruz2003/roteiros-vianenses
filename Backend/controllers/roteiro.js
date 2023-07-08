import path from "path";
import roteiroModel from "../models/roteiro.js";
import roteiroTypeModel from "../models/roteiro_type.js";
import roteiroRoutes from "../routes/roteiro.js";
import multer from "multer";
import { storage } from "../config/multerconfig.js";
import UserModel from "../models/users.js";
import UserTypeModel from "../models/user_type.js";
import inscricoesModel from "../models/inscricoes.js";
import likesModel from "../models/likes.js";
import comentariosModel from "../models/comentarios.js";


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
  const { nome, descricao, data, roteiro_type_id, user_id } = req.body;
  const imagem = req.file;

  // Verifica se todos os campos estão preenchidos
  if (!nome || !descricao || !data || !roteiro_type_id || !user_id) {
    return res.status(400).json({ message: "Falta preencher algo" });
  }

  //verifica se o user existe
  const userExists = await UserModel.findByPk(user_id);
  if (!userExists) {
    return res.status(400).json({ message: "Usuário não existe" });
  }

  // a data tem de ser maior que a data atual
  const dataAtual = new Date();
  if (data < dataAtual) {
    return res.status(400).json({ message: "Data tem de ser maior que a data atual" });
  }


  try {
    let nomeImagem = null;

    // Se houver uma imagem, extrai o nome dela
    if (imagem) {
      const { filename } = imagem;
      nomeImagem = filename;
    }

    // Verifica se o tipo de usuário é admin
    const user = await UserModel.findByPk(user_id, {
      include: {
        model: UserTypeModel,
        attributes: ['type'],
      },
    });
    
    if (!user || user.user_type.type !== 'admin') {
      return res.status(400).json({ message: "Usuário não tem permissão para criar roteiros" });
    }

    // Verifica se o tipo de roteiro existe
    const roteiroType = await roteiroTypeModel.findByPk(roteiro_type_id);
    if (!roteiroType) {
      return res.status(400).json({ message: "Tipo de roteiro não existe" });
    }

    // Cria o roteiro com o nome da imagem
    const roteiro = await roteiroModel.create({
      nome,
      descricao,
      data,
      roteiro_type_id,
      imagem: nomeImagem,
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

export const eliminarRoteiro = async (req, res) => {
  const { user_id , roteiro_id } = req.body;

  // Verifica se todos os campos estão preenchidos
  if (!user_id || !roteiro_id) {
    return res.status(400).json({ mensagem: "Falta preencher algo" });
  }

  //verifica se o user existe
  const userExists = await UserModel.findByPk(user_id);
  if (!userExists) {
    return res.status(400).json({ mensagem: "Usuário não existe" });
  }

  // Verifica se o tipo de usuário é admin
  const user = await UserModel.findByPk(user_id, {
    include: {
      model: UserTypeModel,
      attributes: ['type'],
    },
  });

  if (!user || user.user_type.type !== 'admin') {
    return res.status(400).json({ mensagem: "Usuário não tem permissão para eliminar roteiros" });
  }

  // Verifica se o roteiro existe
  const roteiro = await roteiroModel.findByPk(roteiro_id);
  if (!roteiro) {
    return res.status(400).json({ mensagem: "Roteiro não existe" });
  }



  try {
    
    await roteiroModel.destroy({
      where: {
        id: roteiro_id,
      },
    });

    // Elimina as inscrições associadas ao roteiro
    await inscricoesModel.destroy({
      where: {
        roteiro_id: roteiro_id,
      },
    });

    // Elimina os likes associados ao roteiro
    await likesModel.destroy({
      where: {
        roteiro_id: roteiro_id,
      },
    });

    // Elimina os comentários associados ao roteiro
    await comentariosModel.destroy({
      where: {
        roteiro_id: roteiro_id,
      },
    });


    return res.status(200).json({ mensagem: "Roteiro eliminado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao eliminar roteiro" });
  }
};


  




    





  



    

