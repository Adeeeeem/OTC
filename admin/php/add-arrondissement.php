<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$matricule = $_POST["matricule"];
	$fname = $_POST["fname"];
	$direction = $_POST["direction"];

	// To protect MySQL injection
	$matricule = stripslashes($matricule);
	$fname = stripslashes($fname);
	$direction = stripslashes($direction);

	$matricule = mysqli_real_escape_string($connection,$matricule);
	$fname = mysqli_real_escape_string($connection,$fname);
	$direction = mysqli_real_escape_string($connection,$direction);

	if ( isset($matricule) && !empty($matricule) && isset($fname) && !empty($fname) && isset($direction) && !empty($direction) )
	{
		// Get If user Already Exists
		$request = "SELECT * FROM arrondissement WHERE BINARY arrondissement_code='".$matricule."' LIMIT 1";
		$result = mysqli_query($connection,$request);

		if (mysqli_num_rows($result) == 1) // User Already Exist
		{
			echo "YR4zqKAdwY";
		}
		else
		{
			$request = "SELECT * FROM direction WHERE BINARY direction_code=".$direction." LIMIT 1";
			$result = mysqli_query($connection,$request);
			$row = mysqli_fetch_array($result);

			if (mysqli_num_rows($result) == 1)
			{
				$request = "INSERT INTO arrondissement (arrondissement_code, arrondissement_name, direction_id) VALUES ('".$matricule."','".$fname."','".$row['direction_id']."')";
				$result = mysqli_query($connection,$request);

				if (mysqli_affected_rows($connection))
				{
					$request = "SELECT * FROM user WHERE BINARY user_matricule='".$_SESSION["MY9nJ4FfxK"]."' LIMIT 1";
					$result = mysqli_query($connection,$request);
					$row = mysqli_fetch_array($result);

					// Added Arrondissement Time Saved in History
					$request = "INSERT INTO history (user_id, history_date, history_time, history_command, history_related) VALUES (".$row['user_id'].", CURRENT_DATE,CURRENT_TIME,'AR','".$matricule."')";
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