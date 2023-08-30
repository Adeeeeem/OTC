<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$start_date = $_POST["start_date"];
	$end_date = $_POST["end_date"];

	if ( isset($start_date) && !empty($start_date) )
	{
		if ( isset($end_date) && !empty($end_date) )
		{
			// Display Archives Between two Date
			$request = "SELECT * FROM folder NATURAL JOIN user WHERE folder_date_out BETWEEN '".$start_date."' AND '".$end_date."' ORDER BY folder_date_out,folder_date_in";
		}
		else
		{
			// Display Archives Between a Date and Current Date
			$request = "SELECT * FROM folder NATURAL JOIN user WHERE folder_date_out BETWEEN '".$start_date."' AND CURRENT_DATE ORDER BY folder_date_out,folder_date_in";
		}
	}
	else
	{
		
		// Display all Archives
		$request = "SELECT * FROM folder NATURAL JOIN user ORDER BY folder_date_out,folder_date_in";
	}

	$result = mysqli_query($connection,$request);

	while($i = mysqli_fetch_array($result))
	{
		$row[] =  $i;
	}
		
	// Encoding array in JSON format
	echo json_encode($row);

	mysqli_close($connection);
?>