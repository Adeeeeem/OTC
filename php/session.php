<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('../404.html');
		exit();
	}

	include ("../config.php");

	// Check user if already logged in
	if (isset($_SESSION["MY9nJ4FfxK"]))
	{
		switch ($_SESSION["TUCbR9hw7m"]) // Check user type
		{
			case "archivist": echo "CeqcPggTJ9"; break; // Connected as Archivist
			case "admin": echo "Ax94PTTP3E"; break; // Connected as Admin
		}
	}
	else
	{
		session_destroy();
	}
	
	mysqli_close($connection);
?>