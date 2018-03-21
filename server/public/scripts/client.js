const myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngAria', 'ngMessages', 'ngAnimate'])
  .controller('FabToolbar', function($scope, $mdDialog) {
    $scope.isOpen = false;
    $scope.header = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
    }
    $scope.changelogDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/dialogs/changelog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })
    };

    $scope.profileDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/dialogs/profile.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })
    };

    $scope.inspirationDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/dialogs/inspiration.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })
    };

    $scope.technologyDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/dialogs/technology.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })
    };

    $scope.aboutDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/dialogs/about.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
  
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
  
      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }
  })

  setTimeout(function() {
    var elem = document.getElementsByClassName('pevents__initial')
    elem[0].classList.remove('pevents__initial')
    }, 2000);

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