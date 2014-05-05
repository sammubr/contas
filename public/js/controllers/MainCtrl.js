var INTEGER_REGEXP = /^\-?\d+$/;
var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;

angular.module('MainCtrl', []).controller('MainController', function ($scope, Login) {
  $scope.tagline = 'Home';
})

  //focus diretive
  .directive('myFocus', function () {
    return {
      restrict: 'A',
      link    : function (scope, element, attr) {
        scope.$watch(attr.myFocus, function (n, o) {
          if (n != 0 && n) {
            element[0].focus();
          }
        });
      }
    };

  })//blur directive
  .directive('myBlur', function () {
    return {
      restrict: 'A',
      link    : function (scope, element, attr) {
        element.bind('blur', function () {
          //apply scope (attributes)
          scope.$apply(attr.myBlur);
          //return scope value for focusing to false
          scope.$eval(attr.myFocus + '=false');
        });
      }
    };
  })

  .directive('integer', function () {
    return {
      require: 'ngModel',
      link   : function (scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function (viewValue) {
          if (INTEGER_REGEXP.test(viewValue)) {
            // it is valid
            ctrl.$setValidity('integer', true);
            return viewValue;
          } else {
            // it is invalid, return undefined (no model update)
            ctrl.$setValidity('integer', false);
            return undefined;
          }
        });
      }
    };
  })

  .directive('smartFloat', function () {
    return {
      require: 'ngModel',
      link   : function (scope, elm, attrs, ctrl) {
        ctrl.$parsers.unshift(function (viewValue) {
          if (FLOAT_REGEXP.test(viewValue)) {
            ctrl.$setValidity('float', true);
            return parseFloat(viewValue.replace(',', '.'));
          } else {
            ctrl.$setValidity('float', false);
            return undefined;
          }
        });
      }
    };
  })