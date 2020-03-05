




  










$('.con_right .pagi').pagination({
    pageCount: 50, // 总页数
    current: 1, // 当前页
    jump: true,
    coping: true,
    homePage: '首页', // 首页按钮的文本
    endPage: '末页', // 末页按钮的文本
    prevContent: '上页',
    nextContent: '下页',
    callback: function (api) { // 当你切换页面的时候会触发
      // api.getCurrent() 获取当前是第几页
      console.log(api.getCurrent())
    }
  })  