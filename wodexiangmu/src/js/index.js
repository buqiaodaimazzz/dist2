window.onload = function () {
    
    $('.banner .con_item div').hide();
    $('.banner li').hover(function(){
       $(this)
       .children('div')
       .show();
    },
    function () {
        $('banner li')
        $(this)
        .children('div')
        .hide();
    }
    )


    var floor1_img = document.querySelector('.floor1_img')
    var floor_data = floor.map(function(item,index){
        return`
        <span><img src="${item.floor}" alt=""></span> 
        `
    }).join("")

    floor1_img.innerHTML = floor_data

    var floor2_img = document.querySelector('.floor2_img')
    var floor_data = floor.map(function(item,index){
        return`
        <span><img src="${item.floor}" alt=""></span> 
        `
    }).join("")

    floor2_img.innerHTML = floor_data


    var floor3_img = document.querySelector('.floor3_img')
    var floor_data = floor.map(function(item,index){
        return`
        <span><img src="${item.floor}" alt=""></span> 
        `
    }).join("")

    floor3_img.innerHTML = floor_data



    var recommend_con = document.querySelector('.recommend_con')
    var recommend_data =arr.map(function(item,index){
      return `
      <li>
        <p><img src="${item.photo}" alt=""></p>
        <p class="title">${item.title}</p>
        <span>${item.price}</span>
      </li>
      `
    }).join("")
    recommend_con.innerHTML =  recommend_data;

}























