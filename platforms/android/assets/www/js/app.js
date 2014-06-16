// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('xylidieet', ['ionic', 'ngCookies', 'pickadate', 'xylidieet.controllers', 'xylidieet.directives', 'xylidieet.factories'])

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

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
	  controller: 'MenuCtrl'
    })

    .state('app.index', {
      url: "/index",
      views: {
        'menuContent' :{
          templateUrl: "templates/index.html"
        }
      }
    })

    .state('app.diary', {
      url: "/diary",
      views: {
        'menuContent' :{
          templateUrl: "templates/diary.html",
		  controller: 'DiaryCtrl'
        }
      }
    })

    .state('app.weight', {
      url: "/weight",
      views: {
        'menuContent' :{
          templateUrl: "templates/weight.html",
		  controller: 'WeightCtrl'
        }
      }
    })
	
    .state('app.settings', {
      url: "/settings", 	
      views: {
        'menuContent' :{
          templateUrl: "templates/settings.html",
          controller: 'SettingsCtrl'
        }
      }
    })

    .state('app.register', {
      url: "/register",
      views: {
        'menuContent' :{
          templateUrl: "templates/register.html",
          controller: 'RegisterCtrl'
        }
      }
    })
	
    .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    });
	
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/index');
});