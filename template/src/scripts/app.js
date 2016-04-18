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

        /**
         * 产品
         */
        $stateProvider
        // 项目详情
            .state('product-detail', angularAMD.route({
                url: '/product/detail?pid&status&date',
                templateUrl: 'views/product/detail.html',
                controllerUrl: 'controllers/product/detail'
            }))
            // 鲨鱼计划-产品条目
            .state('product-item', angularAMD.route({
                url: '/product/item?gid&pid',
                templateUrl: 'views/product/item.html',
                controllerUrl: 'controllers/product/item'
            }))
            // 投资记录
            .state('product-records', angularAMD.route({
                url: '/product/records?pid&status&date',
                templateUrl: 'views/product/records.html',
                controllerUrl: 'controllers/product/records'
            }))
            // 标的走势
            .state('product-gold-chart', angularAMD.route({
                url: '/product/gold/chart?gid&pid&status&date',
                templateUrl: 'views/product/gold_chart.html',
                controllerUrl: 'controllers/product/gold_chart'
            }))
            // 评论
            .state('product-comment', angularAMD.route({
                url: '/product/comment?pid',
                templateUrl: 'views/product/comment.html',
                controllerUrl: 'controllers/product/comment'
            }))
            // 投票
            .state('product-vote', angularAMD.route({
                url: '/product/vote?gid',
                templateUrl: 'views/product/vote.html',
                controllerUrl: 'controllers/product/vote'
            }))
            // 收益看板
            .state('product-board', angularAMD.route({
                url: '/product/board?begin_date',
                templateUrl: 'views/product/board.html',
                controllerUrl: 'controllers/product/board'
            }))
            // 产品描述
            .state('product-description', angularAMD.route({
                url: '/product/description?gid&pid&status',
                templateUrl: 'views/product/description.html',
                controllerUrl: 'controllers/product/description'
            }));


        /**
         * 资产
         */
        $stateProvider
        // 产品资产详情
            .state('property-product', angularAMD.route({
                url: '/property/product?gid&pid&property_id&trans_id',
                templateUrl: 'views/property/product.html',
                controllerUrl: 'controllers/property/product'
            }));

        /**
         * 落地页
         */
        $stateProvider
        // 产品资产详情
            .state('landing-novice', angularAMD.route({
                url: '/landing/novice',
                templateUrl: 'views/landing/novice.html',
                controllerUrl: 'controllers/landing/novice'
            }))
            // 安全保障
            .state('landing-safe', angularAMD.route({
                url: '/landing/safe',
                templateUrl: 'views/landing/safe.html',
                controllerUrl: 'controllers/landing/safe'

            }))
            // 了解投资大咖
            .state('landing-about', angularAMD.route({
                url: '/landing/about',
                templateUrl: 'views/landing/about.html',
                controllerUrl: 'controllers/landing/about'

            }))
            // 产品解读
            .state('landing-product', angularAMD.route({
                url: '/landing/product',
                templateUrl: 'views/landing/product.html',
                controllerUrl: 'controllers/landing/product'
            }))
            // 常见问题
            .state('landing-faq', angularAMD.route({
                url: '/landing/faq',
                templateUrl: 'views/landing/faq.html',
                controllerUrl: 'controllers/landing/faq'
            }))
            .state('landing-licence-account-safe', angularAMD.route({
                url: '/landing/licence/account-safe',
                templateUrl: 'views/landing/licences/account_safe.html',
                controllerUrl: 'controllers/landing/licences/account_safe'
            }))
            .state('landing-licence-funds-trusteeship', angularAMD.route({
                url: '/landing/licence/funds-trusteeship',
                templateUrl: 'views/landing/licences/funds_trusteeship.html',
                controllerUrl: 'controllers/landing/licences/funds_trusteeship'
            }))
            .state('landing-licence-personal-service', angularAMD.route({
                url: '/landing/licence/personal-service',
                templateUrl: 'views/landing/licences/personal_service.html',
                controllerUrl: 'controllers/landing/licences/personal_service'
            }))
            .state('landing-licence-shark-plan', angularAMD.route({
                url: '/landing/licence/shark-plan',
                templateUrl: 'views/landing/licences/shark_plan.html',
                controllerUrl: 'controllers/landing/licences/shark_plan'
            }))
            ;


    }]);

    // app.config(['$httpProvider', function ($httpProvider) {
    //     $httpProvider.interceptors.push(function () {
    //         var index;
    //         return {
    //             'request': function (config) {
    //                 index = layer.open({type: 2, shade: false});
    //                 return config;
    //             },
    //             'response': function (response) {
    //                 layer.close(index);
    //                 return response
    //             }
    //         };
    //     });
    // }]);


    return angularAMD.bootstrap(app);
});
