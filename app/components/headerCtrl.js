(function () {
    'use strict';

    var app = angular.module('campture');

    app.controller('HeaderCtrl', ['$scope', '$cookies', '$rootScope', '$location', 'AccountService', controller]);
    function controller($scope, $cookies, $rootScope, $location, accountService) {
        //====== Scope Variables==========
        //================================
        //$rootScope.travelStyles;
        //$rootScope.topStates;
        //$rootScope.activities;

        $scope.topTags = [
        { tag: 'rafting', image_url: '/img/tags/rafting.png' },
        { tag: 'skiing', image_url: '/img/tags/skiing.png' },
        { tag: 'trekking', image_url: '/img/tags/trekking2.png' },
        { tag: 'hiking', image_url: '/img/tags/hiking.png'}];
        $scope.userObj = JSON.parse(JSON.stringify(Parse.User.current()));
        $scope.showTags = false;
        $rootScope.query = {};
        $rootScope.queryBy = '$';
        $rootScope.isPageHeaderLoaded = true;
        $(".header-elements").css("display", "k");
        $rootScope.loginWithFacebook = function () {
            if (!$rootScope.fbInit) return;
            if (!$rootScope.fbInit) return;

            Parse.FacebookUtils.logIn(null, {
                success: function (user) {
                    if (!user.existed()) {
                        accountService.getMyProfile().then(function (response) {
                            accountService.updateUserFacebookProfile(response, user.id, function (data) {
                                $scope.$apply(function () {
                                    if (data) {
                                        var x = data;
                                        $scope.userObj = JSON.parse(JSON.stringify(Parse.User.current()));
                                    }
                                });
                            });
                        });
                    }
                    else {
                        $scope.userObj = JSON.parse(JSON.stringify(Parse.User.current()));
                        $scope.$apply();
                    }
                    $location.path("/");
                },
                error: function (user, error) {
                    console.log("Cancelled");
                }
            });
        };
        $scope.loginToPost = function () {
            if (!$rootScope.fbInit) return;
            if (!$rootScope.fbInit) return;

            Parse.FacebookUtils.logIn(null, {
                success: function (user) {
                    if (!user.existed()) {
                        accountService.getMyProfile().then(function (response) {
                            accountService.updateUserFacebookProfile(response, user.id, function (data) {
                                if (data) {
                                    var x = data;
                                    $scope.userObj = JSON.parse(JSON.stringify(Parse.User.current()));
                                }
                            });
                        });
                    }
                    else {
                        $scope.userObj = JSON.parse(JSON.stringify(Parse.User.current()));
                    }
                    //$location.path("account/postTrip/");
                    $scope.$apply();
                },
                error: function (user, error) {
                    console.log("Cancelled");
                }
            });
        }

        $rootScope.logout = function () {
            Parse.User.logOut();
            $scope.userObj = undefined; //Parse.User.current();
            $location.path("/");
        };

        $rootScope.getCroppedTripImageUrl = function (url, transString) {
            try {
                if (!transString) {
                    transString = 'upload/c_fill,h_440,w_440/';
                }
                if (url) {
                    var arr = url.split('upload/');
                    var croppedUrl = arr[0] + transString + arr[1];
                }
            } catch (e) {
                console.log(e);
            }
            return croppedUrl;
        };

        $scope.searchTrips = function () {
            $location.path("/feed//" + $scope.query[$scope.queryBy]);
        }

        $scope.redirectToPost = function () {
            $location.path("account/postTrip");
            $scope.$apply();
        }
        $scope.redirectToExplore = function () {
            $location.path("/explore/");
            $scope.$apply();
        }
    };
})();