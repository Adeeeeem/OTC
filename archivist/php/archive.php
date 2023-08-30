<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	// Check for User
	$request = "SELECT * FROM folder NATURAL JOIN user";
	$result = mysqli_query($connection,$request);
	$row = array();

	while($i = mysqli_fetch_array($result))
	{
		$row[] = $i;
	}

	// Encoding array in JSON format
	echo json_encode($row);

	mysqli_close($connection);
?>