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
		// Get If Bon Number Already Used
		$request = "SELECT * FROM folder WHERE BINARY receipt_number ='".$receipt."' LIMIT 1";
		$result = mysqli_query($connection,$request);
		$row = mysqli_fetch_array($result);

		if (mysqli_num_rows($result) == 1) // Bon Number Already Used
		{
			if ($row["folder_date_limit"] > date("Y-m-d"))
			{
				$request = "UPDATE folder SET folder_date_in=CURRENT_DATE,folder_stat='EXISTE' WHERE receipt_number = ".$receipt;
			}
			else
			{
				$request = "UPDATE folder SET folder_date_in=CURRENT_DATE,folder_stat='RETARD' WHERE receipt_number = ".$receipt;
			}

			$result = mysqli_query($connection,$request);

			if (mysqli_affected_rows($connection))
			{
				$request = "SELECT * FROM user WHERE BINARY user_matricule='".$_SESSION["MY9nJ4FfxK"]."' LIMIT 1";
				$result = mysqli_query($connection,$request);
				$row = mysqli_fetch_array($result);

				$request = "INSERT INTO history (user_id, history_date, history_time, history_command, history_related) VALUES (".$row['user_id'].", CURRENT_DATE,CURRENT_TIME,'FI','".$receipt."')";
				$result = mysqli_query($connection,$request);
				mysqli_affected_rows($connection);

				echo "Pdee3kCkqv";
			}
			else
			{
				echo "FdtH3k3kbA";
			}
		}
		else
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