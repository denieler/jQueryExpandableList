<?php
	header('Content-Type: application/json');
	
    $output = array();
    $output[] = array( 'id' => 1, 'value' => 'List item 1');
	$output[] = array( 'id' => 3, 'value' => 'List item 3');
	$output[] = array( 'id' => 4, 'value' => 'List item 4');
	$output[] = array( 'id' => 7, 'value' => 'List item 7');
	$output[] = array( 'id' => 8, 'value' => 'List item 8');
	echo json_encode($output);
?>