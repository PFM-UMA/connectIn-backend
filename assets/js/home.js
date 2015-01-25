'use strict';

angular.module('connectIn.home', ['ngRoute'])


    .controller('ProfileController', ['$scope', function ($scope) {
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

        $scope.updateUserInfo = function (newUser) {
            $scope.user = newUser;
        };

    }]);