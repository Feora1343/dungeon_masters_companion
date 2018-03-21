myApp.controller('RegisterController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
    console.log('RegisterController created');
    var self = this;
    self.user = {
      username: '',
      password: ''
    };
    self.message = '';

    self.registerUser = function () {
      if (self.user.username === '' || self.user.password === '') {
        self.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', self.user);
        $http.post('/api/user/register', self.user).then(function (response) {
          console.log('success');
          $location.path('/user');
        },
          function (response) {
            console.log('error');
            self.message = "Something went wrong. Please try again."
          });
      }
    }
}]);