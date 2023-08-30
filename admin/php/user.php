<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$matricule = $_POST["matricule"];
	$type = $_POST["type"];

	// To protect MySQL injection
	$matricule = stripslashes($matricule);

	$matricule = mysqli_real_escape_string($connection,$matricule);

	// Check for User
	$request = "SELECT * FROM user NATURAL JOIN arrondissement WHERE BINARY user_matricule='".$matricule."' AND user_type='".$type."' LIMIT 1";
	$result = mysqli_query($connection,$request);

	if (mysqli_num_rows($result) == 1) // Found DATA
	{
		$row = mysqli_fetch_array($result);

		// Encoding array in JSON format
		echo json_encode($row);
	}

	mysqli_close($connection);
?>