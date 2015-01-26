'use strict';

// Declare app level module which depends on views, and components
angular.module('connectIn', [
    'ngRoute',
    'connectIn.version',
    'connectIn.home',
    'connectIn.login',
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
            .when('/home',{
                templateUrl: '../pages/home.html',
                controller: 'ProfileController',
                access: { authorizedRoles: [USER_ROLES.user, USER_ROLES.admin] }
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

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, data){
            $location.path('/home');
        });

        $rootScope.$on(AUTH_EVENTS.loginFailed, function(event, data){
            alert("Login failed");
        });
    })

    .service('Session', function ($localStorage) {
        this.create = function (sessionId, userId, userRole) {
            this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
        };
        this.destroy = function () {
            this.id = null;
            this.userId = null;
            this.userRole = null;
        };
        return this;
    })

    .factory('AuthService', function ($http, Session) {
        var authService = {};

        authService.login = function (credentials) {
            return $http
                .post('signin', credentials)
                .then(function (res) {
                    Session.create(res.data.id, res.data.email,
                        res.data.rol);
                    return res.data.user;
                });
        };

        authService.isAuthenticated = function () {
            return !!Session.userId;
        };

        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
                authorizedRoles.indexOf(Session.userRole) !== -1);
        };

        return authService;
    })

    .controller('LoginController', function ($scope, $rootScope, AUTH_EVENTS, USER_ROLES, AuthService, Session, $localStorage) {
        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.$session = $localStorage;

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
                    $scope.setCurrentUser(user);
                    $scope.setCurrentSession(Session)
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                }, function () {
                    // LOGIN FAILED
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });
        };

        $scope.$session = {
            id : Session.id,
            userId : Session.userId,
            role : Session.userRole
        };

        $scope.setCurrentSession = function(newSession) {
            $scope.$session = newSession;
        }
    })