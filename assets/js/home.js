'use strict';

angular.module('connectIn.home', ['ngRoute', 'ui.bootstrap'])

    .controller('ProfileController', function ($scope, $http, $window, $modal) {
        $scope.user = {
            name: 'John',
            surname: 'Doe',
            sex: 'Male',
            age: '25',
            education: '',
            location: 'Málaga',
            summary: '',
            experience: '',
            skills: [
                'NodeJS', 'Java', 'SailsJS', 'AngularJS'
            ],
            avatar: 'http://yonicooperberg.com/wp-content/uploads/2014/08/John-Doe_avatar_1407830200.jpg',
        };

        $http.get('usuario/' + $window.sessionStorage.user)
            .then(function (res) {
                $scope.user = res.data.profile;
            });

        $scope.updateUserInfo = function (newUser) {
            $scope.user = newUser;
        };

        $scope.edit = function (){
            var modalInstance = $modal.open({
                templateUrl: 'dialogs/edit-profile.html',
                controller: 'EditProfileController',
                size: 'lg',
                backdrop: 'false',
                resolve: {
                    user: function () {
                        return $scope.user;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                // modal dismissed
            });

        };
    })

    .controller('EditProfileController',  function ($scope, $http, $modalInstance, user) {

        $scope.user = user;

        $scope.ok = function(){
            // Enviar form
            $http.post('usuario/' + $scope.user.email, $scope.user)
                .then(function (res) {
                    $scope.user = res.data.profile;
                });

            // Cerrar modal
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });