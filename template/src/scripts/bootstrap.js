require.config({

    // 定义模块根路径
    baseUrl: "scripts",

    // 模块路径定义　　　　
    paths: {

        // 依赖库
        'zepto': 'vendor/zepto/zepto.min',
        'jquery': 'vendor/jquery/dist/jquery.min',
        'angular': 'vendor/angular/angular',
        'angularAMD': 'vendor/angularAMD/angularAMD.min',
        'angularRoute': 'vendor/angular-ui-router/release/angular-ui-router.min',
        'text' : 'vendor/requirejs-plugins/lib/text',
        'json': 'vendor/requirejs-plugins/src/json',

        // 启动模块
        'app': './app',
        'url': './services/url',
        'ajax': './services/ajax',
        'bridge': './services/bridge',
        'typing': './services/typing',
        'storage': './services/storage',
        'message': './services/message'

    },

    // 预加载模块
    map: {
        '*': {
            'css': 'vendor/require-css/css.min'
        }
    },

    // 非AMD规范库特征定义
    shim: {
        'zepto': {
            exports: '$'
        },
        'angular': {
            exports: 'angular'
        },
        'angularAMD': {
            deps: ['angularRoute']
        },
        'angularRoute': {
            deps: ['angular']
        }
    },

    // 路由时间戳：防止缓存,开发时使用
    urlArgs: 'timestamp=' + (new Date()).getTime(),

    // 请求超时
    waitSeconds: 15

});

// 启动程序
define(['app'],function (app) {
    app.run();
});