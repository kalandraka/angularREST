'use strict';

angular.module('myApp.users', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'templates/users/users.html',
            controller: 'usersCtrl'
        });
    }])

    .controller('usersCtrl', ['$scope', '$http', 'spinnerService', '$dialogs',
        function ($scope, $http, spinnerService, $dialogs) {
            $scope.loadUsers = function () {
                spinnerService.show('html5spinner');
                $http.get("http://localhost/symrest/web/app_dev.php/user")
                    .success(function (data) {
                        $scope.users = data;
                    })
                    .finally(function () {
                        spinnerService.hide('html5spinner');
                    });
            };

            $scope.deleteUserDialog = function (item) {
                $dialogs.areYouSure("Delete user", "Are you sure?")
                    .then(function () {
                        var config = {
                            headers: {
                                "content-type": "application/json"
                            }
                        };
                        $http.delete("http://localhost/symrest/web/app_dev.php/user/" + item.id, config)
                            .success(function (data) {
                                $scope.users.splice($scope.users.indexOf(item), 1);
                            });
                    });
            };

            $scope.editUserDialog = function (data_) {
                var title = "Edit user";
                var icon = "edit";
                if (data_ == undefined) {
                    data_ = {};
                    title = "Add user";
                    icon = "plus";
                }
                $dialogs.createUser(icon, title, data_)
                    .then(function () {
                        var config = {
                            headers: {
                                "content-type": "application/json"
                            }
                        };
                        if (data_.id == undefined) {
                            $http.post("http://localhost/symrest/web/app_dev.php/user/", data_, config)
                                .success(function (responseData) {
                                    $scope.users.push(responseData);
                                })
                                .catch(function (err) {

                                });
                        }
                        else
                            $http.put("http://localhost/symrest/web/app_dev.php/user/" + data_.id, data_, config)
                                .success(function (responseData) {
                                    var idx = $scope.users.indexOf(data_);
                                    $scope.users[idx]= (responseData);
                                })
                                .catch(function (err) {

                                });
                    });
            };

            $scope.loadUsers();
        }]);