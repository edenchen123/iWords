angular.module('todoController', [])

    .controller('mainController', ['$scope', '$http', 'Words', function ($scope, $http, Words) {
        $scope.formData={};
        Words.list().success(function (data) {
            $scope.words_groups_array = [];
            data.map(function (a) {
                tansform(a);
            });
            console.log($scope.words_groups_array);
            });
        function tansform(a){
            var existed =false;
            angular.forEach($scope.words_groups_array,function(v,i){
              if(a.groupId === v.gid){
                  existed = true;
                  v.words.push(a);
                  return -1;
              }
            });
            if(!existed){
                $scope.words_groups_array.push({gid:a.groupId,type: a.type,words:[a]});
            }

        };
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
                alert("Word Added!");
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