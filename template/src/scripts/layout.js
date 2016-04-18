define([], function() {
  /*
  |--------------------------------------------------------------------------
  | 设置 HTML FONT SIZE
  |--------------------------------------------------------------------------
  |
  | 使用响应式布局，依赖rem单位，动态监听窗口大小，等比例缩放HTML字体大小。
  |
  */
  var base_width = 375;
  var max_width = 768;

  var getHtmlFontSize = function(base_width, max_width) {
    var screenWidth = window.innerWidth;
    if (screenWidth < max_width) {
      return window.innerWidth / base_width * 100;
    } else {
      return max_width / base_width * 100;
    }
  };

  var setHtmlFontSize = function() {
    var font_size = getHtmlFontSize(base_width, max_width) + 'px';
    document.documentElement.style.fontSize = font_size;
  }

  setHtmlFontSize();

  window.onresize = setHtmlFontSize;


});
