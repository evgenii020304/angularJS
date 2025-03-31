angular.module('NameApp', ['ngMaterial', 'ngAria', 'ngAnimate', 'ngRoute'])
    .config(function($mdThemingProvider, $routeProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('pink');

        $routeProvider
            .when('/name', {
                templateUrl: 'app/views/name-input.html',
                controller: 'NameInputController',
                controllerAs: '$ctrl'
            })
            .when('/chat', {
                templateUrl: 'app/views/chat.html',
                controller: 'ChatController',
                controllerAs: '$ctrl'
            })
            .otherwise({
                redirectTo: '/name'
            });
    });