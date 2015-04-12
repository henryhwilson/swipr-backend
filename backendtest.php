<?php
$user= 'robert.y.sayegh.18@dartmouth.edu';
$pass='Dummy123';
//$response = exec("/home/jef28/public_html/swipr/phantomjs /home/jef28/public_html/swipr/login.js $user $pass", $output);
//echo $output;
?>
<?
$args = array();
$args[0] = $user;
$args[1] = $pass;
function execute($script, $args, $options = array(), $bin = 'phantomjs', $debug = true) {

    $option_str = '';
    foreach ($options as $option => $value)
    {
        $option_str .= '--'.$option.'='.$value.' ';
    }

    // Escape
    $cmd = escapeshellcmd("{$bin} {$option_str}{$script} " . implode(' ', $args));
    if($debug) $cmd .= ' 2>&1';
    // Execute
    $result = shell_exec($cmd);
    if($debug) return $result;
    if($result === null) return false;

    // Return
    if(substr($result, 0, 1) !== '{') return $result; // not JSON
    $json = json_decode($result, $as_array = true);
    if($json === null) return false;
    return $json;

}

execute(dirname(__FILE__) .'/login.js', $args, false, $bin, $debug);
?>