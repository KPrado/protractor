const LoginPage = require('../pages/login-page');
const TaskPage = require('../pages/tasks-page');
//=> arrow function
//ES6
const login_page = new LoginPage();
const tasks_page = new TaskPage();
const serviceDB = require('../banco/tasks-db');
const userDb = require('../banco/users-db');

describe('Quando cadastro uma tarefa', ()=> {

    var newTask = { name: "Estudar mais dark souls 3" };

    beforeAll(() => {
        const serviceDB = require('../banco/tasks-db');
        serviceDB.deleteByName(newTask.name).then(res => console.log(res));

        login_page.go();
        login_page.with("kaique@teste.com.br", "123456");
        tasks_page.newTaskButton.click();
        tasks_page.addTask(newTask);
    });

    it('Então vejo a tarefa com status Em Andamento', ()=>{
        expect(tasks_page.getItem(newTask.name).getText()).toContain("Em andamento");
    });
    //matar a sessao e criar outra
    afterAll(()=>{
        login_page.waitForm();
    })
});


describe('Quando tento cadastrar uma tarefa', ()=>{
    beforeAll(() => {
        const serviceDB = require('../banco/tasks-db');

        login_page.go();
        login_page.with("kaique@teste.com.br", "123456");
        tasks_page.newTaskButton.click();
       
    })
    it('com nome muito curto @smoke', () => {
        tasks_page.addTask({name: "Estudar"});
        expect(tasks_page.alertInfo.getText()).toEqual("10 caracteres é o mínimo permitido.");
    });
    it('com Nome em branco\n Então vejo a mensagem de nome obrigatorio', () => {
        tasks_page.addTask({name: ""});
        expect(tasks_page.alertWarn.getText()).toEqual("Nome é obrigatório.");
    });
    afterAll(()=>{
        login_page.waitForm();
    })
});

describe('Quando apago uma tarefa @temp', ()=>{
    var newTask = { title: "Tarefa para ser removida" , tags:['apagar', 'temp'], createdBy:null};

    beforeAll(async() => {
        await serviceDB.deleteByName(newTask.title).then(res => console.log(res));

        //consulta email pra inserir tarefa referente ao id user
        await userDb.getByEmail("kaique@teste.com.br").then((user)=> {
            newTask.createdBy = user._id;
        })

        

        await serviceDB.addTask(newTask);
        login_page.go();
        login_page.with("kaique@teste.com.br", "123456");

    })
    it(' então essa tarefa não deve ser exibida na lista',()=>{
        tasks_page.getItem(serviceDB.title);
        //exemplo com $
        // $('tr:contains("removida")').find('#delete-button').click();
    });
})



// describe('Quando cadastro uma tarefa sem informar o Nome', ()=>{
//     beforeAll(() => {
//         const serviceDB = require('../banco/tasks-db');

//         login_page.go();
//         login_page.with("kaique@teste.com.br", "123456");
//         tasks_page.newTaskButton.click();
//         tasks_page.addTask({name: ""});
//     })
//     it('quando nao informo o nome', () => {
//         expect(tasks_page.alertWarn.getText()).toEqual("Nome é obrigatório.");
//     });
// })

// describe('dado que estou logado', () => {

//     const login_page = new LoginPage();
//     const tasks_page = new TaskPage();

//     var newTask = { name: "Estudar mais dark souls 3" };

//     beforeAll(() => {

//         const serviceDB = require('../banco/tasks-db');
//         //espera uma promisse, ñ é assíncrono
//         serviceDB.deleteByName(newTask.name).then(res => console.log(res));

//         login_page.go();
//         login_page.with("kaique@teste.com.br", "123456");
//         tasks_page.newTaskButton.click();
//     });

//     it('quando o nome é muito curto', () => {
//         // var task = {name:"Estudar"};
//         // task.name = "Estudar";

//         tasks_page.addTask({name: "Estudar"});

//         expect(tasks_page.alertInfo.getText()).toEqual("10 caracteres é o mínimo permitido.");
//     });

//     it('quando não informo o nome', () => {
//         // var task = {name:""};
//         tasks_page.addTask({name: ""});
//         expect(tasks_page.alertWarn.getText()).toEqual("Nome é obrigatório.");
//     });

//     //Apagando do banco e criando novamente
//     it('quando cadastro uma tarefa @smoke', () => {
//         tasks_page.addTask(newTask);
//         expect(tasks_page.getItem(newTask.name).getText()).toContain("Em andamento");
//     });

// });