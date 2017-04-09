angular.module('app')
    .controller('MainController', function($scope) {

        $scope.presentList = [];
        $scope.futureList = [];

        $scope.addNow = function() {
            $scope.presentList.push($scope.now);
            $scope.now = '';
        };

        $scope.editNow = function(id) {
          $scope.editMe = true;
        };

        $scope.editNowDone = function(id, editValue){
          $scope.presentList.splice(id, 1, editValue);
          $scope.editMe = false;
        };

        $scope.deleteNow = function(id) {
            $scope.presentList.splice(this.$index, 1);
        };

        $scope.addLater = function() {
            $scope.futureList.push($scope.later);
            $scope.later = '';
        };

        $scope.editLater = function(id) {
          $scope.editMe = true;
        };

        $scope.editLaterDone = function(id, editValue){
          $scope.futureList.splice(id, 1, editValue);
          $scope.editMe = false;
        };

        $scope.deleteLater = function(id) {
            $scope.futureList.splice(id, 1);
        };
    });
