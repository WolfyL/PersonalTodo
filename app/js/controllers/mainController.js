angular.module('app')
    .controller('MainController', function($scope, listNowService, listLaterService, CurrentUser) {
        var userId = CurrentUser.user()._id;
        $scope.presentList = [];
        $scope.futureList = [];

        $scope.addNow = function() {
            $scope.presentList.push($scope.now);
            listNowService.create($scope.now, userId);
            $scope.now = '';
        };

        $scope.editNow = function(id) {
            $scope.editMe = true;
        };

        $scope.editNowDone = function(id, editValue) {
            $scope.presentList.splice(id, 1, editValue);
            $scope.editMe = false;
        };

        $scope.deleteNow = function(id) {
            $scope.presentList.splice(this.$index, 1);
        };

        $scope.addLater = function() {
            $scope.futureList.push($scope.later);
            listLaterService.create($scope.later, userId);
            $scope.later = '';
        };

        $scope.editLater = function(id) {
            $scope.editMe = true;
        };

        $scope.editLaterDone = function(id, editValue) {
            $scope.futureList.splice(id, 1, editValue);
            $scope.editMe = false;
        };

        $scope.deleteLater = function(id) {
            $scope.futureList.splice(id, 1);
        };
    });
