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
    }).when('/gearChecklistForm/',{
            controller: 'GearChecklistFormCtrl',
            templateUrl:'app/components/gearChecklist/gearChecklistForm/gearChecklistForm.html'
        })
        .when('/gearChecklistResults/:lat/:lon/:formattedAddress/:numberOfDays/:dateString',{
            controller: 'GearChecklistCtrl',
            templateUrl:'app/components/gearChecklist/gearChecklist.html'
        })
        .when('/explore/',{
            templateUrl:'app/components/exploreComingSoon/exploreComingSoon.html'
        })
        .when('/tours/',{
            controller: 'ToursCtrl',	
            templateUrl:'app/components/tours/tours.html'
        })
         .when('/tours/leh', {
             controller: 'LehCtrl',
            templateUrl: 'app/components/tours/leh/leh.html'
        })
         .when('/tours/leh/markhavalleytrek', {
             controller: 'MarkhaValleyTrekCtrl',
            templateUrl: 'app/components/tours/markhaTrek/markhaValleyTrek.html'
        })
        .when('/tours/leh/lehtourwithrafting', {
             controller: 'LehTourCtrl',
            templateUrl: 'app/components/tours/lehTour/lehTour.html'
        })
        .when('/tours/leh/stoklatrek', {
             controller: 'StokTrekCtrl',
            templateUrl: 'app/components/tours/stokTrek/stokTrek.html'
        })
        .when('/tours/leh/lehtour', {
             controller: 'LehTourAlternateCtrl',
            templateUrl: 'app/components/tours/lehTourAlternate/lehTourAlternate.html'
        })
        .when('/pageNotFound/',{
            controller: 'ErrorPageCtrl',
            templateUrl:'app/components/error/errorPage.html'
        })
        .otherwise({redirectTo : '/pageNotFound/'});
        // $locationProvider.html5Mode(true);
    });

})();
