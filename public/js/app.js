/**
 * @ngdoc overview
 * @name myApp
 * @description
 * # myApp
 *
 * Main module of the application.
 */
angular.module('myApp', ['ngRoute'])
    .config(function($routeProvider) {
        //Define routes 
        $routeProvider
            .when('/', {
                //HTML content loaded 
                templateUrl: 'views/main.html',
                //controller use in the main page 
                controller: 'MainCtrl',
                //Alias for the controller
                controllerAs: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
