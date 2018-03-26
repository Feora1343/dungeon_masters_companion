const myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngAria', 'ngMessages', 'ngAnimate'])
  .controller('FabToolbar', function ($scope, $mdDialog) {
    $scope.isOpen = false;
    $scope.header = {
      isOpen: false,
      count: 0,
      selectedDirection: 'left'
    }

    $scope.changelogDialog = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/dialogs/changelog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      })
    };

    $scope.profileDialog = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/dialogs/profile.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      })
    };

    $scope.inspirationDialog = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/dialogs/inspiration.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      })
    };

    $scope.technologyDialog = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/dialogs/technology.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      })
    };

    $scope.aboutDialog = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/dialogs/about.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      })
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
    }

  })

  .controller('ManageCampaign', function ($scope, $mdDialog) {

    $scope.createCampaignDialog = function (ev) {
      $mdDialog.show({
        controller: CampaignDialogController,
        templateUrl: '/views/dialogs/createcampaign.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      })
    };

    $scope.createCharacterDialog = function (ev) {
      $mdDialog.show({
        controller: CampaignDialogController,
        templateUrl: '/views/dialogs/createcharacter.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen
      })
    };

    function CampaignDialogController($scope, $mdDialog) {
      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };
    }
    
    $scope.icons = [{
        value: 'Male Barbarian',
        image: './images/characters/barbarian_male_alive.gif'
      },
      {
        value: 'Female Barbarian',
        image: './images/characters/barbarian_female_alive.gif'
      },
      {
        value: 'Male Bard',
        image: './images/characters/bard_male_alive.gif'
      },
      {
        value: 'Female Bard',
        image: './images/characters/bard_female_alive.gif'
      },
      {
        value: 'Male Cleric',
        image: './images/characters/cleric_male_alive.gif'
      },
      {
        value: 'Female Cleric',
        image: './images/characters/cleric_female_alive.gif'
      },
      {
        value: 'Male Druid',
        image: './images/characters/druid_male_alive.gif'
      },
      {
        value: 'Female Druid',
        image: './images/characters/druid_female_alive.gif'
      },
      {
        value: 'Male Fighter',
        image: './images/characters/fighter_male_alive.gif'
      },
      {
        value: 'Female Fighter',
        image: './images/characters/fighter_female_alive.gif'
      },
      {
        value: 'Male Monk',
        image: './images/characters/monk_male_alive.gif'
      },
      {
        value: 'Female Monk',
        image: './images/characters/monk_female_alive.gif'
      },
      {
        value: 'Male Paladin',
        image: './images/characters/paladin_male_alive.gif'
      },
      {
        value: 'Female Paladin',
        image: './images/characters/paladin_female_alive.gif'
      },
      {
        value: 'Male Ranger',
        image: './images/characters/ranger_male_alive.gif'
      },
      {
        value: 'Female Ranger',
        image: './images/characters/ranger_female_alive.gif'
      },
      {
        value: 'Male Rogue',
        image: './images/characters/rogue_male_alive.gif'
      },
      {
        value: 'Female Rogue',
        image: './images/characters/rogue_female_alive.gif'
      },
      {
        value: 'Male Sorcerer',
        image: './images/characters/sorcerer_male_alive.gif'
      },
      {
        value: 'Female Sorcerer',
        image: './images/characters/sorcerer_female_alive.gif'
      },
      {
        value: 'Male Warlock',
        image: './images/characters/warlock_male_alive.gif'
      },
      {
        value: 'Female Warlock',
        image: './images/characters/warlock_female_alive.gif'
      },
      {
        value: 'Male Wizard',
        image: './images/characters/wizard_male_alive.gif'
      },
      {
        value: 'Female Wizard',
        image: './images/characters/wizard_female_alive.gif'
      }
    ];
  })

setTimeout(function () {
  var elem = document.getElementsByClassName('pevents__initial')
  elem[0].classList.remove('pevents__initial')
}, 2000);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', '$mdIconProvider', function ($routeProvider, $locationProvider, $mdIconProvider) {
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
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    // .when('/info', {
    //   templateUrl: '/views/templates/info.html',
    //   controller: 'InfoController as vm',
    //   resolve: {
    //     getuser: function (UserService) {
    //       return UserService.getuser();
    //     }
    //   }
    // })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);