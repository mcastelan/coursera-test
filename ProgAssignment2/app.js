(function () {
    'use strict';
    
var shoppingList1 = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
        name: "Corn Flakes",
        quantity: "15"
    }
  ];

  
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    
    
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var list = this;
    
      list.items = ShoppingListCheckOffService.getItems();
    
      list.itemName = "";
      list.itemQuantity = "";
    
    
    
      list.removeItem = function (itemIndex) {
          
        ShoppingListCheckOffService.removeItem(itemIndex);
         
      };
    }
    
    AlreadyBoughtController.$inject=['ShoppingListCheckOffService']
    function AlreadyBoughtController(ShoppingListCheckOffService)
    {
       var list = this;
        list.items = ShoppingListCheckOffService.getBoughtItems();
        
    }
    
    // If not specified, maxItems assumed unlimited
    function ShoppingListCheckOffService() {
      var service = this;
    
      // List of shopping items
      var items = shoppingList1;
      var boughtItems = [];
      
    
      service.removeItem = function (itemIndex) {
             
        boughtItems.push(items[itemIndex]);
        items.splice(itemIndex, 1);
        
      
      };
    
      service.getItems = function () {
        return items;
      };

      service.getBoughtItems = function () {
        return boughtItems;
      };
    }
    
    
    // function ShoppingListProvider() {
    //   var provider = this;
    
    //   provider.defaults = {
    //     maxItems: 100
    //   };
    
    //   provider.$get = function () {
    //     var shoppingList = new ShoppingListCheckOffService(provider.defaults.maxItems);
    
    //     return shoppingList;
    //   };
    // }
    
    })();
    