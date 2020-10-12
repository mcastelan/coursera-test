    

(function () {
    "use strict";
    
    angular.module('public')
    .controller('UserInfoController', UserInfoController);
    
    UserInfoController.$inject = ['userInformation','MenuService','ApiPath'];
    function UserInfoController(userInformation, MenuService,ApiPath) {
      
    var userinfoCtrl = this;
  
    userinfoCtrl.user =userInformation;
    userinfoCtrl.userRegistered =MenuService.isRegistered();  
    userinfoCtrl.menuItem =null;
    userinfoCtrl.basePath = ApiPath;
    if(userinfoCtrl.userRegistered)
    {

        var promise = MenuService.getMenuItem(userinfoCtrl.user.option);
    
 
        promise.then(function (response) {
        
          console.log(response);
          userinfoCtrl.menuItem =response;
    
        
          console.log(userinfoCtrl.menuItem);
            
        });
    }

    

    

    }
    
    
    })();
    