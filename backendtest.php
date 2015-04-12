<?php
$user= 'robert.y.sayegh.18@dartmouth.edu';
$pass='Dummy123';
$response = exec(dirname(__FILE__) . "\phantomjs ". dirname(__FILE__) . "\login.js $user $pass", $output, $return);
echo print_r($output);
echo dirname(__FILE__);
echo $output[0];
if (!$return) {
	echo "Created successfully";
} else {
	echo "Not created";
}
?>