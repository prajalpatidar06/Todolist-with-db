const express = require('express')
const path = require('path')
const hbs = require('hbs')
const db = require('./write.js')
const app = express()

app.set('view engine' , 'hbs')
app.set('views', path.join(__dirname)+'/views')
app.use(express.urlencoded({force:true}))

app.get('/' , (req,res)=>{
    db.showTasks().then(tasks =>{
        res.render('todolist' , {tasks})
        console.log("server",tasks[3])
    })
})

app.post('/' , (req,res)=>{
    task = req.body.task
    db.createTask(task).then(()=>{
        res.redirect('/')
    })
})

app.listen(4545 , ()=>{
    console.log("server started at https://localhost:4545")
})