<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../../404.html');
		exit();
	}

	include ("../../config.php");

	$receipt_number = $_POST["receipt_number"];
	$receipt_date = $_POST["receipt_date"];
	$receipt_user = $_POST["receipt_user"];
	$folder_number = $_POST["folder_number"];
	$folder_cadastre = $_POST["folder_cadastre"];
	$folder_type = $_POST["folder_type"];
	$folder_rat = $_POST["folder_rat"];
	$folder_name = $_POST["folder_name"];
	$folder_carton = $_POST["folder_carton"];
	$folder_plans = $_POST["folder_plans"];
	$folder_date_limit = $_POST["folder_date_limit"];

	// To protect MySQL injection
	$receipt_number = stripslashes($receipt_number);
	$receipt_date = stripslashes($receipt_date);
	$receipt_user = stripslashes($receipt_user);
	$folder_number = stripslashes($folder_number);
	$folder_cadastre = stripslashes($folder_cadastre);
	$folder_type = stripslashes($folder_type);
	$folder_rat = stripslashes($folder_rat);
	$folder_name = stripslashes($folder_name);
	$folder_carton = stripslashes($folder_carton);
	$folder_plans = stripslashes($folder_plans);
	$folder_date_limit = stripslashes($folder_date_limit);

	$receipt_number = mysqli_real_escape_string($connection,$receipt_number);
	$receipt_date = mysqli_real_escape_string($connection,$receipt_date);
	$receipt_user = mysqli_real_escape_string($connection,$receipt_user);
	$folder_number = mysqli_real_escape_string($connection,$folder_number);
	$folder_cadastre = mysqli_real_escape_string($connection,$folder_cadastre);
	$folder_type = mysqli_real_escape_string($connection,$folder_type);
	$folder_rat = mysqli_real_escape_string($connection,$folder_rat);
	$folder_name = mysqli_real_escape_string($connection,$folder_name);
	$folder_carton = mysqli_real_escape_string($connection,$folder_carton);
	$folder_plans = mysqli_real_escape_string($connection,$folder_plans);
	$folder_date_limit = mysqli_real_escape_string($connection,$folder_date_limit);

	if ( isset($receipt_number) && !empty($receipt_number) && isset($receipt_date) && !empty($receipt_date) && isset($receipt_user) && !empty($receipt_user) && isset($folder_number) && !empty($folder_number) && isset($folder_cadastre) && !empty($folder_cadastre) && isset($folder_type) && !empty($folder_type) && isset($folder_rat) && !empty($folder_rat) && isset($folder_name) && !empty($folder_name) && isset($folder_carton) && !empty($folder_carton) && isset($folder_plans) && !empty($folder_plans) && isset($folder_date_limit) && !empty($folder_date_limit) )
	{
		// Get If Bon Number Already Used
		$request = "SELECT * FROM folder WHERE BINARY receipt_number ='".$receipt_number."' LIMIT 1";
		$result = mysqli_query($connection,$request);

		if (mysqli_num_rows($result) == 1) // Bon Number Already Used
		{
			echo "YR4zqKAdwY";
		}
		else
		{
			$request = "SELECT * FROM user WHERE BINARY user_matricule='".$receipt_user."' LIMIT 1";
			$result = mysqli_query($connection,$request);
			$row = mysqli_fetch_array($result);

			$request = "INSERT INTO folder(receipt_number, user_id, folder_number, folder_cadastre, folder_type, folder_ration, folder_name, folder_carton, folder_plans, folder_date_out, folder_date_limit, folder_stat) VALUES (".$receipt_number.",".$row['user_id'].",".$folder_number.",".$folder_cadastre.",'".$folder_type."','".$folder_rat."','".$folder_name."',".$folder_carton.",".$folder_plans.",'".$receipt_date."','".$folder_date_limit."','RESERVED')";
			$result = mysqli_query($connection,$request);

			if (mysqli_affected_rows($connection))
			{
				$request = "SELECT * FROM user WHERE BINARY user_matricule='".$_SESSION["MY9nJ4FfxK"]."' LIMIT 1";
				$result = mysqli_query($connection,$request);
				$row = mysqli_fetch_array($result);

				// Added Arrondissement Time Saved in History
				$request = "INSERT INTO history (user_id, history_date, history_time, history_command, history_related) VALUES (".$row['user_id'].", CURRENT_DATE,CURRENT_TIME,'FO','".$receipt_user.",".$folder_number."')";
				$result = mysqli_query($connection,$request);
				mysqli_affected_rows($connection);

				echo "Pdee3kCkqv";
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