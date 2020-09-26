(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}



function FoundItemsDirectiveController() {
  var list = this;

  list.itemsInList = function () {
    if(list.items !== undefined && list.items.length > 0 ){
        return true;
      }
      return false;
    };

    
  }


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searched=false;
  menu.searchKeyWord="";
   menu.title ="Narrow Down List";

  menu.removeItem = function (itemIndex) {
      
    menu.found.splice(itemIndex, 1);
    
  };
  
   menu.getMatchedMenuItems =function()
   {
    menu.searched=true;
    var promise = MenuSearchService.getMenuForCategory();
   

    promise.then(function (response) {
    
     
    menu.found =[];

    for(var i=0;i<response.data.menu_items.length;i++){

      var item = {
        id: response.data.menu_items[i].id,
        short_name: response.data.menu_items[i].short_name,
        name: response.data.menu_items[i].name,
        description: response.data.menu_items[i].description
      };
      
      
      if(  menu.searchKeyWord !=="")
      {
          if(item.description.indexOf(  menu.searchKeyWord)!==-1)
          {
            
            menu.found.push(item);

          }
        
      }
      else{
        menu.found.push(item);
      }
    }
    
    
     return menu.found;
     
    })
    .catch(function (error) {
      console.log(error);
    })

   };

  

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  
  
 
  service.getMenuForCategory = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
     
    });
   
    return response;
  };

}

})();
