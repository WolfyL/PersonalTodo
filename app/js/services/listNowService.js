angular.module('app')
    .service('listNowService', function($http) {
        return {
            getAll: function() {
                return $http.get('/now');
            },
            getOne: function(id) {
                return $http.get('/now/' + id);
            },
            create: function(elementNow, userId) {
                return $http.post('/now/', {elementNow : elementNow, user : userId});
            },
            update: function(id, user) {
                return $http.put('/now/' + id, user);
            },
            delete: function(id) {
                return $http.delete('/now/' + id);
            }
        };
    });
