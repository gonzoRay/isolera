'use strict';

// Declare app level module which depends on views, and components
angular.module('isolera', [
  'ngRoute',
  'isolera.view1',
  'isolera.view2'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
