angular.module('inkgps.services', [])



.factory('Scopes', function ($rootScope) {

    var mem = {};
 
    return {
        store: function (key, value) {
            console.log("registrado" + value );
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
});



