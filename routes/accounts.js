const express = require('express');
const router = express.Router();
const Accounts = require('../models/Accounts');

// BUSCAR LISTA DE CONTAS
router.get('/', async function(req, res, next) {
    await Accounts.findAll().then((content)=>{

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

// BUSCAR CONTA POR ID
router.get('/:accountId', async (req,res) => {
    
    const account = await Accounts.findByPk(req.params.accountId);

    if(account === null){
        res.status(400).json({
            erro:false,
            message: "Conta não existe!"
        })
    } else {
        res.status(200).json({
            erro: false,
            message: 'Sucesso',
            content: account
        })
    }
})

// CADASTRAR CONTA
router.post('/create', async (req,res) => {

    console.log(req.body)

    await Accounts.create(req.body)
    .then(()=>{
        
        return res.json({
            erro: false,
            message: "Conta cadastrada com sucesso!"
        })
    }).catch((err)=>{
        console.log(err)
        return res.status(400).json({
            erro:false,
            message: "Erro: Conta não cadastrada!"
        })
    })
})

// ATUALIZAR CONTA
router.patch('/update/:accountId', async (req, res)=>{
    
    await Accounts.update(req.body,{
        where: {
            id: req.params.accountId
        }
    }).then((response)=>{
        if(response[0] === 0){
            res.status(400).json({
                message: 'Campo inexistente!'
            })
        }else{
            console.log(response)
            res.status(200).json({
                message: 'Conta atualizada com sucesso!'
            })
        }
        
    }).catch((err)=>{
        console.log(err);
        
    })
    
})

// DELETAR CONTA POR ID
router.delete('/:accountId', async (req,res)=>{

    Accounts.destroy({
        where: {
            id: req.params.accountId
        }
    }).then((response)=>{
        if(response === 0){
            res.status(400).json({
                message: 'ERROR: Conta inexistente'
            })
        }else{
            res.status(200).json({
                message: 'Conta deletada com sucesso!'
            })
        }

    }).catch((err)=>{
        res.status(400).json({
            message: `ERROR: ${err}`
        })
    })
})

module.exports = router;
