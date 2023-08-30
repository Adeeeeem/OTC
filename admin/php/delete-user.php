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

	if ( isset($matricule) && !empty($matricule) )
	{
		$request = "SELECT * FROM user WHERE BINARY user_matricule='".$matricule."' AND user_type='".$type."' LIMIT 1";
		$result = mysqli_query($connection,$request);

		if (mysqli_num_rows($result) == 1) // User Exist
		{
			$request = "DELETE FROM user WHERE BINARY user_matricule='".$matricule."' AND user_type='".$type."'";
			$result = mysqli_query($connection,$request);

			if (mysqli_affected_rows($connection))
			{
				$request = "SELECT * FROM user WHERE BINARY user_matricule='".$_SESSION["MY9nJ4FfxK"]."' LIMIT 1";
				$result = mysqli_query($connection,$request);
				$row = mysqli_fetch_array($result);

				switch ($type)
				{
					case "admin":
						$command = "DA";
						break;
						
					case "archivist":
						$command = "DC";
						break;

					case "technician":
						$command = "DT";
						break;
				}

				// Deleted Archivist Time Saved in History
				$request = "INSERT INTO history (user_id, history_date, history_time, history_command, history_related) VALUES (".$row['user_id'].",CURRENT_DATE,CURRENT_TIME,'".$command."','".$matricule."')";
				$result = mysqli_query($connection,$request);
				mysqli_affected_rows($connection);

				echo "Pdee3kCkqv";
			}
			else
			{
				echo "E2gUa4b7jk";
			}
		}
		else // User Doesn't Exists
		{
			echo "Xa3XFqfzkY";
		}
	}
	else // Fields are Empty
	{
		echo "WbFAW7kstJ";
	}

	mysqli_close($connection);
?>