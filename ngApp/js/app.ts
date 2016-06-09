'use strict';
namespace app {
  angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap'])
    .config((
    $stateProvider: ng.ui.IStateProvider,
    $httpProvider: ng.IHttpProvider,
    $locationProvider: ng.ILocationProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider) => {

    $stateProvider.state('Home', {
      url: '/',
      templateUrl: '/templates/home.html',
      controller: 'HomeController',
      controllerAs: 'vm',
    }).state('Plants', {
      url: '/plants',
      templateUrl: '/templates/plants.html',
      controller: 'PlantUpdateController',
      controllerAs: 'vm',
      data: {
        authorization: true,
        redirectTo: 'Home'
      }
    }).state('PlantsAdd', {
      url: '/plants_add',
      templateUrl: '/templates/plants_add.html',
      controller: 'PlantAddController',
      controllerAs: 'vm',
      data: {
        authorization: true,
        redirectTo: 'Home'
      }
    }).state('Harvests', {
      url: '/harvests',
      templateUrl: '/templates/harvests.html',
      controller: 'HarvestController',
      controllerAs: 'vm',
      data: {
        authorization: true,
        redirectTo: 'Home'
      }
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('AuthInterceptor');
  });
  
}
