<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../404.html');
		exit();
	}

	include ("../config.php");

	// Get ID of the user by Matricule
	$request = "SELECT * FROM user WHERE BINARY user_matricule='".$_SESSION['MY9nJ4FfxK']."' LIMIT 1";
	$result = mysqli_query($connection,$request);
	$row = mysqli_fetch_array($result);
	$id = $row["user_id"];

	// Disonnected Time Saved in History
	$request = "INSERT INTO history (user_id, history_date, history_time, history_command, history_related) VALUES (".$id.",CURRENT_DATE,CURRENT_TIME,'D','".ClientIP()."')";
	$result = mysqli_query($connection,$request);
	mysqli_affected_rows($connection);
	
	$_SESSION["MY9nJ4FfxK"] = "";
	$_SESSION["TUCbR9hw7m"] = "";

	session_destroy();

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