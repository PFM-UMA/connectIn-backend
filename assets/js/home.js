'use strict';

angular.module('connectIn.home', ['ngRoute', 'ui.bootstrap'])

    .controller('ProfileController', function ($scope, $http, $window, $modal) {
        $scope.user = null;
        $scope.invitaciones = null;

        $http.get('usuario/' + $window.sessionStorage.user)
            .then(function (res) {
                $scope.user = res.data.profile;
                $scope.invitaciones = res.data.invitaciones
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
                // Modal succeeded
            }, function () {
                // modal dismissed

            });

        };

        $scope.showInvitations = function (){
            var modalInstance = $modal.open({
                templateUrl: 'dialogs/show-invitations.html',
                controller: 'ShowInvitationsController',
                size: 'md',
                backdrop: 'false',
                resolve: {
                    user: function () {
                        return $scope.user;
                    },
                    invitaciones: function () {
                        return $scope.invitaciones;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                // Modal succeeded
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
    })

    .controller('ShowInvitationsController',  function ($scope, $http, $modalInstance, user, invitaciones) {

        $scope.user = user;
        $scope.invitaciones = [];

        var getUserData = function (email) {
            return $http.get('usuario/' + $scope.user.email)
                .then(function (res) {
                    return res.data.profile;
                });
        }

        var i;
        for (i = 0; i < invitaciones.length; i++){
            $http.get('usuario/' + invitaciones[i].email)
                .then(function (res) {
                    $scope.invitaciones.push({profile : res.data.profile});
                });
        }

        $scope.accept = function(pendingUser){
            // Enviar form
            $http.post('/usuario/acceptInvitation/' + $scope.user.email + '/' + pendingUser)
                .then(function (res) {
                    $scope.user = getUserData($scope.user.email);
                });

        };

        $scope.refuse = function(pendingUser){
            // Enviar form
            $http.post('/usuario/refuseInvitation/' + $scope.user.email + '/' + pendingUser)
                .then(function (res) {
                    $scope.user = res.data.profile;
                });
        };

        $scope.cancel = function () {
            $modalInstance.close();
        };
    })

    .directive('onKeyDown', function () {
        return function (scope, element, attrs) {
            var numKeysPress=0;
            element.bind("keydown keypress", function (event) {
                numKeysPress++;
                if(numKeysPress>=3){
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });;