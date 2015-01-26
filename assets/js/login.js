'use strict';

angular.module('connectIn.login', ['ngRoute'])

    .controller('SignupController', function($scope, $rootScope, $http, $location, AuthService, AUTH_EVENTS, USER_ROLES   ){
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



