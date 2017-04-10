angular.module('app')
    .controller('MainController', function($scope, listNowService, listLaterService, CurrentUser) {
        var userId = CurrentUser.user()._id;
        $scope.presentList = [];
        $scope.futureList = [];
        $scope.tasksLater = [];
        $scope.editMeNow = [];
        $scope.editMeLater = [];

        $scope.addNow = function() {
            $scope.presentList.push($scope.now);
            listNowService.create($scope.now, userId);
            listNowService.getAll().then(function(res){
              $scope.tasksNow = res.data;
            });
            $scope.now = '';
        };

        $scope.editNow = function(index) {
            $scope.editMeNow[index] = true;
        };

        $scope.editNowDone = function(index, taskNow) {
            console.log($scope.tasksNow[index]._id);
            listNowService.update($scope.tasksNow[index]._id, taskNow).then(function(res) {
                console.log("Update success");
                listNowService.getAll().then(function(res) {
                    $scope.tasksNow = res.data;
                });
            }, function(err) {
                console.log("Update failed");
            });
            $scope.editMeNow[index] = false;
        };

        $scope.deleteNow = function(index, taskNow) {
            listNowService.delete(taskNow._id).then(function(res) {
                console.log("Delete success");
                listNowService.getAll().then(function(res) {
                    $scope.tasksNow = res.data;
                });
            }, function(err) {
                console.log("Delete failed");
            });
        };

        $scope.addLater = function() {
            $scope.futureList.push($scope.later);
            listLaterService.create($scope.later, userId);
            listLaterService.getAll().then(function(res) {
                $scope.tasksLater = res.data;
            });
            $scope.later = '';
        };

        $scope.editLater = function(index) {
            $scope.editMeLater[index] = true;
        };

        $scope.editLaterDone = function(index, taskLater) {
            console.log($scope.tasksLater[index]._id);
            listLaterService.update($scope.tasksLater[index]._id, taskLater).then(function(res) {
                console.log("Update success");
                listLaterService.getAll().then(function(res) {
                    $scope.tasksLater = res.data;
                });
            }, function(err) {
                console.log("Update failed");
            });
            $scope.editMeLater[index] = false;
        };

        $scope.deleteLater = function(index, taskLater) {
            console.log(taskLater);
            listLaterService.delete(taskLater._id).then(function(res) {
                console.log("Delete success");
                listLaterService.getAll().then(function(res) {
                    $scope.tasksLater = res.data;
                });
            }, function(err) {
                console.log("Delete failed");
            });
        };

        $scope.randomTaskLater = function() {
            var i = Math.floor(Math.random() * $scope.futureList.length);
            console.log(i);
            listLaterService.getAll().then(function(res) {
                $scope.taskToDo = $scope.futureList[i];
                console.log($scope.taskToDo);
            });
        };

        listNowService.getAll().then(function(res) {
            $scope.tasksNow = res.data;
            console.log(res.data);
        });

        listLaterService.getAll().then(function(res) {
            $scope.tasksLater = res.data;
            console.log(res.data);
        });
    });
