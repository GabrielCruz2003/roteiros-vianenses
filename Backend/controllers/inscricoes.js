import inscricoesModel from "../models/inscricoes.js";
import roteiroModel from "../models/roteiro.js";
import UserModel from "../models/users.js";


export const createInscricao = async (req, res) => {
    const { user_id, roteiro_id } = req.body;
    
    if(!user_id || !roteiro_id){
        return res.status(400).json({mensagem: "Dados obrigatórios faltando!"});
    }

    //a data do roteiro tem de ser menor que a data atual
    const roteiro = await roteiroModel.findOne({where: {id: roteiro_id}});
    if(!roteiro){
        return res.status(404).json({mensagem: "Roteiro não encontrado!"});
    }
    const dataRoteiro = new Date(roteiro.data);
    const dataAtual = new Date();
    if(dataRoteiro < dataAtual){
        return res.status(400).json({mensagem: "Roteiro Já aconteceu!"});
    }

    //o usuario so pode ser inscrever uma vez no roteiro
    const inscricao = await inscricoesModel.findOne({where: {user_id: user_id, roteiro_id: roteiro_id}});
    if(inscricao){
        return res.status(400).json({mensagem: "Usuário já inscrito no roteiro!"});
    }

    //o usuario nao pode se inscrever em dois roteiros com a mesma data
    const inscricoes = await inscricoesModel.findAll({where: {user_id: user_id}});
    if(inscricoes){
        for(let i = 0; i < inscricoes.length; i++){
            const roteiro = await roteiroModel.findOne({where: {id: inscricoes[i].roteiro_id}});
            if(roteiro){
                const dataRoteiro = new Date(roteiro.data);
                if(dataRoteiro == dataRoteiro){
                    return res.status(400).json({mensagem: "Usuário já inscrito em um roteiro com a mesma data!"});
                }
            }
        }
    }
    

 
    try {
        const data = await inscricoesModel.create(req.body);
        return res.status(201).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
  
};

export const getInscricao = async (req, res) => {
    try {
        const data = await inscricoesModel.findAll({
            include: [
                {
                    model: UserModel,
                    as: "user",
                },
                {
                    model: roteiroModel,
                    as: "roteiro",
                },
            ],
        });
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
};

