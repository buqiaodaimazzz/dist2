
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

  var sales = document.querySelector('.content .sales')
  var price = document.querySelector('.content .price')
  var collect = document.querySelector('.content .collect')
    sales.onclick = function () {
      list_data.sort(function(a,b){
        return b.list_pay  - a.list_pay
      })

      var product = document.querySelector('.product')

      var list_datas = list_data.map(function(item,index) {
          return`
          <li class="items" idx="${item.id}">
              <p class="img"><img src="${item.list_img}" alt=""></p>
              <p class="info">
                  <span class="title">${item.list_title}</span>
                  <em>￥${item.list_price}</em>
                  <u>收藏 ：${item.list_collect}</u>
                  <i>${item.list_pay} 付款</i>
              </p>
          </li>
          `
      }).join("")
    
      product.innerHTML = list_datas
    }

    price.onclick = function () {
      list_data.sort(function(a,b){
        return a.list_price - b.list_price
      })

      var product = document.querySelector('.product')

      var list_datas = list_data.map(function(item,index) {
          return`
          <li class="items" idx="${item.id}">
              <p class="img"><img src="${item.list_img}" alt=""></p>
              <p class="info">
                  <span class="title">${item.list_title}</span>
                  <em>￥${item.list_price}</em>
                  <u>收藏 ：${item.list_collect}</u>
                  <i>${item.list_pay} 付款</i>
              </p>
          </li>
          `
      }).join("")
    
      product.innerHTML = list_datas
    }

    collect.onclick = function () {
      list_data.sort(function(a,b){
        return a.list_collect - b.list_collect
      })

      var product = document.querySelector('.product')

      var list_datas = list_data.map(function(item,index) {
          return`
          <li class="items" idx="${item.id}">
              <p class="img"><img src="${item.list_img}" alt=""></p>
              <p class="info">
                  <span class="title">${item.list_title}</span>
                  <em>￥${item.list_price}</em>
                  <u>收藏 ：${item.list_collect}</u>
                  <i>${item.list_pay} 付款</i>
              </p>
          </li>
          `
      }).join("")
    
      product.innerHTML = list_datas
    }
  
  var product = document.querySelector('.product')

  var list_datas = list_data.map(function(item,index) {
      return`
      <li class="items" idx="${item.id}">
          <p class="img"><img src="${item.list_img}" alt=""></p>
          <p class="info">
              <span class="title">${item.list_title}</span>
              <em>￥${item.list_price}</em>
              <u>收藏 ：${item.list_collect}</u>
              <i>${item.list_pay} 付款</i>
          </p>
      </li>
      `
  }).join("")

  product.innerHTML = list_datas



  var list_all_pro = document.querySelectorAll('.product .items')
  // console.log(list_all_pro)
  for (var i = 0; i < list_all_pro.length; i++) {
      list_all_pro[i].onclick = function () {
          
          var id = this.getAttribute('idx');
          // console.log(id);
          // 详情页需要显示的数据是根据列表页点击的那个 商品决定
          window.location.href = 'detail.html?id=' + id;
      }
  }









}

