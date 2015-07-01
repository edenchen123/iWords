angular.module('scotchTodo', ['todoController', 'todoService', 'ui.bootstrap']).config(['$provide',function($provide){
    $provide.factory('vipHttpErrorInterceptor', function ($q, logger, $injector) {
        var rootScope;
        return {
            'responseError': function (response) {
                if (response.status == 403) {
                    window.location.href = "login.html?";
                }
                return $q.reject(response);
            }
        };

    });

}]);
