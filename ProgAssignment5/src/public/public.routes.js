(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.login', {
      url: '/login',
      templateUrl: 'src/public/security/login.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.userinfo', {
      url: '/userinfo',
      templateUrl: 'src/public/security/userinfo.html',
      controller: 'UserInfoController',
      controllerAs: 'userinfoCtrl',
      resolve: {
        userInformation: ['MenuService', function (MenuService) {
          return MenuService.getUser();
        }],
        // menuItem: ['MenuService', function (MenuService) {
        //   return MenuService.getMenuItem(MenuService.getUser().option);
        // }]
      }
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    });
}
})();
