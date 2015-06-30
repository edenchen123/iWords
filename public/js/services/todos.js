angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Words', ['$http',function($http) {
		return {
			query : function(text) {
				return $http.get('/api/words/'+text);
			},
			list : function() {
				return $http.get('/api/words');
			},
			create : function(todoData) {
				return $http.post('/api/word', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/word/' + id);
			}
		}
	}]);