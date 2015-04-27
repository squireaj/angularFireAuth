var app = angular.module('rtfmApp');

app.service('userService', function(fb, $q, $firebaseAuth, $firebaseObject) {
  var ref = new Firebase('https://myforum.firebaseio.com/');
  var authObj = $firebaseAuth(ref);

  this.Auth = function() {
    return authObj;
  };

  this.register = function(userObj) {
    authObj.$createUser({
      email: userObj.email,
      password: userObj.password
    }).then(function(userData) {
      console.log('user' + userData + ' created successfully');

      return authObj.$authWithPassword({
        email: userEmail,
        password: userPassword
      }).then(function(authData) {
        var userData = new Firebase('https://myforum.firebase.io.com/users/' + authData.uid)
          authData.name = userObj.name;

        }).catch(function(error) {
          console.error('Error: ', error);
        });
    });
  };

  this.login = function(userEmail, userPassword) {
    return authObj.$authWithPassword({
      email: userEmail,
      password: userPassword
    });
  };

  this.getUser = function() {
    return user;
  };

  this.isLoggedIn = function(user) {
    if(!user.name) {
      return 'redirect to login';
    }
  };

});
