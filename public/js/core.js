angular.module('scotchTodo', ['ngRoute','todoController', 'todoService', 'ui.bootstrap',])
    .config(['$provide', '$httpProvider', '$routeProvider', '$locationProvider', function ($provide, $httpProvider, $routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'home.html',
                controller:function($scope,words){
                    $scope.words_groups_array = [];
                    words.data.map(function (a) {
                        tansform(a,$scope.words_groups_array);
                    });
                },
                resolve: {
                    words: function (Words) {
                        return Words.list();
                    }
                }
            })
            .when('/create', {
                templateUrl: 'create.html',
                controller:'mainController'

            }).when('/admin', {
                templateUrl: 'admin.html',
                controller:function($scope,words,Words){
                    $scope.words_groups_array = [];
                    words.data.map(function (a) {
                        tansform(a,$scope.words_groups_array);
                    });
                    $scope.remove = function(w){
                        var r = confirm("Delete "+ w.word+"?");
                        if (r == true) {
                            Words.delete(w._id).success(function(words){
                                $scope.words_groups_array = [];
                                words.map(function (a) {
                                    tansform(a,$scope.words_groups_array);
                                });
                                alert("Word deleted!");
                            });
                        }
                    }
                },
                resolve: {
                    words: function (Words) {
                        return Words.list();
                    }
                }
            }).otherwise({redirectTo: '/home'});

        //$locationProvider.html5Mode(true);
        $provide.factory('myHttpErrorInterceptor', function ($q) {
            return {
                'responseError': function (response) {
                    if (response.status == 403) {
                        window.location.href = "login.html";
                    }
                    return $q.reject(response);
                }
            };

        });
        $httpProvider.interceptors.push('myHttpErrorInterceptor');

    }]).directive('waterFall', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                setTimeout(function () {
                    $(elem).waterfall({
                        colMinWidth: 300,
                        //defaultContainerWidth: 800,
                        autoresize: true
                    })
                }, 500);
            }
        }
    }).directive("menuHighLighter", [function () {
    return {
        link: function (scope, element, attributes) {
            var iPath = element.find("a")[0].hash;
            scope.$on('$locationChangeSuccess',function(){
                element.removeClass('active');
                var locationPath = window.location.hash;
                if(locationPath.indexOf(iPath) > -1){
                    element.addClass('active');
                }
            });
        }
    }
}]);

function tansform(a,words_groups_array){
    var existed =false;
    angular.forEach(words_groups_array,function(v,i){
        if(a.groupId === v.gid){
            existed = true;
            v.words.push(a);
            return -1;
        }
    });
    if(!existed){
        words_groups_array.push({gid:a.groupId,type: a.type,words:[a]});
    }
};
