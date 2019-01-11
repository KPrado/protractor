// ^ = comeca com
// * = contem
// $ = termina com
//element(by.xpath("//li[@role='treeitem'][text()='Hawaii']")).click();  
const LoginPage = require('../pages/login-page')

describe('dado que acessei a pagina login ', function(){

    const login_page = new LoginPage();

    //hook jasmine -> executa a cada vez (beforeAll = executa só uma vez)
    beforeEach(function(){
        browser.get(login_page.path);
    })

    it('quando a senha é invalida', function(){
        
        //encapsulamento
        login_page.with('me@papito.io', 'abc123');

        expect(login_page.txtmensagem.getText()).toEqual('Senha inválida.')

    });

    it('quando o usuario não é cadastrado', function(){
        
        login_page.with('eu@eu.com.br', 'abc123');
    
        expect(login_page.txtmensagem.getText()).toEqual('Usuário não cadastrado.')
    });

    it('quando o email não é valido', function(){
        
        login_page.with('euew#eu.com.br', 'abc123');
    
        expect(login_page.txtmensagem.getText()).toEqual('Email incorreto ou ausente.')
    });

});