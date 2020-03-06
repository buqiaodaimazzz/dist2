<?php
header('content-type: text/html;charset=utf-8;');
    $uname = $_POST['uname'];
    $upass = $_POST['upass'];
    
    $link = mysqli_connect('localhost', 'root', 'root', 'sql');

    $sql = "SELECT * FROM `user` WHERE `uname`='$uname' AND `upass`='$upass'";
    $res = mysqli_query($link, $sql);
  
    $row = mysqli_fetch_assoc($res);
  
    
    mysqli_close($link);
  
    if ($row) {
      $arr = array("mess"=>"登录成功!");
      echo json_encode($arr);
      // header('window.location: ./index.html');
      // header("Refresh:3;url=./index.html")
     
    } else {
      
      $arr = array("mess"=>"用户名或密码错误!");
      echo json_encode($arr);
    }
    
    
   

?>