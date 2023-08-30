<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	// Check for User
	$request = "SELECT * FROM user NATURAL JOIN arrondissement WHERE user_type='technician' ORDER BY user_fname,user_lname";
	$result = mysqli_query($connection,$request);

	while($i = mysqli_fetch_array($result))
	{
		$row[] = array("code_arrondissement" => $i["arrondissement_code"],"matricule_user" => $i["user_matricule"],"fname_user" => $i["user_fname"],"lname_user" => $i["user_lname"]);
	}

	// Encoding array in JSON format
	echo json_encode($row);

	mysqli_close($connection);
?>