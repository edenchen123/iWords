angular.module('todoController', [])

    .controller('mainController', ['$scope', '$http', 'Words', function ($scope, $http, Words) {

        Words.list().success(function (data) {
                $scope.words = data;
            });
        $scope.getConWords = function(text){
           return Words.query(text).then(function(data){
                return data.data;
            });
        };
        $scope.createWord = function () {
            if($scope.formData.conWord){
                $scope.formData.groupId = $scope.formData.conWord.groupId;
                $scope.formData.type = $scope.formData.conWord.type;
            }else{
                $scope.formData.groupId = $scope.formData.word + "_" + Math.floor((Math.random() * 10000000000) + 1);
            }
            //todo user name
            Words.create($scope.formData).success(function (data) {
                    $scope.formData = {};
            });
        };


        //// DELETE ==================================================================
        //// delete a todo after checking it
        //$scope.deleteTodo = function (id) {
        //    $scope.loading = true;
        //
        //    Todos.delete(id)
        //        // if successful creation, call our get function to get all the new todos
        //        .success(function (data) {
        //            $scope.loading = false;
        //            $scope.todos = data; // assign our new list of todos
        //        });
        //};
    }]);