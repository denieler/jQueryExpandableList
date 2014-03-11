<?php
	header('Content-Type: application/json');
	
    $output = array();
    $output[] = array( 'id' => 1, 'value' => 'List item 1');
	$output[] = array( 'id' => 2, 'value' => 'List item 2');
	$output[] = array( 'id' => 3, 'value' => 'List item 3');
	$output[] = array( 'id' => 4, 'value' => 'List item 4');
	echo json_encode($output);
?>