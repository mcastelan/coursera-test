    

(function () {
    "use strict";
    
    angular.module('public')
    .controller('LoginController', LoginController);
    
    LoginController.$inject = ['menuCategories','MenuService'];
    function LoginController(menuCategories,MenuService) {
      
    var logintCtrl = this;
    logintCtrl.user = {
        option: null,
       firstname:"",
       lastname:null,
       email:null,
       phone:null,
       };
       
        
      
       
         logintCtrl.remoteValAsync = function(value) {
            console.log("validatio");

        //   var isValid = true;
        // var promise = MenuService.getMenuItem(value);
        // promise.then(function() {
        //     isValid= true;
        //     return isValid;
        // }, function(error) {
        //     isValid=false;
        // });
        // return promise;
      };

        ////
        
       logintCtrl.submit = function () {
       
         
        MenuService.setUser(logintCtrl.user);
        logintCtrl.completed = true;
      
       
        };

        
        //var mainlist = this;
        logintCtrl.items =[];
        for(var i=0;i<menuCategories.length;i++){
      
          var item = {
            id: menuCategories[i].id,
            short_name: menuCategories[i].short_name,
            name: menuCategories[i].name
          };
          
          
          logintCtrl.items.push(item);
        }   
        console.log(logintCtrl.items) 
    }
    
    
    })();
    