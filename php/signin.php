<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../404.html');
		exit();
	}

	include ("../config.php");

	$matricule = $_POST["matricule"];
	$password = $_POST["password"];

	// To protect MySQL injection
	$matricule = stripslashes($matricule);
	$password = stripslashes($password);

	$matricule = mysqli_real_escape_string($connection,$matricule);
	$password = mysqli_real_escape_string($connection,$password);

	// Check for User
	$request = "SELECT * FROM user WHERE BINARY user_matricule='".$matricule."' AND user_type IN ('admin','archivist') LIMIT 1";
	$result = mysqli_query($connection,$request);

	if (mysqli_num_rows($result) == 1) // User Found
	{
		// Check for Password
		$request = "SELECT * FROM user WHERE BINARY user_matricule='".$matricule."' AND BINARY user_password='".$password."' LIMIT 1";
		$result = mysqli_query($connection,$request);

		if (mysqli_num_rows($result) == 1) // User Authenticated
		{
			// Get ID of the user by Matricule
			$row = mysqli_fetch_array($result);
			$id = $row["user_id"];
			$type = $row["user_type"];

			$_SESSION["MY9nJ4FfxK"] = $matricule;
			$_SESSION["TUCbR9hw7m"] = $type;
				
			// Connected Time Saved in History
			$request = "INSERT INTO history (user_id, history_date, history_time, history_command, history_related) VALUES (".$id.",CURRENT_DATE,CURRENT_TIME,'C','".ClientIP()."')";
			$result = mysqli_query($connection,$request);
			mysqli_affected_rows($connection);

			switch ($type)
			{
				case "archivist": echo "CeqcPggTJ9"; break; // Connected as Archivist
				case "admin": echo "Ax94PTTP3E"; break; // Connected as Admin
			}
		}
		else // Wrong Password
		{
			echo "PpwzhN4yV7";
			// Get ID of the user by Matricule
			$request = "SELECT * FROM user WHERE BINARY user_matricule='".$matricule."' LIMIT 1";
			$result = mysqli_query($connection,$request);
			$row = mysqli_fetch_array($result);
			$id = $row["user_id"];
			
			// Wrong Password Error Saved in History
			$request = "INSERT INTO history (user_id, history_date, history_time, history_command, history_related) VALUES (".$id.",CURRENT_DATE,CURRENT_TIME,'WP','".ClientIP()."')";
			$result = mysqli_query($connection,$request);
			mysqli_affected_rows($connection);
		}
	}
	else // User Not Found
	{
		echo "FpbzxVzEr4";
	}

	mysqli_close($connection);

	// Function to get Client IP Address
	function ClientIP()
	{
		$ipaddress = "";

		if (getenv("HTTP_CLIENT_IP"))
			$ipaddress = getenv("HTTP_CLIENT_IP");
		else
			if(getenv("HTTP_X_FORWARDED_FOR"))
				$ipaddress = getenv("HTTP_X_FORWARDED_FOR");
			else
				if(getenv("HTTP_X_FORWARDED"))
					$ipaddress = getenv("HTTP_X_FORWARDED");
				else
					if(getenv("HTTP_FORWARDED_FOR"))
						$ipaddress = getenv("HTTP_FORWARDED_FOR");
					else
						if(getenv("HTTP_FORWARDED"))
							$ipaddress = getenv("HTTP_FORWARDED");
						else
							if(getenv("REMOTE_ADDR"))
								$ipaddress = getenv("REMOTE_ADDR");
							else
								$ipaddress = "UNKNOWN";

		return $ipaddress;
	}
?>