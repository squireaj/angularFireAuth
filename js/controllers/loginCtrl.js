var app = angular.module('rtfmApp');

app.controller('loginCtrl', function($scope, $location, $firebaseAuth, $firebaseObject, fb, userService, user) {
  var firebaseEndpoint = 'https://myforum.firebaseio.com/';
  $scope.auth = userService.Auth();

  $scope.auth.$onAuth(function(authData) {
    $scope.authData = authData;
    if(authData) {
      var user = $firebaseObject(new Firebase(firebaseEndpoint + '/users/' + authData.uid));
      user.$bindTo($scope, 'user');

      user.$loaded().then(function(user) {
        if(!user.email) {
          user.email = authData.password.email;
          console.log(user);
          user.$save();
        }
      });
    } else if($scope.user) {
      delete $scope.user;
    }
  });

  $scope.register = function(userEmail, userPassword, username) {
    user.name = username;
    userService.register(user);
  };

  $scope.login = function(userEmail, userPassword) {
    userService.login(userEmail, userPassword)
      .then(function(authData) {
        console.log('Logged in as:', authData.uid);
        $location.path('/threads');
      }).catch(function(error) {
        console.error('Error:', error);
      });
  };


  // $scope.login = function(userEmail, userPassword) {
  //   userService.login(username);
  //     $location.path('/threads');
  // };
});
