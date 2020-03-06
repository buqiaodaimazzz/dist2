// minNum 求任意多数中的 最小值
function minNum() {
    var minNum = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] < minNum) {
            minNum = arguments[i]
        }
    }
    return minNum;
}

// maxNum函数求任意多数中的最大值
function maxNum() {
    var maxNum = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] > maxNum) {
            maxNum = arguments[i]
        }
    }
    return maxNum;
}

// 封装任意区间的随机数
function randomNum(min, max) {
    // 如果min > max的时候
    if (min > max) {
        return parseInt(Math.random() * (min - max + 1)) + max
    }
    return parseInt(Math.random() * (max - min + 1)) + min;
}

/* 
    封装一个随机颜色
*/
function randomColor() {
    var num1 = randomNum(0, 255);
    var num2 = randomNum(0, 255);
    var num3 = randomNum(0, 255);
    var color = 'rgb(' + num1 + ',' + num2 + ',' + num3 + ')'
    // document.body
    return color;
}

/* 
    bindEvent() 事件绑定的函数
    参数1：事件源（dom元素）
    参数2：事件类型（click,onmousedowm...）
    参数3：回调函数（需要传一个函数）
*/
function bindEvent(ele, type, callback) {
    if (ele.addEventListener) {
        ele.addEventListener(type, callback);
    } else {
        ele.attrachEvent('on' + type, callback)
    }
}

// 获取非内联样式样式
function getStyle(ele, attr) {
    var style;
    if (window.getComputedStyle) {
        // attr 是一个 字符串 对象[字符串]
        style = window.getComputedStyle(ele)[attr];
    } else {
        style = ele.currentStyle[attr];
    }
    return style;
}

/* 
    运动函数：
    参数：
        【1】dom元素（需要做动画的元素）
        【2】对象（你要改变的属性和数值）
        【3】回调函数（运动结束之后需要做的事情放在回调函数中）
*/
function animation(ele, obj, callback) {
    let timerLen = 0;
    for (const key in obj) {
        timerLen++;
        //防止抖动
        clearInterval(ele[key]);

        ele[key] = setInterval(() => {
            // 透明度取值为 0-1 * 100 === 0-100
            let style;
            if (key === 'opacity') {
                style = parseFloat(getStyle(ele, key) * 100);
            } else {
                style = parseInt(getStyle(ele, key));
            }
            let aa = (obj[key] - style) / 5;
            // 当aa大于0 向上取整，当aa小于0向下取整
            let speed = aa > 0 ? Math.ceil(aa) : Math.floor(aa)

            if (style === obj[key]) {
                timerLen--;
                clearInterval(ele[key]);
                delete ele[key];
                if (timerLen === 0) {
                    // 先执行 回调函数
                    callback && callback(ele)
                }
            } else {
                if (key === 'opacity') {
                    ele.style[key] = (style + speed) / 100;
                } else {
                    ele.style[key] = style + speed + 'px';
                }
            }
        }, 30);
    }
}


/* 
    弹窗函数
        参数1：dom元素，你要把窗口添加到什么元素中
        参数2：弹窗提示内容
        参数3：回调函数，当点击确定时候执行的函数
*/
function Dialog(ele, content, callBack) {
    this.ele = document.querySelector('#' + ele);
    this.content = content;
    this.callBack = callBack;
    this.init();
}
// 重置原型对象
Dialog.prototype = {
    // 重置对象的构造器
    constructor: Dialog,
    // 描述动态方法 在对象中写方法的时候，那么可以忽略function关键字
    init() {
        // 渲染窗口结构
        this.ele.appendChild(this.render());
        // 用一个变量存this
        let _this = this;
        // 点击确定按钮
        let confireBtn = this.ele.querySelector('.confire');
        confireBtn.onclick = function () {
            // 这里面的this指向 confireBtn这个按钮
            _this.confireBtn(this);
        }

        // 板绑定取消按钮
        let cancelBtn = this.ele.querySelector('.cancel');
        cancelBtn.onclick = function () {
            _this.cancelBtn(this);
        }
    },
    render() {
        this.dialog = document.createElement('div');
        this.dialog.classList.add('dialog')
        this.dialog.innerHTML = `
            <div class="con">
                <p>内容</p>
                <input type="button" class="confire" value="确定" />
                <input type="button" class="cancel" value="取消" />
            </div>
            <div class="mark"></div>
        `
        return this.dialog;
    },
    confireBtn(ele) {
        // 移出弹窗窗口
        ele.parentNode.parentNode.remove();
        // 当点击的是确定按钮的时候，执行回调函数
        this.callBack();

    },
    cancelBtn(ele) {
        ele.parentNode.parentNode.remove();
    }
}
// 设置原型对象的构造器不可枚举和修改
Object.defineProperty(Dialog.prototype, 'constructor', { enumerable: false, writable: false })


// [1]封装一个右输入框的弹窗函数
// 点击确定：返回 输入框的数据 输入框没有数据 返回 null
// 点击取消：返回 null

// [2]完成今天的案例

// [3]思考烟花 或者 放大镜

