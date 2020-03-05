<?php
header('content-type: text/html;charset=utf-8;');
    $uname = $_POST['uname'];
    $upass = $_POST['upass'];
    
    $link = mysqli_connect('localhost', 'root', 'root', 'sql');

    if(mysqli_num_rows(mysqli_query($link, "SELECT * FROM `user` WHERE `uname` = '$uname'")) > 0){
       
        $arr = array( "miss"=>"注册失败,用户名已存在");
        echo json_encode($arr);
        exit;
    }
    
        $sql = mysqli_query($link, "INSERT INTO `user` (`uname`, `upass`) VALUES('$uname','$upass')");
        $res = mysqli_query($link, $sql);


        mysqli_close($link);


        $arr = array("mess" => "注册成功");

        echo json_encode($arr)
      
    
   

?>