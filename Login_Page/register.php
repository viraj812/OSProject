<?php
    $input_username = "";
    $input_password = "";

    $input_username = $_POST['user'];
    $input_password = $_POST['pass'];

    $input_password = hash("sha256", $input_password);

    $servername = "localhost";
    $username = "root";
    $password = "root";
    
    $connect = mysqli_connect($servername, $username, $password);
    
    if (!$connect) {
        die("Connection Failed.......\n");
    }
    // echo "Connection Successful....\n";
    $query1 = mysqli_query($connect, "use users");
    $select_query = mysqli_query($connect, "select * from logininfo");

    $num = mysqli_num_rows($select_query);
    $num = $num + 1;
    
    $add_query = "insert into logininfo (id, username, password) values ('$num', '$input_username', '$input_password')";
    
    $query = mysqli_query($connect, $add_query);

    $select_query = mysqli_query($connect, "select * from logininfo");
    if (mysqli_num_rows($select_query) == $num) {
        include 'login.html';
        
        echo "<script> alert('Succesfully Registered.'); </script>";
    }
    else{

    }
?>
