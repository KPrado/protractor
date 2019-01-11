// mongo db connection
const mongoose = require('mongoose');
const config = require('./conf-db');

// var user = "heroku_4m3km28x"
// var password = "rmrm93njviet46a4caul3svj4p"
// var url = "ds225078.mlab.com:25078"
// var banco = "heroku_4m3km28x"

//connection String
// const mongoStrConn = "mongodb://heroku_4m3km28x:rmrm93njviet46a4caul3svj4p@ds225078.mlab.com:25078/heroku_4m3km28x";
const {db: {host, port, user, pass, database}} = config;
//connection String
const mongoStrConn = `mongodb://${user}:${pass}@${host}:${port}/${database}`;
mongoose.connect(mongoStrConn)


//base = mongo define a base no código
const TaskSchema = new mongoose.Schema({
    title: String,
    dueDate: Date,
    done: Boolean,
    Tags: Array,
    createdBy: String
});
//tabela task, obj que conecta no banco
const Task = mongoose.model('tasks', TaskSchema)

//metodo que recebe um parametro e remove um registro em que 'title = taskName'
module.exports = {
    addTask: task => new Task(task).save(),
    deleteByName: taskName => Task.remove({title: taskName})
}