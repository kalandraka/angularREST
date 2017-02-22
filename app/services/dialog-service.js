angular.module('services')
    .service('$dialogs', ['$uibModal', function ($uibModal) {
        this.createUser = function (icon, title, data_) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'templates/dialogs/change-user-dialog.html',
                size: 'sm',
                controller: dialog(function ($scope, $uibModalInstance) {
                    $scope.roles = ["Administrator", "User"];
                    $scope.title = title;
                    $scope.icon = icon;
                    $scope.nameText = data_.name;
                    $scope.passwordText = data_.password;
                    $scope.selectedRole = data_.role;
                    if($scope.selectedRole == undefined) {
                        $scope.selectedRole = "User";
                    }

                    $scope.roleSelected = function (role) {
                        $scope.selectedRole = role;
                    }

                    $scope.ok = function () {
                        if ($scope.userForm.$valid) {
                            $uibModalInstance.close();
                            data_.name = $scope.nameText;
                            data_.password = $scope.passwordText;
                            data_.role = $scope.selectedRole;
                        } else {
                            $scope.showValidation = true;
                        }
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }),
            }).result;
        };

        this.areYouSure = function (title, text) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'templates/dialogs/confirmation-dialog.html',
                size: 'sm',

                controller: dialog(function ($scope, $uibModalInstance) {
                    $scope.title = title;
                    $scope.text = text;
                    $scope.ok = function () {
                        $uibModalInstance.close('Yes');
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('No');
                    };
                }),
            }).result;
        };

        //utils
        function dialog(modalController) {
            modalController.$inject = ['$scope', '$uibModalInstance'];
            return modalController;
        }
    }]);