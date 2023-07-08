import comentariosModel from "../models/comentarios.js";
import roteiroModel from "../models/roteiro.js";
import UserModel from "../models/users.js";
import UserTypeModel from "../models/user_type.js";


export const createComentario = async (req, res) => {
    const { user_id, roteiro_id, comentario } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!user_id || !roteiro_id || !comentario) {
        return res.status(400).json({ message: "Falta preencher algo" });
    }

    try {
        const newComentario = await comentariosModel.create({
            user_id,
            roteiro_id,
            comentario,
        });
        return res.status(201).json(newComentario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar comentário" });
    }
}

export const getComentarios = async (req, res) => {
    const roteiroId = req.params.id;
    console.log('ID do Roteiro:', roteiroId); // Adicione esta linha
  
    try {
      const comentarios = await comentariosModel.findAll({
        where: { roteiro_id: roteiroId },
        include: [
          {
            model: roteiroModel,
            attributes: ["id", "nome", "descricao"],
          },
          {
            model: UserModel,
            attributes: ["name", "image"],
          },
        ],
      });
  
      res.status(200).json(comentarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar os comentários do roteiro" });
    }
  };
  
export const deleteComentario = async (req, res) => {
    const { user_id, comentario_id, roteiro_id } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!user_id || !comentario_id || !roteiro_id) {
        return res.status(400).json({ message: "Falta preencher algo" });
    }

    //verifica se o user existe
    const userExists = await UserModel.findByPk(user_id);
    if (!userExists) {
        return res.status(400).json({ message: "Usuário não existe" });
    }

    // Verifica se o tipo de usuário é admin
    const user = await UserModel.findByPk(user_id, {
        include: {
            model: UserTypeModel,
            attributes: ['type'],
        },
    });

    if (user.user_type.type !== "admin") {
        return res.status(400).json({ message: "Usuário não é admin" });
    }

    //verifica se o comentario existe
    const comentarioExists = await comentariosModel.findByPk(comentario_id);
    if (!comentarioExists) {
        return res.status(400).json({ message: "Comentário não existe" });
    }

    //verifica se o comentario pertence ao roteiro
    const comentario = await comentariosModel.findByPk(comentario_id, {
        include: {
            model: roteiroModel,
            attributes: ['id'],
        },
    });

    if (comentario.roteiro_id !== roteiro_id) {
        return res.status(400).json({ message: "Comentário não pertence ao roteiro" });
    }

    try {
        await comentariosModel.destroy({
            where: {
                id: comentario_id,
            },
        });

        return res.status(200).json({ message: "Comentário eliminado com sucesso" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao eliminar comentário" });
    }
        
}
  
  
  
  
  
  
  
  
  
  
