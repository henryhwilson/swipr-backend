<?php
$user= 'robert.y.sayegh.18@dartmouth.edu';
$pass='Dummy123';
$response = exec("phantomjs login.js $user $pass", $output, $return);
echo print_r($output);
echo $output[0];
echo $return;
?>