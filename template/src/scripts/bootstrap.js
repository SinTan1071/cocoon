require.config({

    // 定义模块根路径
    baseUrl: "scripts",

    // 模块路径定义　　　　
    paths: {
        // 依赖库
        'zepto': './bower/zepto/zepto.min',
        'jquery': './bower/jquery/dist/jquery.min',
        'angular': './bower/angular/angular',
        'angularAMD': './bower/angularAMD/angularAMD.min',
        'angularRoute': './bower/angular-ui-router/release/angular-ui-router.min',
        // 启动模块
        'app': './app',
        'url': './services/url',
        'ajax': './services/ajax',
        'bridge': './services/bridge',
        'typing': './services/typing',
        'storage': './services/storage',
        'message': './services/message',

    },

    // 预加载模块
    map: {
        '*': {
            'css': 'bower/require-css/css.min'
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
            deps: ['angular']
        },
        'angularRoute': {
            deps: ['angular']
        }
    },

    // 路由时间戳：防止缓存,开发时使用
    urlArgs: 'timestamp=' + (new Date()).getTime(),
    
    waitSeconds: 15,

});

// 启动程序
define(['app', 'typing', 'ajax']);