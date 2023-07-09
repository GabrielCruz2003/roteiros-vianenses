import likesModel from '../models/likes.js';
import roteiroModel from '../models/roteiro.js';



export const getLikes = async (req, res) => {
    try {
        const { user_id, roteiro_id } = req.params;

        // Buscar todos os likes
        const likes = await likesModel.findAll({
            where: {
                user_id: user_id,
                roteiro_id: roteiro_id
            }
        });
       

        res.json(likes);
       
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao obter likes' });
    }
}



export const addLike = async (req, res) => {
    const { user_id, roteiro_id } = req.body;


    //se o usuario ja dei like, ao clicar no botao de like, o like é removido
    const dislike = await likesModel.findOne({
        where: {
            user_id: user_id,
            roteiro_id: roteiro_id
        }
    });

    if (dislike) {
        await likesModel.destroy({
            where: {
                user_id: user_id,
                roteiro_id: roteiro_id
            }
        });
        res.json({ message: 'Like removido' });
        return;
    }


    try {
        const like = await likesModel.create({
            user_id,
            roteiro_id
        });
        res.json(like);
    }
    catch (error) {
        console.log(error);
    }

}

export const getLikesByUser = async (req, res) => {
    try {
        const { user_id } = req.params;

       //buscar todos os likes do usuario incluindo o roteiro
        const likes = await likesModel.findAll({
            where: {
                user_id: user_id
            },
            include: [{
                model: roteiroModel,
                required: true
            }]
        });

        res.json(likes);
       
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao obter likes' });
    }
}


