/**
 * {{ name }} directive
 */
define(
    [
        'app'
    ],
    function (app) {

        app.directive('{{ name }}', function () {
            return {
                restrict: 'A',
                replace: true,
                scope: {},
                //templateUrl: '',
                link: function ($scope, $elem, $attrs) {

                }
            };
        });

    })
