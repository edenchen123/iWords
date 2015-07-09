angular.module('todoController', [])
    .controller('mainController', ['$scope', '$http', 'Words', function ($scope, $http, Words) {
        $scope.formData={type:"synonyms"};
        $scope.getConWords = function(text){
            return Words.query(text).then(function(data){
                var words = data.data
                angular.forEach(words, function(w){
                    var word = w.word;
                    var explains = w.explain.substring(0,15);
                    w.wordFull = word + "("+explains+")";
                });
                return words;
            });
        };
        $scope.getConWord = function(text){
            return Words.get(text).then(function(data){
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
            if($scope.wordForm.$valid){
                $scope.getConWord(angular.lowercase($scope.formData.word)).then(function(existed){
                    if(existed && existed.length > 0){
                        alert($scope.formData.word + " is Existed!");
                    }else{
                        Words.create($scope.formData).success(function (data) {
                            $scope.formData={type:"synonyms"};
                            alert("Word Added!");
                        });
                    }
                });

            }
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