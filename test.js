//Tryed to get data from weather.com
//But because of lack of knowledge and zero experience with SELENIUM
//wasn't succesfull
var wd = require('selenium-webdriver');
var Promise = require('promise');
var fs = require('fs');

var SELENIUM_HOST = 'http://localhost:4444/wd/hub';
var URL = 'https://weather.com';

var client = new wd.Builder()
   .usingServer(SELENIUM_HOST)
   .withCapabilities({ browserName: 'firefox'})
   .build();

client.get(URL).then(function() {        
        client.wait(wd.until.elementLocated(wd.By.tagName('input'), 3000)).then(function(){
                return client.findElement(wd.By.tagName('input')).sendKeys('London');
        });        
}).then(function() {
        //Need time for downmenu to appear(sometimes it didn't appear due to bug in the weather.com system)
        setTimeout(function() {
                return client.findElement(wd.By.xpath('//*[@id="wx-header-wrap"]/div/div/div/div[2]/div[2]/div/section/div/div[2]/div/div/div/div/ul/li[1]')).click();
        }, 20000);                
}).then(function() {
        //Needed time for page to load can't use elementLocated because this card on every page
        setTimeout(function() {
                let div = client.findElement(wd.By.className('today_nowcard-temp'));
                let text = div.findElement(wd.By.className('dir-ltr'));
                //tried to write to file for testing
                let sometext = text.getText();
                fs.writeFile('content.txt', sometext, function(err) {
                        if(err) console.log("errrrrrrr");
                });       
                client.quit();
                return sometext;
        }, 30000)
        
});


// client.get(URL, function(err, data){
//         var input = client.findElement(wd.By.tagName('input'));
//         if(!err){
//                  input.sendKeys('London', function(err, data){
//                          if(!err){
//                                  input.sendKeys(wd.Key.ENTER);
//                          }
//                  })
//         }        
// });

// var promise = new Promise(function (resolve, reject) {
//         input = client.findElement(wd.By.tagName('input'));      
        
                
//         if (input.sendKeys('London')) 
//         {
//                 input.sendKeys(wd.Key.ENTER);                
//         }
//         else
//         {        
//                 console.log('eerrrroorr');
//                 reject(err);        
//         } 
        
// });


// client.findElement(wd.By.tagName('input')).then(function(){
//         client.sendKeys('London');
//         client.sendKeys(wd.Key.ENTER);               
// }, function(err){
//         console.log('error');
// });





// var promise2 = promise.then(function() {
//         input.sendKeys(wd.Key.ENTER);
//         console.log("qwertyu");
// }, function(err){
//     console.log("ssfdsdfdf");
// })
