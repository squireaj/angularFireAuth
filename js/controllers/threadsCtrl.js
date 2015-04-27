var app = angular.module('rtfmApp');

app.controller('threadsCtrl', function($scope, $location, user, threadsRef, $firebaseArray) {
  console.log(user);
  if(!user) {
    $location.path('/login');
  }
  $scope.threads = $firebaseArray(threadsRef);
  $scope.user = user;


  $scope.threads.$loaded().then(function(threads) {
    console.log(threads);
  });

  $scope.createThread = function(username, title) {
    $scope.threads.$add({
      username: user.name,
      title: title
    });
  };
});
