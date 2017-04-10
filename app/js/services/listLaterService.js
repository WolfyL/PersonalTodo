angular.module('app')
    .service('listLaterService', function($http) {
        return {
            getAll: function() {
                return $http.get('/later');
            },
            getOne: function(id) {
                return $http.get('/later/' + id);
            },
            create: function(elementLater, userId) {
                return $http.post('/later/', {elementLater : elementLater, user : userId});
            },
            update: function(id, user) {
                return $http.put('/later/' + id, user);
            },
            delete: function(id) {
                return $http.delete('/later/' + id);
            }
        };
    });
