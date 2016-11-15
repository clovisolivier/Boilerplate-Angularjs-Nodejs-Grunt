/**
 * @ngdoc function
 * @name myApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
    // This file should be added on index.html
    .controller('MainCtrl', function($scope) {
        $scope.value = 'MainPage';
    });
