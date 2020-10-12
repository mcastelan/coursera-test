(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  service.userModel = null;
  service.userRegistered = false;
  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (shortName) {
    return $http.get(ApiPath +'/menu_items/' +shortName+'.json').then(function (response) 
    {
      return response.data;
    });
  };

  service.setUser =function(user){
    service.userModel = user;
    service.userModel.option= angular.uppercase(service.userModel.option);
    service.userRegistered = true;
     return "something";
     
  } ;

  service.getUser=function()
  {
    return service.userModel;
  };
  service.isRegistered=function()
  {
    return service.userRegistered;
  };

  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

}



})();
