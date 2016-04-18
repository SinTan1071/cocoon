require.config({

    // 定义模块根路径
    baseUrl: "scripts",

    // 模块路径定义　　　　
    paths: {
        // 依赖库
        'jquery': './bower/jquery/dist/jquery.min',
        'zepto': './bower/zepto/zepto.min',
        'angular': './bower/angular/angular',
        'angularAMD': './bower/angularAMD/angularAMD.min',
        'angularRoute': './bower/angular-ui-router/release/angular-ui-router.min',
        'layerMobile': './bower/layer/mobile/layer.m',
        'chart': './bower/Chart.js/Chart',
        'pdfobject': './bower/pdfobject/pdfobject.min',
        // 启动模块
        'app': './app',
        // 服务
        'url': './services/url',
        'ajax': './services/ajax',
        'bridge': './services/bridge',
        'typing': './services/typing',
        'storage': './services/storage',
        'message': './services/message',
        // 指令
        'property-tip': './directives/property_tip'
    },

    // 预加载模块
    map: {
        '*': {
            'css': 'bower/require-css/css.min'
        }
    },
    // 非AMD规范库特征定义
    shim: {
        'chart.js': {
            exports: 'Chart'
        },
        'zepto': {
            exports: '$'
        },
        'pdfobject': {
            exports: 'PDFObject'
        },
        'angular': {
            exports: 'angular'
        },
        'angularAMD': {
            deps: ['angular']
        },
        'angularRoute': {
            deps: ['angular']
        },
        'layerMobile': {
            exports: 'layer'
        }
    },

    // 路由时间戳：防止缓存,开发时使用
    urlArgs: 'timestamp=' + (new Date()).getTime(),
    // urlArgs: 'version=0.17',

    waitSeconds: 15,

    // 启动程序
    // deps: ['app']
});


define(['app', 'typing', 'ajax'], function () {
    //  启动项目
})