const Sequelize = require('sequelize')
const dbinfo = require('./object.js')

const db = new Sequelize(dbinfo.dbinfo)

const Tasks = db.define('tasks',{
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.DataTypes.STRING(140),
        allowNull: false
    },
    done: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
    }
})

async function createTask(task_data){
    await db.sync()
    await Tasks.create({title: task_data})
}

async function ShowTasks(){
    const tasks = await Tasks.findAll()
    let result = ['']
    tasks.forEach(ele => {
        result.push(ele.title)
        // console.log(ele.title);
    })
    return result
}

async function DeleteAllTasks(){
    await db.sync({force:true})
}

module.exports = {
    showTasks: ShowTasks,
    createTask: createTask,
    deleteTask: DeleteAllTasks
}