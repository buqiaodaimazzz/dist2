
window.onload = function(){
  // console.log( $('#login'))

    // $('#register').click(function(){


    //   $('#login').validate({
    //     // 你需要的验证规则
    //     rules: {
    //       // key 就是你要验证的哪个 input 框的 name 属性
    //       uname: 'required', // 用户名必填
    //       upass: { // 一个字段可以写多个验证方式
    //         required: true,
    //         minlength: 4, 
    //         maxlength: 12, 
    //       }
    //     },
    //     // 你自定义提示的文本内容
    //     messages: {
       
    //       uname: '请输入用户名!',
    //       upass: {
    //         required: '请输入密码!',
    //         minlength: '最少要输入 4 个字符!'
    //       }
    //     },
        
    //     submitHandler: function (form) {
         
    //       // 发送请求到后端
    //       $.post('../php/register.php', $(form).serialize(), res => {
    //         // console.log(res)
           
    //       }, 'json')
    //     }
    //   })
    
    // })
    
          
              $('#login_btn').click(function(){
                $('#login').validate({
                  // 你需要的验证规则
                  rules: {
                    // key 就是你要验证的哪个 input 框的 name 属性
                    uname: 'required', // 用户名必填
                    upass: { // 一个字段可以写多个验证方式
                      required: true,
                      minlength: 4, 
                      maxlength: 12, 
                    }
                  },
                  // 你自定义提示的文本内容
                  messages: {
                
                    uname: '请输入用户名!',
                    upass: {
                      required: '请输入密码!',
                      minlength: '最少要输入 4 个字符!'
                    }
                  },
                  
                  submitHandler1: function (form) {
                  
                    // 发送请求到后端
                    $.post('../php/login.php', $(form).serialize(), res => {
                      console.log(res)
                    
                    }, 'json')
                  }
              })
            })
  
}

