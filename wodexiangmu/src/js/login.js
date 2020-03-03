
window.onload = function(){
  // console.log( $('#login'))

    $('#register').click(function(){


      $('#login').validate({
        // 你需要的验证规则
        rules: {
          // key 就是你要验证的哪个 input 框的 name 属性
          uname: 'required', // 用户名必填
          password: { // 一个字段可以写多个验证方式
            required: true,
            minlength: 4, // 最少是六个
            maxlength: 12, // 最多十二个
          }
        },
        // 你自定义提示的文本内容
        messages: {
          // key 就是你验证的哪个 input 框的 name 属性
          uname: '请输入用户名! ^_^',
          password: {
            required: '请输入密码!',
            minlength: '最少要输入 4 个字符噢!'
          }
        },
        // 表单的提交事件
        //    这个函数会在表单验证通过以后执行
        submitHandler: function (form) {
          // form 接收的就是你的 form 标签
          // console.log(form)
          // console.log('表单验证通过了, 我需要使用 ajax 去提交数据了')
    
          // 有一个 jQuery 的方法
          // serialize() 快速获取表单输入的数据
          //  $(form).serialize() 就能拿到这个 form 标签里面的表单数据
          // console.log($(form).serialize())  // username=admin&password=123456
    
          // 发送请求到后端
          $.post('../php/login.php', $(form).serialize(), res => {
            console.log(res)
          }, 'json')
        }
      })
    
    })
    
 
}
