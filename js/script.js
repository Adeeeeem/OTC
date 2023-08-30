// Preloader
$(window).on("load",function()
{
	$("#status").fadeOut();
	$("#preloader").delay(500).fadeOut("slow");
});

// If user is already connected take him to Home Page
$(function ()
{
	$.ajax
	({
		type: "POST",
		dataType: "text",
		url: "php/session.php",
		data: {},
		success: function(result)
		{
			switch (result)
			{
				case "CeqcPggTJ9": // Connected as Archivist
					window.location.href="archivist/";
				break;
				case "Ax94PTTP3E": // Connected as Admin
					window.location.href="admin/";
				break;
			}
		}
	});
});

// Show & Hide Password
$(function()
{
	// Hide/Show Sign in Password
	$("#signin-password-btn").click(function()
	{
		if ($("#signin-password-icon").attr("uk-icon")=="icon: lock")
		{
			$("#signin-password-icon").attr("uk-icon","icon: unlock");
			$("#signin-password").attr("type","text");
			$("#signin-show-password").html("Masquer le mot de passe");
		}
		else
		{
			$("#signin-password-icon").attr("uk-icon","icon: lock");
			$("#signin-password").attr("type","password");
			$("#signin-show-password").html("Afficher le mot de passe");
		}
	});

	// Hide/Show Sign up Password
	$("#signup-password-btn").click(function()
	{
		if ($("#signup-password-icon").attr("uk-icon")=="icon: lock")
		{
			$("#signup-password-icon").attr("uk-icon","icon: unlock");
			$("#signup-password").attr("type","text");
			$("#signup-show-password").html("Masquer le mot de passe");
		}
		else
		{
			$("#signup-password-icon").attr("uk-icon","icon: lock");
			$("#signup-password").attr("type","password");
			$("#signup-show-password").html("Afficher le mot de passe");
		}
	});
});

// Sign in Chech points
$(function ()
{
	$("#signin-btn").click(function(e)
	{
		var matricule = $("#signin-matricule");
		var password = $("#signin-password");
		e.preventDefault();
		$.ajax
		({
			type: "POST",
			dataType: "text",
			url: "php/signin.php",
			data: {matricule: matricule.val().toUpperCase(), password: password.val()},
			success: function(result)
			{
				switch (result)
				{
					case "FpbzxVzEr4": // User Not Found
						// Display Login's Input Error
						$("#signin-matricule").css("border","1px solid red");
						// Display Login's Message Error
						$("#invalid-signin-matricule").show();

						// Empty the Login's Input
						$("#signin-matricule").val("");

						// Display Password's Input Error
						$("#signin-password").css("border","1px solid red");
						// Display Password's Message Error
						$("#invalid-signin-password").show();

						// Empty the Password's Input
						$("#signin-password").val("");
					break;

					case "PpwzhN4yV7": // Password is Incorrect
						// Hide Login's Input Error
						$("#signin-matricule").css("border","1px solid #999");
						// Hide Login's Message Error
						$("#invalid-signin-matricule").hide();

						// Display Password's Input Error
						$("#signin-password").css("border","1px solid red");
						// Display Password's Message Error
						$("#invalid-signin-password").show();

						// Empty the Password's Input
						$("#signin-password").val("");
					break;

					case "CeqcPggTJ9": // Connected as Archivist
						window.location.href="archivist/";
					break;
					case "Ax94PTTP3E": // Connected as Admin
						window.location.href="admin/";
					break;
				}
			}
		});
	});
});