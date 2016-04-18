/**
 * ajax service
 *
 * author : 胡桂华
 * time   : 2016/03/09
 *
 * API调用需要传入额外的头部参数，判断请求的合法性，故对ajax请求封装成了此服务。
 * 函数提供了全局配置参数，提供给API升级时使用。
 *
 * TODO：请求方法中，应该传入第三个配置参数，可根据具体需求改写config。
 *
 */

define([
        'app',
        './bridge'
    ],
    function (app) {

        app.factory('ajax', ['$http', 'bridge', function ($http, bridge) {

            if (bridge.isApp()) {

                var host = location.protocol + '//' + location.host;
                // var app_id = bridge.sysPlatform().appID;
                var app_id = 'h5_2.4.0';
                var user_token = bridge.sysPlatform().userToken;

            } else {

                var host = 'http://10.7.30.223:7890';
                var app_id = 'h5_2.4.0';
                var user_token = 'ioRUeUWAadG4AMGdNN58zNQZTloxN26dW9XEwlSa';

            }

            var ajax = {
                config: {
                    timeout: 10000,
                    headers: {
                        'X-App-ID': app_id,
                        'X-User-Token': user_token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    }
                },
                /**
                 * get 请求
                 *
                 * @param  string url
                 * @param  object params
                 *
                 * @return $http
                 */
                get: function (url, params) {

                    ajax.config.method = 'get';
                    ajax.config.url = host + url;
                    ajax.config.params = params;

                    return $http(ajax.config);

                },
                /**
                 * post 请求
                 *
                 * @param  string url
                 * @param  object data
                 *
                 * @return $http
                 */
                post: function (url, data) {

                    data = data || {};

                    ajax.config.method = 'post';
                    ajax.config.url = host + url;
                    ajax.config.data = data;

                    return $http(ajax.config);
                }
            };

            return ajax;

        }]);
    });
