'use strict';

// Declare app level module which depends on views, and components
angular.module('connectIn', [
    'ngRoute',
    'connectIn.version',
    'connectIn.home',
    'ngStorage',
    'ui.bootstrap'
])
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })

    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        user: 'user',
        guest: 'guest'
    })


    .config(['$routeProvider', 'USER_ROLES', function ($routeProvider, USER_ROLES) {
        $routeProvider
            .when('/', {
                templateUrl: '../pages/login.html',
                controller: 'LoginController',
                access: { authorizedRoles: [USER_ROLES.all] }
            })
            .when('/login', {
                templateUrl: '../pages/login.html',
                controller: 'LoginController',
                access: { authorizedRoles: [USER_ROLES.all] }
            })
            .when('/home', {
                templateUrl: '../pages/home.html',
                controller: 'ProfileController',
                access: { authorizedRoles: [USER_ROLES.user, USER_ROLES.admin] }
            })
            .when('/not-authorized', {
                templateUrl: '../pages/not-authorized.html',
                access: { authorizedRoles: [USER_ROLES.all] }
            })
            .otherwise({
                redirectTo: '/login',
                access: { authorizedRoles: [USER_ROLES.all] }
            });
    }])

    .run(function ($rootScope, AUTH_EVENTS, AuthService, $location) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            var authorizedRoles = next.access.authorizedRoles;
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }
        });

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function (event, data) {
            $location.path('/home');
        });

        $rootScope.$on(AUTH_EVENTS.loginFailed, function (event, data) {
            alert("Login failed");
        });

        $rootScope.$on(AUTH_EVENTS.logoutSuccess, function (event, data) {
            $location.path('/');
        })
    })

    .service('Session', function ($window) {
        this.create = function (sessionId, userId, userRole) {
            $window.sessionStorage.sessionId = sessionId;
            $window.sessionStorage.user = userId;
            $window.sessionStorage.role = userRole;

        };
        this.destroy = function () {
            delete $window.sessionStorage.sessionId;
            delete $window.sessionStorage.user;
            delete $window.sessionStorage.role;
        };

        this.id = $window.sessionStorage.sessionId;
        this.user = $window.sessionStorage.user;
        this.role = $window.sessionStorage.role;

        return this;
    })

    .factory('AuthService', function ($http, Session) {
        var authService = {};

        authService.login = function (credentials) {
            return $http
                .post('signin', credentials)
                .then(function (res) {
                    Session.create(res.data.id, res.data.email, res.data.rol);
                    return res.data.email;
                });
        };

        authService.logout = function () {
            return $http
                .get('/signout', {
                    sesion_id: Session.id,
                    email: Session.user
                })
                .then(function (res) {
                    Session.destroy();
                });
        };

        authService.isAuthenticated = function () {
            return !!Session.user;
        };

        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.role) !== -1);
        };

        return authService;
    })

    .controller('ApplicationController', function ($scope, USER_ROLES, AuthService, Session) {
        $scope.currentUser = Session.user;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };

    })

    .controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, USER_ROLES, AuthService) {
        $scope.credentials = {
            username: '',
            password: ''
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

        $scope.logout = function () {
            AuthService.logout().then(
                function (res) {
                    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                    $scope.setCurrentUser('');
                }
            )
        }


    })

    .controller('SignupController', function ($scope, $rootScope, $http, $location, AuthService, AUTH_EVENTS) {
        $scope.credentials = {
            username: '',
            password: '',
            passwordVerify: ''
        };

        $scope.signup = function (credentials) {
            if (credentials.password != credentials.passwordVerify) {
                alert("Las contraseñas no coinciden");
            } else {
                $http.post('signup/', credentials)
                    .then(function (res) {
                        // Sign up was successful, proceeding to log in
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
    });