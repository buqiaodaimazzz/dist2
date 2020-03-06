
window.onload = function () {
    $('.con_left > li').click(function () {
    
    $(this)
      .toggleClass('active')
      .children('ol')
      .slideToggle()
      .parent()
      .siblings()
      .removeClass('active')
      .children('ol')
      .slideUp()
  })
  $('.con_left > li ol li').hover(function(){
      $(this)
      .addClass('content_active')
  },
  function () {
    $(this)
      .removeClass('content_active')
  }
  )





 

  var flag = true
  var list2 = []

  getList()
  function getList() {
    $.ajax({
      url: '../lib/json/list.json',
      dataType: 'json',
      success: function (res) {
        
        // 2. 渲染分页器
        $('.pagi').pagination({
          pageCount: Math.ceil(res.length / 12), // 总页数
          current: 1, // 当前页
          jump: true,
          coping: true,
          homePage: '首页', // 首页按钮的文本
          endPage: '末页', // 末页按钮的文本
          prevContent: '上页',
          nextContent: '下页',
          callback: function (api) { 
            // api.getCurrent() 获取当前是第几页
            let curr = api.getCurrent()

            // 根据是第几页, 从我的总数组里面筛选出一部分数据
            var list = res.slice((curr - 1) * 12, curr * 12)
           
            // 3-2. 每次使用分页器切换的时候渲染一次
            bindHtml(list)
          }
        })

        // 3. 先把第一页的数据渲染一次
        bindHtml(res.slice(0, 12))


        list2 = res
      }
    })
  }

  function bindHtml(list) {
    // console.log(list)
    // 根据 list 数组渲染页面就可以了

    let str = ''

    list.forEach(item => {
      str += `
        <li class="items" data-id="${item.id}">
            <p class="img"><img src="${item.list_img}" alt=""></p>
            <p class="info">
                <span class="title">${item.list_title}</span>
                <em>￥${item.list_collect}</em>
                <u>收藏： ${item.list_collect}</u>
                <i>${item.list_pay} 付款</i>
            </p>
        </li>
      `
    })

    $('.product').html(str)




    // 2. 事件委托的形式给每一个 li 添加点击事件
  $('.product').on('click', 'li', function () {
    // this 就是你点击的那一个 li
    // console.log(this)
    // 找到渲染这个 li 的数据
    // 从 list 数组里面找到这个数据
    // 点击 li 的时候, 拿到自己身上的 id 属性
    const id = $(this).data('id')
    // console.log(id)


    // 2. 去到 list 这个数组里面找到一个 id 对应的数据
    //   这个数据就是渲染这个 li 的数据
    let data = null
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        data = list[i]
        break
      }
    }
    // console.log(data) // 我要找到的渲染当前这个 li 的数据

    // 3. 把找到的数据存储到 localStorage 里面
    //   为了详情页面使用
    localStorage.setItem('goodsInfo', JSON.stringify(data))

    // 4. 跳转页面
    window.location.href = './detail.html'
  })
  }


 //  销量排序
  var sales = document.querySelector('.sales')
 
  sales.onclick = function () {
    // 让准备好的变量改变
    flag = !flag

    // 不管是什么都要把数组重组
    list2.sort(function (a, b) {
      if (flag === true) {
        return a.list_pay - b.list_pay
      } else {
        return b.list_pay - a.list_pay
      }
    })

    // console.log(list)

    $('.pagi').pagination({
      pageCount: Math.ceil(list2.length / 12), // 总页数
      current: 1, // 当前页
      jump: true,
      coping: true,
      homePage: '首页', // 首页按钮的文本
      endPage: '末页', // 末页按钮的文本
      prevContent: '上页',
      nextContent: '下页',
      callback: function (api) { // 当你切换页面的时候会触发
        let curr = api.getCurrent()
        // console.log(curr)
        var list = list2.slice((curr - 1) * 12, curr * 12)
        // 3-2. 每次使用分页器切换的时候渲染一次
        bindHtml(list)
      }
    })

    // 3. 先把第一页的数据渲染一次
    bindHtml(list2.slice(0, 12))
  } 



  //  价格排序
  var price = document.querySelector('.price')
 
  price.onclick = function () {
    // 让准备好的变量改变
    flag = !flag

    // 不管是什么都要把数组重组
    list2.sort(function (a, b) {
      if (flag === true) {
        return a.list_collect - b.list_collect
      } else {
        return b.list_collect - a.list_collect
      }
    })

    // console.log(list)

    $('.pagi').pagination({
      pageCount: Math.ceil(list2.length / 12), // 总页数
      current: 1, // 当前页
      jump: true,
      coping: true,
      homePage: '首页', // 首页按钮的文本
      endPage: '末页', // 末页按钮的文本
      prevContent: '上页',
      nextContent: '下页',
      callback: function (api) { // 当你切换页面的时候会触发
        let curr = api.getCurrent()
        // console.log(curr)
        var list = list2.slice((curr - 1) * 12, curr * 12)
        // 3-2. 每次使用分页器切换的时候渲染一次
        bindHtml(list)
      }
    })

    // 3. 先把第一页的数据渲染一次
    bindHtml(list2.slice(0, 12))
  } 


//  收藏排序
var collect = document.querySelector('.collect')
 
collect.onclick = function () {
  // 让准备好的变量改变
  flag = !flag

  // 不管是什么都要把数组重组
  list2.sort(function (a, b) {
    if (flag === true) {
      return a.list_collect - b.list_collect
    } else {
      return b.list_collect - a.list_collect
    }
  })

  // console.log(list)

  $('.pagi').pagination({
    pageCount: Math.ceil(list2.length / 12), // 总页数
    current: 1, // 当前页
    jump: true,
    coping: true,
    homePage: '首页', // 首页按钮的文本
    endPage: '末页', // 末页按钮的文本
    prevContent: '上页',
    nextContent: '下页',
    callback: function (api) { // 当你切换页面的时候会触发
      let curr = api.getCurrent()
      // console.log(curr)
      var list = list2.slice((curr - 1) * 12, curr * 12)
      // 3-2. 每次使用分页器切换的时候渲染一次
      bindHtml(list)
    }
  })

  // 3. 先把第一页的数据渲染一次
  bindHtml(list2.slice(0, 12))
} 

  
  











}

