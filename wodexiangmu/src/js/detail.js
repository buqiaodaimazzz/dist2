
window.onload = function () {

     // 根据url的参数来从数据库取出对应的商品
     var parmas = location.search.slice(1); //id=1
     // 怎样把id=1 只要 1
    //  console.log(parmas);
     var id = parmas.split('=')[1] * 1
    //  console.log(id);
     // filter() 根据条件过滤出数据 以数组的形式返回
     var res = list_data.filter(function (item, index) {
         return item.id == id;
     })[0];
     console.log(res);
     // [0]把对象从数组中取出
     var con = document.querySelector('#con');
     console.log(con);

     // 根据过滤出来的数据 渲染到页面中

    con.innerHTML=`
    <div class="left">
        <div class="box">
            <div class="show">
                <img src="${res.list_img}" alt="">
                <div class="mask"></div>
            </div>
            <div class="list">
                <p class="active" bigImg="${res.list_img}" img="${res.list_img}">
                    <img src="${res.list_img}" alt="">
                </p>
                <p bigImg="../images/hot2.png" img="../images/hot2.png">
                    <img src="../images/hot2.png" alt="">
                </p>
            </div>
            <div class="enlarge"></div>
        </div>
    </div>

    <div class="right">
             <h3>${res.list_title}</h3>
            <p class="coupons">领券满158减10；满238减20；满399减50，满额下单更优惠哦！</p>
            <ul class="shop clearfix">
                <li>
                    <p class="price">
                        <span>价格</span><em class="pri">￥${res.list_price}</em> <i class="notice">降价通知</i>
                    </p>
                    <p class="coup">
                        <span>优惠卷</span><em>满158减10</em><em>满238减20</em><em>满399减50</em>
                    </p>
                </li>
                <li>
                    <p>累计收藏</p>
                    <span>${res.list_pay}</span>
                </li>
            </ul>
            <p class="delivery">
                <span>配送至</span>
                <select name="" id="">
                    <option value="广州">广州</option>
                    <option value="东莞">东莞</option>
                    <option value="上海">上海</option>
                    <option value="北京">北京</option>
                </select>
                <em>支持</em>
                <i>送运费保险</i>
                <u>|</u>
                <i>服饰材质保障</i>
            </p>
            <p class="freight">店铺单笔订单不满99元,在线支付运费8元 </p>
            <p class="store">由<span>童泰母婴官方旗舰店</span>从 河北邢台市发货, 并提供售后服务</p>
            <ul class="type">
                <li class="color clearfix">
                    <span>选择颜色</span><em>蓝色</em><em>粉色</em><em>橘色</em>
                </li>
                <li class="size clearfix">
                    <span>选择尺码</span><em>59cm</em><em>66cm</em><em>73cm</em><em>80cm</em>
                </li>
                <li class="pay clearfix">
                    <span>分期付款</span><em>不分期</em><em>x3期</em><em>x6期</em><em>x12期</em>
                </li>
            </ul>
            <p>
                <button class="detail_btn">加入购物车</button>
            </p>
        </div>
    `









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
new Enlarge('.box')
}

