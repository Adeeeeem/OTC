<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	// Check for User
	$request = "SELECT * FROM arrondissement NATURAL JOIN direction ORDER BY direction_code";
	$result = mysqli_query($connection,$request);

	while($i = mysqli_fetch_array($result))
	{
		$row[] = array("code_arrondissement" => $i["arrondissement_code"],"name_arrondissement" => $i["arrondissement_name"],"code_direction" => $i["direction_code"]);
	}

	// Encoding array in JSON format
	echo json_encode($row);

	mysqli_close($connection);
?>