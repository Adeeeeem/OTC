<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$receipt = $_POST["receipt"];

	// To protect MySQL injection
	$receipt = stripslashes($receipt);

	$receipt = mysqli_real_escape_string($connection,$receipt);

	if ( isset($receipt) && !empty($receipt) )
	{
		$request = "SELECT * FROM folder NATURAL JOIN user WHERE BINARY receipt_number='".$receipt."' LIMIT 1";
		$result = mysqli_query($connection,$request);

		if (mysqli_num_rows($result) == 1)
		{
			$row = mysqli_fetch_array($result);
		}
		else
		{
			$row["receipt_number"] = "Xa3XFqfzkY";
		}
	}
	else
	{
		$row["receipt_number"] = "WbFAW7kstJ";
	}

	// Encoding array in JSON format
	echo json_encode($row);

	mysqli_close($connection);
?>