exports.config = {

    // directConnect: true,
    seleniumAddress: 'http://selenium_server:4444/wd/hub',
    framework: 'jasmine2',
    specs: ['specs/tasks-spec.js'],
    baseUrl: 'https://mark7.herokuapp.com',
    //Desligar sincronia com angular
    onPrepare: function(){
        browser.manage().timeouts().implicitlyWait(10000);
        browser.ignoreSynchronization = true;
        
        TIMEOUT = 3000;
        
        //jasmine html reporter
        var JasmineHtmlReporter = require('protractor-jasmine2-html-reporter');
        jasmine.getEnv().addReporter(new JasmineHtmlReporter({
            savePath:'reports',
            screenShotsFolder: './shots',
            takeScreenShots: true,
            cleanDestination: true,
            fixedScreenshotName: true
        }));

        //conf spec reporter do jasmine
        var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
        jasmine.getEnv().addReporter(new SpecReporter({
            spec:{
                displayStacktrace: true,
                displayErrorMessages: true,
                displayFailed: true,
                displayDuration: true
            },
            summary: {
                displayErrorMessages: true,
                displayStacktrace: true,
                displaySuccessful: true,
                displayFailed: true,
                displayDuration:true
            },
            colors: {
                enabled: true
            }
        }));
    },
    capabilities: {
        'browserName': 'chrome'
    }

}
