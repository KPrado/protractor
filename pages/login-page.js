class LoginPage{
    constructor(){
        this.ec = protractor.ExpectedConditions;
        this.path = '/login';
        this.form = $('#login_form')
        this.input_email = element(by.css('input[name=email]'));
        this.input_password = element(by.css('input[name=password]'));
        this.submit = element(by.css('button[id*=btnLogin]'));
        this.txtmensagem = element(by.css('.alert-login'));
    }

    //funcao de login
    with(email, pass){
        this.input_email.sendKeys(email);
        this.input_password.sendKeys(pass);
        this.submit.click();
    }

    go(){
        browser.get(this.path);
    }
    waitForm(){
        browser.get('logout');
        browser.wait(this.ec.presenceOf(this.form), TIMEOUT);
    }
}

module.exports = LoginPage;