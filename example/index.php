<?php
    if(!empty($_GET['name'])){
        echo($_GET['name']); 
        exit();
    }else if(!empty($_POST['name'])){
        echo ($_POST['name']);
        exit();
    }    
?>