var app = angular.module('rtfmApp', ['firebase', 'ngRoute']);

app.constant('fb', {
  url: 'https://myforum.firebaseio.com/'
})
.run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    if(error === 'AUTH_REQUIRED') $location.path('/login');
  });
})
.config(function($routeProvider) {
  $routeProvider
  .when('/login',{
    templateUrl: 'js/templates/loginTmpl.html',
    controller: 'loginCtrl',
    resolve: {
      user: function(userService) {
        return userService.Auth().$waitForAuth();
      }
    }
  })
  .when('/threads', {
    templateUrl: 'js/templates/threadsTmpl.html',
    controller: 'threadsCtrl',
    resolve: {
      threadsRef: function(threadsService) {
        return threadsService.getThreads();
      },
      user: function(userService) {
        return userService.Auth().$waitForAuth();
      }
    }
  })
  .when('/threads/:threadId', {
    templateUrl: 'js/templates/singleThreadTmpl.html',
    controller: 'singleThreadCtrl',
    resolve: {
      threadRef: function(threadsService, $route) {
        return threadsService.getThread($route.current.params.threadId);
      },
      commentsRef: function(threadsService, $route) {
        return threadsService.getComments($route.current.params.threadId);
      },
      user: function(userService) {
        return userService.Auth().$waitForAuth();
      }
    }
  })
  .otherwise('/login');
});
