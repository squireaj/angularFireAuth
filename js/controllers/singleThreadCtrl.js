var app = angular.module('rtfmApp');

app.controller('singleThreadCtrl', function($scope, $location, user, threadRef, commentsRef, $firebaseObject, $firebaseArray) {
  var thread = $firebaseObject(threadRef);
  $scope.user = user;
  if(!user) {
    $location.path('/login');
  }

  thread.$loaded().then(function(thread) {
    console.log(thread);
  });

  thread.$bindTo($scope, 'thread');

  $scope.comments = $firebaseArray(commentsRef);

  $scope.comments.$loaded().then(function(comments) {
    console.log(comments);
  });

  $scope.createComment = function(username, text) {
    $scope.comments.$add({
      username: $scope.user.name,
      text: text
    });
  };
});
