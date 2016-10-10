angular.module('myApp', ['ngRoute'])
.config(function($routeProvider) {
            $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'Admin2Ctrl',
                controllerAs: 'ConfigProduitsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
});