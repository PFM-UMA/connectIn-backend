'use strict';

angular.module('connectIn.login', ['ngRoute'])

    .controller('LoginCtrl', function ($scope, $rootScope, AUTH_EVENTS, USER_ROLES, AuthService) {
        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };

        $scope.login = function (credentials) {
            AuthService.login(credentials).then(
               function (user) {
                    // LOGIN SUCCEEDED
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.setCurrentUser(user);
            }, function () {
                    // LOGIN FAILED
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
        };
    })

    .controller('SignupCtrl', function($scope, $rootScope, $http, $location, AuthService, AUTH_EVENTS, USER_ROLES   ){
        $scope.credentials = {
            username: '',
            password: '',
            passwordVerify: ''
        };

        $scope.signup = function(credentials){
            if (credentials.password != credentials.passwordVerify){
                alert("Las contraseñas no coinciden");
            }else {
                $http.post('signup/', credentials)
                    .then(function(res){
                        AuthService.login(credentials).then(
                            function (user) {
                                // LOGIN SUCCEEDED
                                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                            }, function () {
                                // LOGIN FAILED
                                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                            });
                    })
            }
        }
    })



