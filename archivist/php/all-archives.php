<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	// Check for History
	$request = "SELECT * FROM folder NATURAL JOIN user ORDER BY folder_date_out";
	$result = mysqli_query($connection,$request);

	while($i = mysqli_fetch_array($result))
	{
		$row[] = $i;
	}
		
	// Encoding array in JSON format
	echo json_encode($row);

	mysqli_close($connection);
?>