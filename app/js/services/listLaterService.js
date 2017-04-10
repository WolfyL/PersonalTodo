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
            update: function(id, elementLater) {
                return $http.put('/later/' + id, {elementLater : elementLater});
            },
            delete: function(id) {
                return $http.delete('/later/' + id);
            }
        };
    });
