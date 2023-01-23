const express = require('express');
const router = express.Router();
const Tasks = require('../models/Tasks');

// BUSCA TODAS AS TAREFAS
router.get('/', async function(req, res, next) {
    await Tasks.findAll().then((content)=>{

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

// BUSCAR TAREFA POR ID
router.get('/:taskId', async (req,res) => {
    
    const task = await Tasks.findByPk(req.params.taskId);

    if(task === null){
        res.status(400).json({
            erro:false,
            message: "Tarefa não existe!"
        })
    } else {
        res.status(200).json({
            erro: false,
            message: 'Sucesso',
            content: task
        })
    }
})

// CADASTRAR TAREFA
router.post('/create', async (req,res) => {

    await Tasks.create(req.body)
    .then(()=>{
        return res.json({
            erro: false,
            message: "Tarefa cadastrada com sucesso!"
        })
    }).catch((err)=>{
        console.log(err)
        return res.status(400).json({
            erro:false,
            message: "Erro: Tarefa não criada!"
        })
    })
})

// ATUALIZAR CONTA
router.patch('/update/:taskId', async (req, res)=>{
    
    await Tasks.update(req.body,{
        where: {
            id: req.params.taskId
        }
    }).then((response)=>{
        if(response[0] === 0){
            res.status(400).json({
                message: 'Campo inexistente!'
            })
        }else{
            console.log(response)
            res.status(200).json({
                message: 'Tarefa atualizada com sucesso!'
            })
        }
        
    }).catch((err)=>{
        console.log(err);
        
    })
    
})

// DELETAR CONTA POR ID
router.delete('/:taskId', async (req,res)=>{

    Tasks.destroy({
        where: {
            id: req.params.taskId
        }
    }).then((response)=>{
        if(response === 0){
            res.status(400).json({
                message: 'ERROR: Tarefa inexistente'
            })
        }else{
            res.status(200).json({
                message: 'Tarefa deletada com sucesso!'
            })
        }

    }).catch((err)=>{
        res.status(400).json({
            message: `ERROR: ${err}`
        })
    })
})

module.exports = router;
