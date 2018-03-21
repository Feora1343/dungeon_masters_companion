const myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngAria', 'ngMessages', 'ngAnimate'])
  .controller('FabToolbar', function($scope, $mdDialog) {
    $scope.isOpen = false;
    $scope.header = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
    }
  })

  setTimeout(function() {
    var elem = document.getElementsByClassName('pevents__initial')
    elem[0].classList.remove('pevents__initial')
    }, 2000);
  // $scope.showAlert = function(ev) {
  //   // Appending dialog to document.body to cover sidenav in docs app
  //   // Modal dialogs should fully cover application
  //   // to prevent interaction outside of dialog
  //   $mdDialog.show(
  //     $mdDialog.alert()
  //       .parent(angular.element(document.querySelector('#popupContainer')))
  //       .clickOutsideToClose(true)
  //       .title('This is an alert title')
  //       .textContent('You can specify some description text in here.')
  //       .ariaLabel('Alert Dialog Demo')
  //       .ok('Got it!')
  //       .targetEvent(ev)
  //   );
  // };
/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', '$mdIconProvider', function($routeProvider, $locationProvider, $mdIconProvider) {
  console.log('myApp -- config')
  $mdIconProvider
            .defaultFontSet('FontAwesome')
            .fontSet('fa', 'FontAwesome');
  $routeProvider
    .when('/', {
      redirectTo: 'home',
    })
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);
