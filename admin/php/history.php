<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	// Check for History
	$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date = CURRENT_DATE ORDER BY history_date, history_time DESC";
	$result = mysqli_query($connection,$request);

	while($i = mysqli_fetch_array($result))
	{
		$row[] =  array("matricule_user" => $i["user_matricule"],"fname_user" => $i["user_fname"],"lname_user" => $i["user_lname"],"date_history" => $i["history_date"],"time_history" => $i["history_time"],"command_history" => $i["history_command"],"related_history" => $i["history_related"]);
	}
		
	// Encoding array in JSON format
	echo json_encode($row);

	mysqli_close($connection);
?>