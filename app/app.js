'use strict';

// Declare app level module which depends on views, and components
angular.module('services', ['ui.bootstrap']);
angular.module('myApp', [
  'ngRoute',
  'angularSpinners',
  'smart-table',
  'myApp.view1',
  'myApp.view2',
  'myApp.users',
  'services',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
