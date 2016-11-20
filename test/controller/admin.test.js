'use strict';

describe('Controller : MainCtrl', function() {
  
    // load the controller's module
    beforeEach( module('myApp'));
             
    var controller, scope;
 
    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('MainCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));    


    it('Controller should be defined', function() {
        expect(controller).toBeDefined();
        expect(scope).toBeDefined();
    });
});
