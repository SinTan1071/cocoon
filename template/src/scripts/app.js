define(['angularAMD', 'angularRoute', './layout'], function (angularAMD) {

    var app = angular.module("APP", ['ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$uiViewScrollProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider) {

        //用于改变state时跳至顶部
        $uiViewScrollProvider.useAnchorScroll();

        // 默认进入先重定向
        $urlRouterProvider.otherwise('404');

        // 路由定义
        // 主页
        $stateProvider
            .state('home', angularAMD.route({
                url: '/home',
                templateUrl: 'views/home.html',
                controllerUrl: 'controllers/home'
            }))
            .state('404', angularAMD.route({
                url: '/404',
                templateUrl: 'views/404.html'
            }));
    }]);

    return angularAMD.bootstrap(app);
});
