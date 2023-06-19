import likesModel from '../models/likes.js';




export const getLikes = async (req, res) => {
    try {
        const likes = await likeModel.findAll();
        res.json(likes);
    } catch (error) {
        console.log(error);
    }
}

export const addLike = async (req, res) => {
    const { user_id, roteiro_id } = req.body;

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

