<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$matricule = $_POST["matricule"];
	$password = $_POST["password"];
	$fname = $_POST["fname"];
	$lname = $_POST["lname"];
	$type = $_POST["type"];
	$arrondissement = $_POST["arrondissement"];

	// To protect MySQL injection
	$matricule = stripslashes($matricule);
	$password = stripslashes($password);
	$fname = stripslashes($fname);
	$lname = stripslashes($lname);

	$matricule = mysqli_real_escape_string($connection,$matricule);
	$password = mysqli_real_escape_string($connection,$password);
	$fname = mysqli_real_escape_string($connection,$fname);
	$lname = mysqli_real_escape_string($connection,$lname);

	if ( isset($matricule) && !empty($matricule) && isset($password) && !empty($password) && isset($fname) && !empty($fname) && isset($lname) && !empty($lname) && isset($arrondissement) && !empty($arrondissement) )
	{
		// Get If user Already Exists
		$request = "SELECT * FROM user WHERE BINARY user_matricule='".$matricule."' LIMIT 1";
		$result = mysqli_query($connection,$request);

		if (mysqli_num_rows($result) == 1) // User Already Exist
		{
			echo "YR4zqKAdwY";
		}
		else
		{
			$request = "SELECT * FROM arrondissement WHERE BINARY arrondissement_code=".$arrondissement." LIMIT 1";
			$result = mysqli_query($connection,$request);
			$row = mysqli_fetch_array($result);

			if (mysqli_num_rows($result) == 1)
			{
				$request = "INSERT INTO user (user_matricule, user_password, user_fname, user_lname, user_type, arrondissement_id) VALUES ('".$matricule."','".$password."','".$fname."','".$lname."','".$type."','".$row['arrondissement_id']."')";
				$result = mysqli_query($connection,$request);

				if (mysqli_affected_rows($connection))
				{
					$request = "SELECT * FROM user WHERE BINARY user_matricule='".$_SESSION["MY9nJ4FfxK"]."' LIMIT 1";
					$result = mysqli_query($connection,$request);
					$row = mysqli_fetch_array($result);

					switch ($type)
					{
						case "admin":
							$command = "AA";
							break;
						
						case "archivist":
							$command = "AC";
							break;

						case "technician":
							$command = "AT";
							break;
					}

					// Added Archivist Time Saved in History
					$request = "INSERT INTO history (user_id, history_date, history_time, history_command, history_related) VALUES (".$row['user_id'].", CURRENT_DATE,CURRENT_TIME,'".$command."','".$matricule."')";
					$result = mysqli_query($connection,$request);
					mysqli_affected_rows($connection);

					echo "Pdee3kCkqv";
				}
				else
				{
					echo "Xa3XFqfzkY";
				}
			}
			else
			{
				echo "Xa3XFqfzkY";
			}
		}
	}
	else // Fields are Empty
	{
		echo "WbFAW7kstJ";
	}

	mysqli_close($connection);
?>