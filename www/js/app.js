// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('xylidieet', ['ionic', 'ngCookies', 'pickadate', 'xylidieet.controllers', 'xylidieet.directives', 'xylidieet.factories', 'xylidieet.configuration'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
  $httpProvider
	.defaults.withCredentials = true,
	
  $stateProvider

    .state('open', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/openmenu.html"
    })

    .state('open.index', {
      url: "/index",
      views: {
        'menuContent' :{
          templateUrl: "templates/index.html"
        }
      }
    })

    .state('open.register', {
      url: "/register",
      views: {
        'menuContent' :{
          templateUrl: "templates/register.html",
          controller: 'RegisterCtrl'
        }
      }
    })
	
    .state('open.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    })

    .state('closed', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/closedmenu.html",
	  controller: 'ClosedMenuCtrl'
    })
	
    .state('closed.products', {
      url: "/products",
      views: {
        'menuContent' :{
          templateUrl: "templates/products.html",
		  controller: 'ProductsCtrl'
        }
      }
    })

    .state('closed.diary', {
      url: "/diary",
      views: {
        'menuContent' :{
          templateUrl: "templates/diary.html",
		  controller: 'DiaryCtrl'
        }
      }
    })

    .state('closed.weight', {
      url: "/weight",
      views: {
        'menuContent' :{
          templateUrl: "templates/weight.html",
		  controller: 'WeightCtrl'
        }
      }
    })
	
    .state('closed.settings', {
      url: "/settings", 	
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html",
          controller: 'SettingsCtrl'
        }
      }
    })
	
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/index');
});