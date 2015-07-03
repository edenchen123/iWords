angular.module('scotchTodo', ['todoController', 'todoService', 'ui.bootstrap', 'akoenig.deckgrid']).config(['$provide','$httpProvider', function($provide,$httpProvider){
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

}]);
