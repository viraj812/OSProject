<?php

// include 'login.html';
$access = false;
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
        $query = mysqli_query($connect, "select * from logininfo");    
        
        if (mysqli_num_rows($query) > 0) {
            
            while ($row = mysqli_fetch_assoc($query)) {
                
                if (($row["username"] == $input_username) && ($row["password"] == $input_password)) {
                    $access = true;
                    include '../Index/index.html';
                }
            }
            
            if ($access) {
                echo "\nAccess Granted";
            } else {
                echo "\nAccess Denied";
            }
            
            
        }
        
?>