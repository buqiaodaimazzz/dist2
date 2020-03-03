window.onload = function () {
    var shopS = document.querySelectorAll(".shopS")[0];
    var countall = document.querySelectorAll(".countall")[0];
    var cartall = 0;
    var savetall = 0;

    var list = `<tr class="th">
                    <th class="Son1">商品</th>
                    <th class="Son2">数量</th>
                    <th class="Son3">现价</th>
                    <th class="Son4">原价</th>
                    <th class="Son5">操作</th>
                </tr>`
    for (let i = 0; i < lists.length; i++) {
        cartall += lists[i].nowPrice;
        savetall += lists[i].oriPrice - lists[i].nowPrice;
        list += `<tr class="shopList">
                    <td class="imgTd"><img class="shops" src="../images/${lists[i].img}" alt="" srcset=""></td>
                    <td class="titleTd">
                        <h6>${lists[i].title}</h6>
                        <span>ID:#${lists[i].id}</span>
                        <span>Size:${lists[i].size}</span>
                    </td>
                    <td class="Son2">
                        <span class="reduce">-</span>
                        <input type="text" disabled value="1" class="count">
                        <span class="add">+</span>
                    </td>
                    <td class="Son3">
                        <del class="oriPrice">${lists[i].oriPrice} 元</del>
                        <b class="nowPrice">${lists[i].nowPrice} 元</b>
                    </td>
                    <td class="Son4">
                        <span class="priceAll">${lists[i].oriPrice} 元</span>
                        <span class="saveAll">节省 ${(lists[i].oriPrice - lists[i].nowPrice).toFixed(2)} 元</span>
                    </td>
                    <td class="Son5">
                        <img class="del" src="../images/del.png" alt="">
                    </td>
                </tr>`
    }
    list += `<tr class="countall">
                <td><span><i class="iconL"></i> Continue Shopping</span></td>
                <td class="countRight">
                    <span class="cartall">共: <b>${cartall.toFixed(2)} 元</b></span>
                    <span class="savetall">节省:${savetall.toFixed(2)} 元</span>
                    <button>去结算</button>
                </td>
            </tr>`
    shopS.innerHTML = list;
    // shopS.insertBefore(list, countall)


    shopS.onclick = function (e) {
        var target = e.target;
        var nowTr = target.parentElement.parentElement;
        var tobody = target.parentElement.parentElement.parentElement;
        var count = nowTr.getElementsByClassName("count")[0];
        var priceAll = nowTr.getElementsByClassName("priceAll")[0];
        var saveAll = nowTr.getElementsByClassName("saveAll")[0];
        var oriPrice = nowTr.getElementsByClassName("oriPrice")[0];
        var nowPrice = nowTr.getElementsByClassName("nowPrice")[0];
        var cartallspan = document.querySelectorAll(".cartall")[0];
        var savetallspan = document.querySelectorAll(".savetall")[0];
        nowPrice = parseFloat(nowPrice.innerHTML);
        oriPrice = parseFloat(oriPrice.innerHTML);
        console.log(cartall, savetall);
        switch (target.className) {
            case 'add':
                count.value++;
                priceAll.innerHTML = (count.value * nowPrice).toFixed(2) + ' 元';
                saveAll.innerHTML = '节省 ' + (count.value * (oriPrice - nowPrice)).toFixed(2) + ' 元';
                cartall += nowPrice;
                savetall += (oriPrice - nowPrice);
                cartallspan.innerHTML = `共: <b>${cartall.toFixed(2)} 元.</b>`;
                savetallspan.innerHTML = `节省:${savetall.toFixed(2)} 元.`;
                break;
            case 'reduce':
                console.log(count.value)
                if (count.value == 0) {
                    break;
                }
                count.value--;
                priceAll.innerHTML = (count.value * nowPrice).toFixed(2) + ' 元';
                saveAll.innerHTML = '节省 ' + (count.value * (oriPrice - nowPrice)).toFixed(2) + ' 元';
                cartall -= nowPrice;
                savetall -= (oriPrice - nowPrice);
                cartallspan.innerHTML = `共: <b>${cartall.toFixed(2)} 元.</b>`;
                savetallspan.innerHTML = `节省:${savetall.toFixed(2)} 元.`;
                break;
            case 'del':
                var flag = confirm("亲确认取消此订单吗？");
                if (flag) {
                    tobody.removeChild(nowTr);
                    cartall -= nowPrice * count.value;
                    savetall -= (oriPrice - nowPrice) * nowPrice * count.value;
                    cartallspan.innerHTML = `共: <b>${cartall.toFixed(2)} 元.</b>`;
                    savetallspan.innerHTML = `节省:${savetall.toFixed(2)} 元.`;
                }
                break;
        }
    }
}