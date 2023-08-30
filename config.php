<?php
	// This will redirect to 404 Page in case trying to direct access this page
	if( !isset($_SERVER['HTTP_REFERER']) )
	{
		include('404.html');
		exit();
	}

	// Start Session
	session_start();

	/* Host name */
	$host = "localhost";
	/* User */
	$user = "root";
	/* Password */
	$password = "";
	/* Database name */
	$dbname = "otc";

	$connection = mysqli_connect($host,$user,$password,$dbname);

	// Check connection
	if (!$connection)
	{
		die("Connection failed : " . mysqli_connect_error());
	}
?>
