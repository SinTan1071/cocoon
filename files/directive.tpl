/**
 * {{ name }} directive
 */
define(
    [
        'app',
        'css!{{ css_path }}'
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
