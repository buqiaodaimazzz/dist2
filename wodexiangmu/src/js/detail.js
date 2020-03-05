
 // 1. 获取 localStorage 里面的数据
 const info = JSON.parse(localStorage.getItem('goodsInfo'))

 console.log(info)
 // 2. 判断数据是否存在
 if (!info) {
   // 能执行表示 !info 是一个 true
   // 表示 info 是一个 false
   // 表示数据不存在
   alert('您要查看的数据不存在')
   // 跳转回列表页面
   window.location.href = './list.html'
 }

 // 3. 渲染页面
 bindHtml()
 function bindHtml() {
   $('.left img').attr('src', info.list_img)
   $('.right h3').text(info.list_title)
   $('.right .pri').text('￥' + info.list_price)
   $('.right .collect').text(info.list_collect)
 }

 // console.log(info)

 // 4. 点击添加购物车
 // 4-1. 添加点击事件
 $('.addCart').click(() => {
   // console.log('我要添加购物车了')

   // 4-2. 判断是否登录

   // 4-3. 加入到购物车数组里面
   //    先拿到 localStorage 里面的那个数组信息
   //    如果原先没有数据, 那么我就用一个空数组来代替
   //    如果有数据, 就用我们的数据
   const cartList = JSON.parse(localStorage.getItem('cartList')) || []

   // 象数组里面把本条数据添加进去
   // 4-4. 判断有没有这个数据
   //      每一个数据都有一个自己的 id
   //      只要看数组里面有没有 id 一样的数据, 就知道有没有这个数据了
   //      数组常用方法有一个叫做 some 的方法
   //      返回值:
   //        true: 表示数组里面有这个信息
   //        false: 表示数组里面没有这个信息
   let exits = cartList.some(item => {
     // 数组里面每一个的 id === 本页面的这条数据的 id
     return item.id === info.id
   })

   // console.log(exits)
   if (exits) {
     // 表示有这个信息了, 我们要让 number ++
     // console.log('已经存在 number ++')
     // 找到这个信息给他 number ++
     let data = null
     for (let i = 0; i < cartList.length; i++) {
       if (cartList[i].id === info.id) {
         data = cartList[i]
         break
       }
     }
     // data 就是我找到的这个信息
     data.number++

     // 4-5. 数量添加的时候, 小计价格要改变
     data.xiaoji = data.number * data.price // 数量 * 单价
   } else {
     // 表示没有这个信息, 直接 push 就可以了
     // push 之前, 象里面添加一个 number 信息为 1
     info.number = 1

     // 4-5. 多添加一些信息
     info.xiaoji = info.price // 因为默认是第一个, 小计就是单价
     info.isSelect = false // 默认不选中
     cartList.push(info)
   }

   // 在存储到 localStorage 里面
   localStorage.setItem('cartList', JSON.stringify(cartList))
 })








    class Enlarge {
    constructor(ele) {
        this.ele = document.querySelector(ele);
        this.init()
    }
    init() {
        // 需要获取什么元素
        this.show = this.ele.querySelector('.show');
        this.mask = this.ele.querySelector('.mask');
        this.enlarge = this.ele.querySelector('.enlarge');

        // 鼠标移入show盒子，显示mask 和enlarge
        this.show.onmouseover = () => {
            this.mask.style.display = this.enlarge.style.display = 'block';
            this.setStyle();
            this.move()
        }
        // 鼠标移出show盒子，隐藏mask 和enlarge
        this.show.onmouseout = () => {
            this.mask.style.display = this.enlarge.style.display = 'none'
        }

        // 获取小图的标签，并且绑定点击事件？
        this.p = this.ele.querySelector('.list').children;
        let _this = this;
        for (let i = 0; i < this.p.length; i++) {
            this.p[i].onclick = function () {
                _this.change(this);
            }
        }


    }
    setStyle() {
        // 设置放大镜盒子的大小
        // 放大镜盒子的大小 = 遮罩层盒子的大小 * 放大镜盒子背景图的大小 / show盒子的大小

        // 遮罩层盒子的大小
        this.maskWidth = this.mask.offsetWidth;
        this.maskHeight = this.mask.offsetHeight;

        // 放大镜中背景的尺寸
        this.bgx = parseInt(getStyle(this.enlarge, 'background-size').split(' ')[0])
        this.bgy = parseInt(getStyle(this.enlarge, 'background-size').split(' ')[1])

        // show盒子的大小
        this.showWidth = this.show.clientWidth;
        this.showHeight = this.show.clientHeight;

        let enlargeX = this.maskWidth * this.bgx / this.showWidth;
        let enlargeY = this.maskHeight * this.bgy / this.showHeight;

        this.enlarge.style.width = enlargeX + 'px';
        this.enlarge.style.height = enlargeY + 'px'

    }
    move() {
        // 改变遮罩层的位置 和 放大镜背景图的位置
        this.show.onmousemove = (e) => {
            /* 
                获取光标位置：
                e.clientX 光标在浏览器可是区域的位置
                e.offsetX 光标在 元素上的位置

                光标在this.show 盒子上的位置

                获取元素的偏移量：
                    距离最左边的位置的距离 offsetLeft
                    离最上边的位置的距离   offsetTop
                跟定位有关系：
                如果没有定位 ，元素的左边框与body的最左边的距离
            */

            let left = e.clientX - this.ele.offsetLeft - this.maskWidth / 2;
            let top = e.clientY - this.ele.offsetTop - this.maskHeight / 2;

            // 边界值的判断
            if (left <= 0) {
                left = 0;
            }
            if (top <= 0) {
                top = 0;
            }
            if (left >= this.showWidth - this.maskWidth) {
                left = this.showWidth - this.maskWidth;
            }
            if (top >= this.showHeight - this.maskHeight) {
                top = this.showHeight - this.maskHeight
            }
            // 移动遮罩层
            this.mask.style.left = left + 'px';
            this.mask.style.top = top + 'px';

            // 移动背景图
            //  背景图移动的距离 = 背景图 * mask移动距离 / show盒子的大小
            let bgPX = this.bgx * left / this.showWidth;
            let bgPY = this.bgy * top / this.showHeight;
            this.enlarge.style.backgroundPosition = `-${bgPX}px -${bgPY}px`;
        }
    }
    change(ele) {
        //  排他思想
        for (let j = 0; j < this.p.length; j++) {
            this.p[j].classList.remove('active');
        }
        ele.classList.add('active');
        // 把当前点击的这个元素对应大图显示在 show和enlarge中
        // 我不知道点击的是那张图片，但是可以知道点击的是哪个元素
        // 可以通过这个元素来回获取这个元素上所有的属性
        let bigImg = ele.getAttribute('bigImg') // 放大镜的背景图
        let img = ele.getAttribute('img');      // show 盒子显示的图片

        // 获取show盒子下面的img图片
        this.img = this.show.querySelector('img');

        // 给show盒子下面的img图片设置src属性的属性值
        this.img.setAttribute('src', img)
        this.enlarge.style.backgroundImage = `url(${bigImg})`
    }
}


// let imgObj = {
//     idx:1,
//     img:['','','']
// }
// 操作对象
new Enlarge('.left')
}

