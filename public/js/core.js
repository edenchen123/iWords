angular.module('scotchTodo', ['todoController', 'todoService', 'ui.bootstrap']).config(['$provide','$httpProvider', function($provide,$httpProvider){
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
        link: function(scope, elem, attrs) {
            setTimeout(function(){
                $(elem).waterfall({
                    colMinWidth: 300,
                    //defaultContainerWidth: 800,
                    autoresize: true
                })
            },500);
        }
    }
});
