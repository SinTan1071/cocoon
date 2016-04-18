/**
 * 后退指令
 * 提供模拟APP头部导航的后退功能
 */
define(['app'], function(app) {
  app.directive('back', function() {
    return {
      restrict: 'A',
      replace: true,
      scope: {},
      templateUrl: '',
      controller: ['$scope', function($scope) {

      }]
    };
  });
})
