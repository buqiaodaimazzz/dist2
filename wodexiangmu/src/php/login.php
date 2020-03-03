<?php
   $uname = $_POST['uname'];
   $upass = $_POST['upass'];
   
   $link = mysqli_connect('localhost', 'root', 'root', 'sql');

    $res = mysqli_query($link, 'INSERT INTO `user` VALUES("$uname","$upass")');
   $res = mysqli_query($link, $sql);
 
   // 3. 解析结果
   //    不需要全部解析, 因为结果要吗是 1 条, 要吗就是 没有
   //    mysqli_fetch_assoc()
   $row = mysqli_fetch_assoc($res);
 
   // 4. 断开数据库连接
   mysqli_close($link);
 
   // 5. 根据用户名密码是不是正确做出结果
   if ($row) {
     // if 条件能够执行
     // $row 是一个 true, 也就是根据前端传递过来的用户名和密码查到数据了
     // 表示登录成功
     // 跳转页面了, 因为现在还没有 js 进来, 所以我们直接用 php 操作浏览器跳转
     // 当浏览器接收到这个信息的时候, 表示让浏览器的 lcoation 变成 cart.html
     alert('注册成功')
     header('location: ./login.html');
   } else {
     // 这里能执行
     // $row 是一个 false, NULL 就是 false, 表示根据前端传递来的用户名和密码没有查询到数据
     // 表示登录失败
     echo '用户名或密码错误!';
   }

?>