(function () {
    'use strict';
    var app = angular.module('campture');
    app.config(function ($httpProvider, $routeProvider, $locationProvider) {
        // attach our auth interceptor to the http requests
        //$httpProvider.interceptors.push('AuthInterceptor');
        $routeProvider

    .when('/', {
        controller: 'TempLandingCtrl',
        templateUrl: 'app/components/tempLanding/tempLanding.html'
    })
        .when('/gearChecklist/',{
            controller: 'GearChecklistCtrl',
            templateUrl:'app/components/gearChecklist/gearChecklist.html'
        })
        .when('/pageNotFound/',{
            controller: 'ErrorPageCtrl',
            templateUrl:'app/components/error/errorPage.html'
        })
        .otherwise({redirectTo : '/pageNotFound/'});
    });

})();
