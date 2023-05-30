import comentariosModel from "../models/comentarios.js";
import roteiroModel from "../models/roteiro.js";
import UserModel from "../models/users.js";


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
  
  
  
  
  
  
  
  
  
  
  
