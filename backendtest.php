<?php
$user= 'robert.y.sayegh.18@dartmouth.edu';
$pass='Dummy123';
$response = exec("/home/jef28/public_html/swipr/phantomjs /home/jef28/public_html/swipr/login.js $user $pass", $output);
echo print_r($output);
?>