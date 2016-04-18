/**
 * storage service
 *
 * @author 古月
 */
define(['app'], function(app) {

  app.factory('storage', function() {

    var cookie = {

      /**
       * 设置 cookie
       *
       * @param  string       name       cookie的属性名
       * @param  string       value      cookie的属性值
       * @param  [Number|100] cycle      cookie的生命周期
       */
      set: function(name, value, cycle) {
        var expires = "";
        if (!this.isEmpty(cycle)) {
          var maxCycle = new Date();
          maxCycle.setTime(maxCycle.getTime() + cycle * 1000);
          expires = ";expires=" + maxCycle.toGMTString();
        }
        document.cookie = name + "=" + escape(value) + expires;
      },
      /**
       * 获取 cookie
       *
       * @param  string name cookie 属性名
       * @return string      cookie值
       */
      get: function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
          return unescape(arr[2]);
        } else {
          return null;
        }
      },
      /**
       * 删除 cookie
       *
       * @param string name   cookie的属性名
       */
      delete: function(name) {
        var endCycle = new Date();
        endCycle.setTime(endCycle.getTime() - 1);
        var delValue = this.getCookie(name);
        document.cookie = name + "=" + delValue + ";expires=" + endCycle.toGMTString();
      }
    };

    var storage = {
      cookie: cookie,
      set: function(key, value) {
        localStorage.setItem(key, value);
      },
      remove: function(key) {
        localStorage.removeItem(key);
      },
      get: function(key) {
        return localStorage[key];
      },
      isSet:function(key){
        return localStorage[key] != 'undefined';
      }
    };

    return storage;
  });

});
