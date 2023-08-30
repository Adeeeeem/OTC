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
	$start_hour = $_POST["start_hour"];
	$start_minute = $_POST["start_minute"];
	$end_hour = $_POST["end_hour"];
	$end_minute = $_POST["end_minute"];

	if ( isset($start_date) && !empty($start_date) )
	{
		if ( isset($end_date) && !empty($end_date) )
		{
			if ( isset($start_hour) && !empty($start_hour) )
			{
				if ( isset($start_minute) && !empty($start_minute) )
				{
					if ( isset($end_hour) && !empty($end_hour) )
					{
						if ( isset($end_minute) && !empty($end_minute) )
						{
							// History Betwwen two Specific Dates by Start Hour, Start Minute, End Hour and End Minute
							$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date BETWEEN '".$start_date."' AND '".$end_date."' AND history_time BETWEEN '".$start_hour.":".$start_minute.":00' AND '".$end_hour.":".$end_minute.":00' ORDER BY history_date, history_time DESC";
						}
						else
						{
							// History Betwwen two Specific Dates by Start Hour, Start Minute and End Hour
							$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date BETWEEN '".$start_date."' AND '".$end_date."' AND history_time BETWEEN '".$start_hour.":".$start_minute.":00' AND '".$end_hour.":00:00' ORDER BY history_date, history_time DESC";
						}
					}
					else
					{
						// History Betwwen two Specific Dates by Start Hour and Start Minute
						$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date BETWEEN '".$start_date."' AND '".$end_date."' AND history_time >= '".$start_hour.":".$start_minute.":00' ORDER BY history_date, history_time DESC";
					}
				}
				else
				{
					if ( isset($end_hour) && !empty($end_hour) )
					{
						if ( isset($end_minute) && !empty($end_minute) )
						{
							// History Betwwen two Specific Dates by Start Hour, End Hour and End Minute
							$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date BETWEEN '".$start_date."' AND '".$end_date."' AND history_time BETWEEN '".$start_hour.":00:00' AND '".$end_hour.":".$end_minute.":00' ORDER BY history_date, history_time DESC";
						}
						else
						{
							// History Betwwen two Specific Dates by Start Hour and End Hour
							$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date BETWEEN '".$start_date."' AND '".$end_date."' AND history_time BETWEEN '".$start_hour.":00:00' AND '".$end_hour.":00:00' ORDER BY history_date, history_time DESC";
						}
					}
					else
					{
						// History Betwwen two Specific Dates by Start Hour
						$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date BETWEEN '".$start_date."' AND '".$end_date."' AND history_time >= '".$start_hour.":00:00' ORDER BY history_date, history_time DESC";
					}
				}
			}
			else
			{
				// History Betwwen two Specific Dates
				$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date BETWEEN '".$start_date."' AND '".$end_date."' ORDER BY history_date, history_time DESC";
			}
		}
		else
		{
			if ( isset($start_hour) && !empty($start_hour) )
			{
				if ( isset($start_minute) && !empty($start_minute) )
				{
					if ( isset($end_hour) && !empty($end_hour) )
					{
						if ( isset($end_minute) && !empty($end_minute) )
						{
							// History on Specific Date by Start Hour, Start Minute, End Hour and End Minute
							$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date = '".$start_date."' AND history_time BETWEEN '".$start_hour.":".$start_minute.":00' AND '".$end_hour.":".$end_minute.":00' ORDER BY history_date, history_time DESC";
						}
						else
						{
							// History on Specific Date by Start Hour, Start Minute and End Hour
							$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date = '".$start_date."' AND history_time BETWEEN '".$start_hour.":".$start_minute.":00' AND '".$end_hour.":00:00' ORDER BY history_date, history_time DESC";
						}
					}
					else
					{
						// History on Specific Date by Start Hour and Start Minute
						$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date = '".$start_date."' AND history_time >= '".$start_hour.":".$start_minute.":00' ORDER BY history_date, history_time DESC";
					}
				}
				else
				{
					// History on Specific Date by Start Hour
					$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date = '".$start_date."' AND history_time >= '".$start_hour.":00:00' ORDER BY history_date, history_time DESC";
				}
			}
			else
			{
				// Specific Date
				$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date = '".$start_date."' ORDER BY history_date, history_time DESC";
			}
		}
	}
	else // Start Date Input is Empty
	{
		if ( isset($start_hour) && !empty($start_hour) )
		{
			if ( isset($start_minute) && !empty($start_minute) )
			{
				if ( isset($end_hour) && !empty($end_hour) )
				{
					if ( isset($end_minute) && !empty($end_minute) )
					{
						// Today's Date by Specific Start Hour, Start Minute, End Hour and End Minute
						$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date = CURRENT_DATE AND history_time BETWEEN '".$start_hour.":".$start_minute.":00' AND '".$end_hour.":".$end_minute.":00' ORDER BY history_date, history_time";
					}
					else
					{
						// Today's Date by Specific Start Hour, Start Minute and End Hour
						$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date = CURRENT_DATE AND history_time BETWEEN '".$start_hour.":".$start_minute.":00' AND '".$end_hour.":00:00' ORDER BY history_date, history_time";
					}
				}
				else
				{
					// Today's Date by Specific Start Hour and Minute
					$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date = CURRENT_DATE AND history_time >= '".$start_hour.":".$start_minute.":00' ORDER BY history_date, history_time";
				}
			}
			else
			{
				if ( isset($end_hour) && !empty($end_hour) )
				{
					if ( isset($end_minute) && !empty($end_minute) )
					{
						// Today's Date by Specific Start Hour, End Hour and End Minute
						$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date = CURRENT_DATE AND history_time BETWEEN '".$start_hour.":00:00' AND '".$end_hour.":".$end_minute.":00' ORDER BY history_date, history_time";
					}
					else
					{
						// Today's Date by Specific Start Hour and End Hour
						$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date = CURRENT_DATE AND history_time BETWEEN '".$start_hour.":00:00' AND '".$end_hour.":00:00' ORDER BY history_date, history_time";
					}
				}
				else
				{
					// Today's Date by Specific Start Hour
					$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date = CURRENT_DATE AND history_time >= '".$start_hour.":00:00' ORDER BY history_date, history_time";
				}
			}
		}
		else
		{
			// Display Current Date
			$request = "SELECT * FROM history NATURAL JOIN user WHERE history_date = CURRENT_DATE ORDER BY history_date, history_time";
		}
	}

	$result = mysqli_query($connection,$request);

	while($i = mysqli_fetch_array($result))
	{
		$row[] =  array("matricule_user" => $i["user_matricule"],"fname_user" => $i["user_fname"],"lname_user" => $i["user_lname"],"date_history" => $i["history_date"],"time_history" => $i["history_time"],"command_history" => $i["history_command"],"related_history" => $i["history_related"]);
	}
		
	// Encoding array in JSON format
	echo json_encode($row);

	mysqli_close($connection);
?>