class TasksPage{
    constructor(){
        this.ec = protractor.ExpectedConditions;
        this.board = $('#task-board');
        this.newTaskButton = element(by.css("#insert-button"));
        this.inputName = element(by.css("input[name=title]"));
        this.addButton = element(by.css("button[id*=submit]"));
        //validando a cor do icone do começo da msg(css)
        this.alertInfo = element(by.css(".panel-c-info"));
        this.alertWarn = element(by.css(".panel-c-warning"));
        this.alertError = element(by.css(".panel-c-danger"));
    }

    //metodo
    addTask(task){
        this.inputName.clear();
        this.inputName.sendKeys(task.name);
        this.addButton.click();
    }
    getItem(name){

        //Expect Condition Protractor
        // var ec = protractor.ExpectedConditions;
        browser.wait(this.ec.presenceOf(this.board), TIMEOUT);
        return element(by.cssContainingText("tr", name));
    }
}
module.exports = TasksPage;