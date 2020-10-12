(function() {
"use strict";
/**
 * Public restaurant application. Includes the common module and ui-router.
 */
angular.module('public', ['ui.router', 'common'])
.directive('menuItemExist', MenuItemExist);

MenuItemExist.$inject  = ['$http','$q'];
function MenuItemExist($http, $q) {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
           
            ngModel.$asyncValidators.menuItemExist = function(modelValue, viewValue) {
               
                return $http.get('https://mcastelan-spacourse.herokuapp.com/menu_items/' +viewValue+'.json')
                    .then(
                     function(response) {
                           console.log(response);
                             if (!response.status===200) {
                                
;                                  return $q.reject("No such Menu Item Number"); 
                                 //Server will give me a  notify if it exist or not. I will throw a error If it exist with "reject"
                             }
                             
                        return true;
                    }
                )
              
                  ;
            };
        }
    };
  }
})();
