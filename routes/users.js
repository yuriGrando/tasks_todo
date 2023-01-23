const express = require('express');
const router = express.Router();
const User = require('../models/User');

// BUSCAR LISTA DE USUÁRIOS
router.get('/', async function(req, res, next) {
    await User.findAll().then((content)=>{

    res.status(200).json({
        erro: false,
        message: 'Sucesso',
        content
    })
    }).catch((err)=>{
        res.status(400).json({
            erro:false,
            message: "Falha!"
        })
    })
});

// BUSCAR USUÁRIO POR ID
router.get('/:id', async (req,res) => {
    
    const user = await User.findByPk(req.params.id);
    console.log(user, req.id)

    if(user === null){
        res.status(400).json({
            erro:false,
            message: "Usuário não existe!"
        })
    } else {
        res.status(200).json({
            erro: false,
            message: 'Sucesso',
            content: user
        })
    }
})

// CADASTRAR USUÁRIOS
router.post('/add', async (req,res) => {

    await User.create(req.body)
    .then(()=>{
        return res.json({
            erro: false,
            message: "Usuário cadastrado com sucesso!"
        })
    }).catch((err)=>{
        console.log(err)
        return res.status(400).json({
            erro:false,
            message: "Erro: Usuário não cadastrado com sucesso!"
        })
    })
})

// ATUALIZAR USUÁRIO
router.patch('/att/:userId', async (req, res)=>{
    
    await User.update(req.body,{
        where: {
            id: req.params.userId
        }
    }).then((response)=>{
        if(response[0] === 0){
            res.status(400).json({
                message: 'Campo inexistente!'
            })
        }else{
            console.log(response)
            res.status(200).json({
                message: 'Usuário atualizado com sucesso!'
            })
        }
        
    }).catch((err)=>{
        console.log(err);
        
    })
    
})

// DELETAR USUÁRIO POR ID
router.delete('/:userId', async (req,res)=>{

    User.destroy({
        where: {
            id: req.params.userId
        }
    }).then((response)=>{
        if(response === 0){
            res.status(400).json({
                message: 'ERROR: Usuário inexistente'
            })
        }else{
            res.status(200).json({
                message: 'Usuário deletado com sucesso!'
            })
        }

    }).catch((err)=>{
        res.status(400).json({
            message: `ERROR: ${err}`
        })
    })
})

module.exports = router;
