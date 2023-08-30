// Preloader
$(window).on("load",function()
{
	$("#status").fadeOut();
	$("#preloader").delay(500).fadeOut("slow");
});

// If User tries to access home page without login in, it will redirect him to the first page
$(function ()
{
	$.ajax
	({
		type: "POST",
		dataType: "text",
		url: "../php/session.php",
		data: {},
		success: function(result)
		{
			if (result != "Ax94PTTP3E")
			{
				window.location.href="../";
			}
		}
	});
});

// Change Active Button Background Color on Click
$(function()
{
	$("#add-admin-btn").css("background-color","#007237");
	$("#left-menu li:first-child button").css("background-color","#007237");

	$("#add-archivist-btn").css("background-color","#007237");
	$("#left-menu li:first-child button").css("background-color","#007237");

	$("#add-technician-btn").css("background-color","#007237");
	$("#left-menu li:first-child button").css("background-color","#007237");

	$("#left-menu li button").click(function()
	{
		$("#left-menu li button").css("background-color","#00a54f");
		$(this).css("background-color","#007237");
	});
});

// Save last open tab
$(function()
{
	if (localStorage.getItem("last-tab-outer") == "")
	{
		localStorage.setItem("last-tab-outer", "#left-menu ul li:nth-child(1) button");
		localStorage.setItem("last-tab-inner", "#add-archivist-btn");
	}

	$("#left-menu ul li:nth-child(1) button").click(function(){localStorage.setItem("last-tab-outer", "#left-menu ul li:nth-child(1) button");});
	$("#left-menu ul li:nth-child(2) button").click(function(){localStorage.setItem("last-tab-outer", "#left-menu ul li:nth-child(2) button");});
	$("#left-menu ul li:nth-child(3) button").click(function(){localStorage.setItem("last-tab-outer", "#left-menu ul li:nth-child(3) button");});
	$("#left-menu ul li:nth-child(4) button").click(function(){localStorage.setItem("last-tab-outer", "#left-menu ul li:nth-child(4) button");});
	$("#left-menu ul li:nth-child(5) button").click(function(){localStorage.setItem("last-tab-outer", "#left-menu ul li:nth-child(5) button");});

	$("#add-admin-btn").click(function(){localStorage.setItem("last-tab-inner", "#add-admin-btn");});
	$("#edit-admin-btn").click(function(){localStorage.setItem("last-tab-inner", "#edit-admin-btn");});
	$("#delete-admin-btn").click(function(){localStorage.setItem("last-tab-inner", "#delete-admin-btn");});

	$("#add-archivist-btn").click(function(){localStorage.setItem("last-tab-inner", "#add-archivist-btn");});
	$("#edit-archivist-btn").click(function(){localStorage.setItem("last-tab-inner", "#edit-archivist-btn");});
	$("#delete-archivist-btn").click(function(){localStorage.setItem("last-tab-inner", "#delete-archivist-btn");});

	$("#add-technician-btn").click(function(){localStorage.setItem("last-tab-inner", "#add-technician-btn");});
	$("#edit-technician-btn").click(function(){localStorage.setItem("last-tab-inner", "#edit-technician-btn");});
	$("#delete-technician-btn").click(function(){localStorage.setItem("last-tab-inner", "#delete-technician-btn");});

	$(localStorage.getItem("last-tab-outer")).click();

	switch (localStorage.getItem("last-tab-inner"))
	{
		case "#add-admin-btn":
				addAdminSection();
			break;

		case "#edit-admin-btn":
				editAdminSection();
			break;

		case "#delete-admin-btn":
				deleteAdminSection();
			break;
		case "#add-archivist-btn":
				addArchivistSection();
			break;

		case "#edit-archivist-btn":
				editArchivistSection();
			break;

		case "#delete-archivist-btn":
				deleteArchivistSection();
			break;
		case "#add-technician-btn":
				addTechnicianSection();
			break;

		case "#edit-technician-btn":
				editTechnicianSection();
			break;

		case "#delete-technician-btn":
				deleteTechnicianSection();
			break;
	}
});

// Switch Between Manage Admin Section
$(function ()
{
	$("#add-admin-btn").click(function() // Display Add Admin Bloc
	{
		addAdminSection();
	});

	$("#edit-admin-btn").click(function() // Display Edit Admin Bloc
	{
		editAdminSection();
	});

	$("#delete-admin-btn").click(function() // Display Delete Admin Bloc
	{
		deleteAdminSection();
	});
});

// Add Admin
$(function()
{
	$("#confirm-add-admin").click(function(e)
	{
		e.preventDefault();
		$.ajax
		({
			type: "POST",
			dataType: "text",
			data: {matricule: $("#add-admin-matricule").val().toUpperCase(), password: $("#add-admin-password").val(), fname: $("#add-admin-fname").val().toUpperCase(), lname: $("#add-admin-lname").val().toUpperCase(), type: "admin", arrondissement: $("#add-admin-arrondissement").val()},
			url: "php/add-user.php",
			success: function(result)
			{
				switch (result)
				{
					case "WbFAW7kstJ":
							Empty($("#add-admin-matricule").val(),$("#add-admin-matricule"),$("#add-admin-matricule-error"));
							Empty($("#add-admin-password").val(),$("#add-admin-password"),$("#add-admin-password-error"));
							Empty($("#add-admin-fname").val(),$("#add-admin-fname"),$("#add-admin-fname-error"));
							Empty($("#add-admin-lname").val(),$("#add-admin-lname"),$("#add-admin-lname-error"));
							Empty($("#add-admin-arrondissement").val(),$("#add-admin-arrondissement"),$("#add-admin-arrondissement-error"));

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Veuillez remplir tous les champs!", "Erreur");
						break;

					case "YR4zqKAdwY":
							ResetAllErrors();

							$("#add-admin-matricule").css("border","1px solid red");
							$("#add-admin-exists-error").show();

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Administrateur existe déjà!", "Erreur");
						break;

					case "Xa3XFqfzkY":
							ResetAllErrors();

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;

					case "Pdee3kCkqv":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["success"]("Administrateur a été ajouté avec succès", "Succès");
						break;
				}
			}
		});
	});
});

// Edit Admin
$(function()
{
	$("#edit-search-admin").click(function(e)
	{
		e.preventDefault();

		Empty($("#edit-admin-matricule").val(),$("#edit-admin-matricule"),$("#edit-admin-matricule-error"));

		$.ajax
		({
			type: "POST",
			dataType: "json",
			data: {matricule: $("#edit-admin-matricule").val().toUpperCase(), type: "admin"},
			url: "php/user.php",
			success: function(result)
			{
				$("#edit-admin-doesnt-exists-error").hide();

				$("#edit-admin-fname").val(result.user_fname);
				$("#edit-admin-lname").val(result.user_lname);
				$("#edit-admin-arrondissement").val(result.arrondissement_code);

				Empty($("#edit-admin-fname").val(),$("#edit-admin-fname"),$("#edit-admin-fname-error"));
				Empty($("#edit-admin-lname").val(),$("#edit-admin-lname"),$("#edit-admin-lname-error"));
				Empty($("#edit-admin-arrondissement").val(),$("#edit-admin-arrondissement"),$("#edit-admin-arrondissement-error"));
			},
			error: function(result)
			{
				if ($("#edit-admin-matricule").val() == "")
				{
					$("#edit-admin-doesnt-exists-error").hide();

					$("#edit-admin-fname").val("");
					$("#edit-admin-lname").val("");
					$("#edit-admin-arrondissement").val("");
				}
				else
				{
					$("#edit-admin-matricule").css("border","1px solid red");
					$("#edit-admin-doesnt-exists-error").show();

					$("#edit-admin-fname").val("");
					$("#edit-admin-lname").val("");
					$("#edit-admin-arrondissement").val("");
				}
			}
		});
	});

	$("#confirm-edit-admin").click(function(e)
	{
		e.preventDefault();

		Empty($("#edit-admin-matricule").val(),$("#edit-admin-matricule"),$("#edit-admin-matricule-error"));
		
		$.ajax
		({
			type: "POST",
			dataType: "text",
			data: {matricule: $("#edit-admin-matricule").val().toUpperCase(), fname: $("#edit-admin-fname").val().toUpperCase(), lname: $("#edit-admin-lname").val().toUpperCase(), type: "admin", arrondissement: $("#edit-admin-arrondissement").val().toUpperCase()},
			url: "php/edit-user.php",
			success: function(result)
			{
				switch(result)
				{
					case "WbFAW7kstJ":
							Empty($("#edit-admin-matricule").val(),$("#edit-admin-matricule"),$("#edit-admin-matricule-error"));
							Empty($("#edit-admin-fname").val(),$("#edit-admin-fname"),$("#edit-admin-fname-error"));
							Empty($("#edit-admin-lname").val(),$("#edit-admin-lname"),$("#edit-admin-lname-error"));
							Empty($("#edit-admin-arrondissement").val(),$("#edit-admin-arrondissement"),$("#edit-admin-arrondissement-error"));

							$("#edit-admin-fname").val("");
							$("#edit-admin-lname").val("");
							$("#edit-admin-arrondissement").val("");

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Veuillez remplir tous les champs!", "Erreur");
						break;

					case "Xa3XFqfzkY":
							$("#edit-admin-matricule").css("border","1px solid red");
							$("#edit-admin-doesnt-exists-error").show();

							$("#edit-admin-fname").val("");
							$("#edit-admin-lname").val("");
							$("#edit-admin-arrondissement").val("");

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;

					case "E2gUa4b7jk":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;

					case "Pdee3kCkqv":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["success"]("Administrateur mis à jour avec succès", "Succès");
						break;
				}
			}
		});
	});
});

// Delete Admin
$(function()
{
	$("#delete-search-admin").click(function(e)
	{
		e.preventDefault();

		Empty($("#delete-admin-matricule").val(),$("#delete-admin-matricule"),$("#delete-admin-matricule-error"));

		$.ajax
		({
			type: "POST",
			dataType: "json",
			data: {matricule: $("#delete-admin-matricule").val().toUpperCase(), type: "admin"},
			url: "php/user.php",
			success: function(result)
			{
				$("#delete-admin-doesnt-exists-error").hide();

				$("#delete-result #admin-name").html(result.user_fname+" "+result.user_lname);
				$("#delete-result #admin-arrondissement").html(result.arrondissement_name);

				$("#admin #delete-result").show();
			},
			error: function(result)
			{
				if ($("#delete-admin-matricule").val() == "")
				{
					$("#delete-admin-doesnt-exists-error").hide();
				}
				else
				{
					$("#delete-admin-matricule").css("border","1px solid red");
					$("#delete-admin-doesnt-exists-error").show();
				}
			}
		});
	});

	$("#yes-delete-admin").on("click", function(e)
	{
		e.preventDefault();

		$.ajax
		({
			type: "POST",
			dataType: "text",
			data: {matricule: $("#delete-admin-matricule").val().toUpperCase(), type: "admin"},
			url: "php/delete-user.php",
			success: function(result)
			{
				switch(result)
				{
					case "WbFAW7kstJ":
							$("#delete-admin-matricule-error").show();
							$("#delete-admin-doesnt-exists-error").hide();
							$("#delete-admin-matricule").css("border","1px solid red");

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Veuillez remplir le Matricule de l'Administrateur a Supprimé!", "Erreur");
						break;

					case "Xa3XFqfzkY":
							$("#delete-admin-matricule-error").hide();
							$("#delete-admin-doesnt-exists-error").show();
							$("#delete-admin-matricule").css("border","1px solid red");
						break;

					case "E2gUa4b7jk":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;

					case "Pdee3kCkqv":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["success"]("Administrateur supprimé avec succès", "Succès");
						break;
				}
			}
		});
	});

});

// Switch Between Manage Archivist Section
$(function ()
{
	$("#add-archivist-btn").click(function() // Display Add Archivist Bloc
	{
		addArchivistSection();
	});

	$("#edit-archivist-btn").click(function() // Display Edit Archivist Bloc
	{
		editArchivistSection();
	});

	$("#delete-archivist-btn").click(function() // Display Delete Archivist Bloc
	{
		deleteArchivistSection();
	});
});

// Add Archivist
$(function()
{
	$("#confirm-add-archivist").click(function(e)
	{
		e.preventDefault();
		$.ajax
		({
			type: "POST",
			dataType: "text",
			data: {matricule: $("#add-archivist-matricule").val().toUpperCase(), password: $("#add-archivist-password").val(), fname: $("#add-archivist-fname").val().toUpperCase(), lname: $("#add-archivist-lname").val().toUpperCase(), type: "archivist", arrondissement: $("#add-archivist-arrondissement").val()},
			url: "php/add-user.php",
			success: function(result)
			{
				switch (result)
				{
					case "WbFAW7kstJ":
							Empty($("#add-archivist-matricule").val(),$("#add-archivist-matricule"),$("#add-archivist-matricule-error"));
							Empty($("#add-archivist-password").val(),$("#add-archivist-password"),$("#add-archivist-password-error"));
							Empty($("#add-archivist-fname").val(),$("#add-archivist-fname"),$("#add-archivist-fname-error"));
							Empty($("#add-archivist-lname").val(),$("#add-archivist-lname"),$("#add-archivist-lname-error"));
							Empty($("#add-archivist-arrondissement").val(),$("#add-archivist-arrondissement"),$("#add-archivist-arrondissement-error"));

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Veuillez remplir tous les champs!", "Erreur");
						break;

					case "YR4zqKAdwY":
							ResetAllErrors();

							$("#add-archivist-matricule").css("border","1px solid red");
							$("#add-archivist-exists-error").show();

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Archiviste existe déjà!", "Erreur");
						break;

					case "Xa3XFqfzkY":
							ResetAllErrors();

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;

					case "Pdee3kCkqv":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["success"]("Archiviste a été ajouté avec succès", "Succès");
						break;
				}
			}
		});
	});
});

// Edit Archivist
$(function()
{
	$("#edit-search-archivist").click(function(e)
	{
		e.preventDefault();

		Empty($("#edit-archivist-matricule").val(),$("#edit-archivist-matricule"),$("#edit-archivist-matricule-error"));

		$.ajax
		({
			type: "POST",
			dataType: "json",
			data: {matricule: $("#edit-archivist-matricule").val().toUpperCase(), type: "archivist"},
			url: "php/user.php",
			success: function(result)
			{
				$("#edit-archivist-doesnt-exists-error").hide();

				$("#edit-archivist-fname").val(result.user_fname);
				$("#edit-archivist-lname").val(result.user_lname);
				$("#edit-archivist-arrondissement").val(result.arrondissement_code);

				Empty($("#edit-archivist-fname").val(),$("#edit-archivist-fname"),$("#edit-archivist-fname-error"));
				Empty($("#edit-archivist-lname").val(),$("#edit-archivist-lname"),$("#edit-archivist-lname-error"));
				Empty($("#edit-archivist-arrondissement").val(),$("#edit-archivist-arrondissement"),$("#edit-archivist-arrondissement-error"));
			},
			error: function(result)
			{
				if ($("#edit-archivist-matricule").val() == "")
				{
					$("#edit-archivist-doesnt-exists-error").hide();

					$("#edit-archivist-fname").val("");
					$("#edit-archivist-lname").val("");
					$("#edit-archivist-arrondissement").val("");
				}
				else
				{
					$("#edit-archivist-matricule").css("border","1px solid red");
					$("#edit-archivist-doesnt-exists-error").show();

					$("#edit-archivist-fname").val("");
					$("#edit-archivist-lname").val("");
					$("#edit-archivist-arrondissement").val("");
				}
			}
		});
	});

	$("#confirm-edit-archivist").click(function(e)
	{
		e.preventDefault();

		Empty($("#edit-archivist-matricule").val(),$("#edit-archivist-matricule"),$("#edit-archivist-matricule-error"));
		
		$.ajax
		({
			type: "POST",
			dataType: "text",
			data: {matricule: $("#edit-archivist-matricule").val().toUpperCase(), fname: $("#edit-archivist-fname").val().toUpperCase(), lname: $("#edit-archivist-lname").val().toUpperCase(), type: "archivist", arrondissement: $("#edit-archivist-arrondissement").val().toUpperCase()},
			url: "php/edit-user.php",
			success: function(result)
			{
				switch(result)
				{
					case "WbFAW7kstJ":
							Empty($("#edit-archivist-matricule").val(),$("#edit-archivist-matricule"),$("#edit-archivist-matricule-error"));
							Empty($("#edit-archivist-fname").val(),$("#edit-archivist-fname"),$("#edit-archivist-fname-error"));
							Empty($("#edit-archivist-lname").val(),$("#edit-archivist-lname"),$("#edit-archivist-lname-error"));
							Empty($("#edit-archivist-arrondissement").val(),$("#edit-archivist-arrondissement"),$("#edit-archivist-arrondissement-error"));

							$("#edit-archivist-fname").val("");
							$("#edit-archivist-lname").val("");
							$("#edit-archivist-arrondissement").val("");

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Veuillez remplir tous les champs!", "Erreur");
						break;

					case "Xa3XFqfzkY":
							$("#edit-archivist-matricule").css("border","1px solid red");
							$("#edit-archivist-doesnt-exists-error").show();

							$("#edit-archivist-fname").val("");
							$("#edit-archivist-lname").val("");
							$("#edit-archivist-arrondissement").val("");

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;

					case "E2gUa4b7jk":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;

					case "Pdee3kCkqv":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["success"]("Archiviste mis à jour avec succès", "Succès");
						break;
				}
			}
		});
	});
});

// Delete Archivist
$(function()
{
	$("#delete-search-archivist").click(function(e)
	{
		e.preventDefault();

		Empty($("#delete-archivist-matricule").val(),$("#delete-archivist-matricule"),$("#delete-archivist-matricule-error"));

		$.ajax
		({
			type: "POST",
			dataType: "json",
			data: {matricule: $("#delete-archivist-matricule").val().toUpperCase(), type: "archivist"},
			url: "php/user.php",
			success: function(result)
			{
				$("#delete-archivist-doesnt-exists-error").hide();

				$("#delete-result #archivist-name").html(result.user_fname+" "+result.user_lname);
				$("#delete-result #archivist-arrondissement").html(result.arrondissement_name);

				$("#archivist #delete-result").show();
			},
			error: function(result)
			{
				if ($("#delete-archivist-matricule").val() == "")
				{
					$("#delete-archivist-doesnt-exists-error").hide();
				}
				else
				{
					$("#delete-archivist-matricule").css("border","1px solid red");
					$("#delete-archivist-doesnt-exists-error").show();
				}
			}
		});
	});

	$("#yes-delete-archivist").on("click", function(e)
	{
		e.preventDefault();

		$.ajax
		({
			type: "POST",
			dataType: "text",
			data: {matricule: $("#delete-archivist-matricule").val().toUpperCase(), type: "archivist"},
			url: "php/delete-user.php",
			success: function(result)
			{
				switch(result)
				{
					case "WbFAW7kstJ":
							$("#delete-archivist-matricule-error").show();
							$("#delete-archivist-doesnt-exists-error").hide();
							$("#delete-archivist-matricule").css("border","1px solid red");

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Veuillez remplir le Matricule de l'Archiviste a Supprimé!", "Erreur");
						break;

					case "Xa3XFqfzkY":
							$("#delete-archivist-matricule-error").hide();
							$("#delete-archivist-doesnt-exists-error").show();
							$("#delete-archivist-matricule").css("border","1px solid red");
						break;

					case "E2gUa4b7jk":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;

					case "Pdee3kCkqv":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["success"]("Archiviste supprimé avec succès", "Succès");
						break;
				}
			}
		});
	});

});

// Switch Between Manage Technician Section
$(function ()
{
	$("#add-technician-btn").click(function() // Display Add Archivist Bloc
	{
		addTechnicianSection();
	});

	$("#edit-technician-btn").click(function() // Display Edit Archivist Bloc
	{
		editTechnicianSection();
	});

	$("#delete-technician-btn").click(function() // Display Delete Archivist Bloc
	{
		deleteTechnicianSection();
	});
});

// Add Technician
$(function()
{
	$("#confirm-add-technician").click(function(e)
	{
		e.preventDefault();
		$.ajax
		({
			type: "POST",
			dataType: "text",
			data: {matricule: $("#add-technician-matricule").val().toUpperCase(), password: $("#add-technician-password").val(), fname: $("#add-technician-fname").val().toUpperCase(), lname: $("#add-technician-lname").val().toUpperCase(), type: "technician", arrondissement: $("#add-technician-arrondissement").val()},
			url: "php/add-user.php",
			success: function(result)
			{
				switch (result)
				{
					case "WbFAW7kstJ":
							Empty($("#add-technician-matricule").val(),$("#add-technician-matricule"),$("#add-technician-matricule-error"));
							Empty($("#add-technician-password").val(),$("#add-technician-password"),$("#add-technician-password-error"));
							Empty($("#add-technician-fname").val(),$("#add-technician-fname"),$("#add-technician-fname-error"));
							Empty($("#add-technician-lname").val(),$("#add-technician-lname"),$("#add-technician-lname-error"));
							Empty($("#add-technician-arrondissement").val(),$("#add-technician-arrondissement"),$("#add-technician-arrondissement-error"));

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Veuillez remplir tous les champs!", "Erreur");
						break;

					case "YR4zqKAdwY":
							ResetAllErrors();

							$("#add-technician-matricule").css("border","1px solid red");
							$("#add-technician-exists-error").show();

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Technicien existe déjà!", "Erreur");
						break;

					case "Xa3XFqfzkY":
							ResetAllErrors();

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;

					case "Pdee3kCkqv":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["success"]("Technicien a été ajouté avec succès", "Succès");
						break;
				}
			}
		});
	});
});

// Edit Technician
$(function()
{
	$("#edit-search-technician").click(function(e)
	{
		e.preventDefault();

		Empty($("#edit-technician-matricule").val(),$("#edit-technician-matricule"),$("#edit-technician-matricule-error"));

		$.ajax
		({
			type: "POST",
			dataType: "json",
			data: {matricule: $("#edit-technician-matricule").val().toUpperCase(), type: "technician"},
			url: "php/user.php",
			success: function(result)
			{
				$("#edit-technician-doesnt-exists-error").hide();

				$("#edit-technician-fname").val(result.user_fname);
				$("#edit-technician-lname").val(result.user_lname);
				$("#edit-technician-arrondissement").val(result.arrondissement_code);

				Empty($("#edit-technician-fname").val(),$("#edit-technician-fname"),$("#edit-technician-fname-error"));
				Empty($("#edit-technician-lname").val(),$("#edit-technician-lname"),$("#edit-technician-lname-error"));
				Empty($("#edit-technician-arrondissement").val(),$("#edit-technician-arrondissement"),$("#edit-technician-arrondissement-error"));
			},
			error: function(result)
			{
				if ($("#edit-technician-matricule").val() == "")
				{
					$("#edit-technician-doesnt-exists-error").hide();

					$("#edit-technician-fname").val("");
					$("#edit-technician-lname").val("");
					$("#edit-technician-arrondissement").val("");
				}
				else
				{
					$("#edit-technician-matricule").css("border","1px solid red");
					$("#edit-technician-doesnt-exists-error").show();

					$("#edit-technician-fname").val("");
					$("#edit-technician-lname").val("");
					$("#edit-technician-arrondissement").val("");
				}
			}
		});
	});

	$("#confirm-edit-technician").click(function(e)
	{
		e.preventDefault();

		Empty($("#edit-technician-matricule").val(),$("#edit-technician-matricule"),$("#edit-technician-matricule-error"));
		
		$.ajax
		({
			type: "POST",
			dataType: "text",
			data: {matricule: $("#edit-technician-matricule").val().toUpperCase(), fname: $("#edit-technician-fname").val().toUpperCase(), lname: $("#edit-technician-lname").val().toUpperCase(), type: "technician", arrondissement: $("#edit-technician-arrondissement").val().toUpperCase()},
			url: "php/edit-user.php",
			success: function(result)
			{
				switch(result)
				{
					case "WbFAW7kstJ":
							Empty($("#edit-technician-matricule").val(),$("#edit-technician-matricule"),$("#edit-technician-matricule-error"));
							Empty($("#edit-technician-fname").val(),$("#edit-technician-fname"),$("#edit-technician-fname-error"));
							Empty($("#edit-technician-lname").val(),$("#edit-technician-lname"),$("#edit-technician-lname-error"));
							Empty($("#edit-technician-arrondissement").val(),$("#edit-technician-arrondissement"),$("#edit-technician-arrondissement-error"));

							$("#edit-technician-fname").val("");
							$("#edit-technician-lname").val("");
							$("#edit-technician-arrondissement").val("");

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Veuillez remplir tous les champs!", "Erreur");
						break;

					case "Xa3XFqfzkY":
							$("#edit-technician-matricule").css("border","1px solid red");
							$("#edit-technician-doesnt-exists-error").show();

							$("#edit-technician-fname").val("");
							$("#edit-technician-lname").val("");
							$("#edit-technician-arrondissement").val("");

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;

					case "E2gUa4b7jk":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;

					case "Pdee3kCkqv":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["success"]("Technicien mis à jour avec succès", "Succès");
						break;
				}
			}
		});
	});
});

// Delete Technician
$(function()
{
	$("#delete-search-technician").click(function(e)
	{
		e.preventDefault();

		Empty($("#delete-technician-matricule").val(),$("#delete-technician-matricule"),$("#delete-technician-matricule-error"));

		$.ajax
		({
			type: "POST",
			dataType: "json",
			data: {matricule: $("#delete-technician-matricule").val().toUpperCase(), type: "technician"},
			url: "php/user.php",
			success: function(result)
			{
				$("#delete-technician-doesnt-exists-error").hide();

				$("#delete-result #technician-name").html(result.user_fname+" "+result.user_lname);
				$("#delete-result #technician-arrondissement").html(result.arrondissement_name);

				$("#technician #delete-result").show();
			},
			error: function(result)
			{
				if ($("#delete-technician-matricule").val() == "")
				{
					$("#delete-technician-doesnt-exists-error").hide();
				}
				else
				{
					$("#delete-technician-matricule").css("border","1px solid red");
					$("#delete-technician-doesnt-exists-error").show();
				}
			}
		});
	});

	$("#yes-delete-technician").on("click", function(e)
	{
		e.preventDefault();

		$.ajax
		({
			type: "POST",
			dataType: "text",
			data: {matricule: $("#delete-technician-matricule").val().toUpperCase(), type: "technician"},
			url: "php/delete-user.php",
			success: function(result)
			{
				switch(result)
				{
					case "WbFAW7kstJ":
							$("#delete-technician-matricule-error").show();
							$("#delete-technician-doesnt-exists-error").hide();
							$("#delete-technician-matricule").css("border","1px solid red");

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Veuillez remplir le Matricule du Technicien a Supprimé!", "Erreur");
						break;

					case "Xa3XFqfzkY":
							$("#delete-technician-matricule-error").hide();
							$("#delete-technician-doesnt-exists-error").show();
							$("#delete-technician-matricule").css("border","1px solid red");
						break;

					case "E2gUa4b7jk":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;

					case "Pdee3kCkqv":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["success"]("Technicien supprimé avec succès", "Succès");
						break;
				}
			}
		});
	});

});

// Add Arrondissement
$(function()
{
	$("#confirm-add-arrondissement").click(function(e)
	{
		e.preventDefault();
		$.ajax
		({
			type: "POST",
			dataType: "text",
			data: {matricule: $("#add-arrondissement-matricule").val().toUpperCase(), fname: $("#add-arrondissement-fname").val().toUpperCase(), direction: $("#add-arrondissement-arrondissement").val()},
			url: "php/add-arrondissement.php",
			success: function(result)
			{
				switch (result)
				{
					case "WbFAW7kstJ":
							Empty($("#add-arrondissement-matricule").val(),$("#add-arrondissement-matricule"),$("#add-arrondissement-matricule-error"));
							Empty($("#add-arrondissement-fname").val(),$("#add-arrondissement-fname"),$("#add-arrondissement-fname-error"));
							Empty($("#add-arrondissement-arrondissement").val(),$("#add-arrondissement-arrondissement"),$("#add-arrondissement-arrondissement-error"));

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Veuillez remplir tous les champs!", "Erreur");
						break;

					case "YR4zqKAdwY":
							ResetAllErrors();

							$("#add-arrondissement-matricule").css("border","1px solid red");
							$("#add-arrondissement-exists-error").show();

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Arrondissement existe déjà!", "Erreur");
						break;

					case "Xa3XFqfzkY":
							ResetAllErrors();

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;

					case "Pdee3kCkqv":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["success"]("Arrondissement a été ajouté avec succès", "Succès");
						break;
				}
			}
		});
	});
});

// Logout Button
$(function ()
{
	$(".logout-btn").click(function()
	{
		$.ajax
		({
			type: "POST",
			dataType: "text",
			url: "../php/logout.php",
			success: function()
			{
				localStorage.setItem("last-tab-outer", "");
				localStorage.setItem("last-tab-inner", "");
				window.location.href="../";
			}
		});
	});
});

// Load Data into Website
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "php/direction.php",
		success: function(result)
		{
			var len = result.length;

			for (var i = 0; i < len; i++)
			{
				$("#add-admin-arrondissement").append("<optgroup id='"+result[i].code_direction+"' label='"+result[i].code_direction+" - "+result[i].name_direction+"'></optgroup>");
				$("#edit-admin-arrondissement").append("<optgroup id='"+result[i].code_direction+"' label='"+result[i].code_direction+" - "+result[i].name_direction+"'></optgroup>");

				$("#add-archivist-arrondissement").append("<optgroup id='"+result[i].code_direction+"' label='"+result[i].code_direction+" - "+result[i].name_direction+"'></optgroup>");
				$("#edit-archivist-arrondissement").append("<optgroup id='"+result[i].code_direction+"' label='"+result[i].code_direction+" - "+result[i].name_direction+"'></optgroup>");

				$("#add-technician-arrondissement").append("<optgroup id='"+result[i].code_direction+"' label='"+result[i].code_direction+" - "+result[i].name_direction+"'></optgroup>");
				$("#edit-technician-arrondissement").append("<optgroup id='"+result[i].code_direction+"' label='"+result[i].code_direction+" - "+result[i].name_direction+"'></optgroup>");
			
				$("#add-arrondissement-arrondissement").append("<option value='"+result[i].code_direction+"'>"+result[i].code_direction+" - "+result[i].name_direction+"</option>");
			}

			$.ajax
			({
				type: "POST",
				dataType: "json",
				url: "php/arrondissement.php",
				success: function(result)
				{
					var len = result.length;

					for (var i = 0; i < len; i++)
					{
						if (result[i].code_arrondissement != null)
						{
							$("#add-admin-arrondissement optgroup#"+result[i].code_direction).append("<option id='"+result[i].code_arrondissement+"' value='"+result[i].code_arrondissement+"'>"+result[i].code_arrondissement+" - "+result[i].name_arrondissement+"</option>");
							$("#edit-admin-arrondissement optgroup#"+result[i].code_direction).append("<option id='"+result[i].code_arrondissement+"' value='"+result[i].code_arrondissement+"'>"+result[i].code_arrondissement+" - "+result[i].name_arrondissement+"</option>");

							$("#add-archivist-arrondissement optgroup#"+result[i].code_direction).append("<option id='"+result[i].code_arrondissement+"' value='"+result[i].code_arrondissement+"'>"+result[i].code_arrondissement+" - "+result[i].name_arrondissement+"</option>");
							$("#edit-archivist-arrondissement optgroup#"+result[i].code_direction).append("<option id='"+result[i].code_arrondissement+"' value='"+result[i].code_arrondissement+"'>"+result[i].code_arrondissement+" - "+result[i].name_arrondissement+"</option>");

							$("#add-technician-arrondissement optgroup#"+result[i].code_direction).append("<option id='"+result[i].code_arrondissement+"' value='"+result[i].code_arrondissement+"'>"+result[i].code_arrondissement+" - "+result[i].name_arrondissement+"</option>");
							$("#edit-technician-arrondissement optgroup#"+result[i].code_direction).append("<option id='"+result[i].code_arrondissement+"' value='"+result[i].code_arrondissement+"'>"+result[i].code_arrondissement+" - "+result[i].name_arrondissement+"</option>");
						}
					}
				}
			});
		}
	});
});

// Load History into Website
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "php/history.php",
		success: function(result)
		{
			$("#admin-history tbody").empty();

			var len = result.length;

			var message;

			for (var i = 0; i < len; i++)
			{
				$("#admin-history tbody").append("<tr><td>"+result[i].matricule_user+"</td><td>"+result[i].fname_user+" "+result[i].lname_user+"</td><td>"+setMessage(result[i].command_history,result[i].related_history)+"</td><td>"+result[i].date_history+"</td><td>"+result[i].time_history+"</td></tr>");
			}
		}
	});
});

// Load History into Website by Searching
$(function()
{
	$("#history-start-date").change(function()
	{
		$("#history-end-date").attr("min", $("#history-start-date").val());
	});

	$("#search-history").click(function(e)
	{
		e.preventDefault();

		$.ajax
		({
			type: "POST",
			dataType: "json",
			url: "php/search-history.php",
			data: {start_date: $("#history-start-date").val(), end_date: $("#history-end-date").val(), start_hour: $("#history-start-time-hours").val(), start_minute: $("#history-start-time-minutes").val(), end_hour: $("#history-end-time-hours").val(), end_minute: $("#history-end-time-minutes").val()},
			success: function(result)
			{
				$("#admin-history tbody").empty();

				var len = result.length;

				var message;

				for (var i = 0; i < len; i++)
				{
					$("#admin-history tbody").append("<tr><td>"+result[i].matricule_user+"</td><td>"+result[i].fname_user+" "+result[i].lname_user+"</td><td>"+setMessage(result[i].command_history,result[i].related_history)+"</td><td>"+result[i].date_history+"</td><td>"+result[i].time_history+"</td></tr>");
				}
			}
		});
	});
});

// Display Add Admin Section
function addAdminSection()
{
	// Hide Edit Admin Bloc
	$("#edit-admin").hide();
	// Hide Delete Admin Bloc
	$("#delete-admin").hide();
	// Display Add Admin Bloc
	$("#add-admin").show();

	// Change Active Button Background Color on Click
	$("#edit-admin-btn").css("background-color","#00a54f");
	$("#delete-admin-btn").css("background-color","#00a54f");
	$("#add-admin-btn").css("background-color","#007237");

	$("#add-admin-matricule").val("");
	$("#add-admin-password").val("");
	$("#add-admin-fname").val("");
	$("#add-admin-lname").val("");
	$("#add-admin-arrondissement").val($("#add-admin-arrondissement option:first").val());
}

// Display Edit Admin Section
function editAdminSection()
{
	// Hide Add Admin Bloc
	$("#add-admin").hide();
	// Hide Delete Admin Bloc
	$("#delete-admin").hide();
	// Display Edit Admin Bloc
	$("#edit-admin").show();

	// Change Active Button Background Color on Click
	$("#add-admin-btn").css("background-color","#00a54f");
	$("#delete-admin-btn").css("background-color","#00a54f");
	$("#edit-admin-btn").css("background-color","#007237");

	$("#edit-admin-matricule").val("");
	$("#edit-admin-password").val("");
	$("#edit-admin-fname").val("");
	$("#edit-admin-lname").val("");
	$("#edit-admin-arrondissement").val($("#edit-admin-arrondissement option:first").val());
}

// Display Delete Admin Section
function deleteAdminSection()
{
	// Hide Add Admin Bloc
	$("#add-admin").hide();
	// Hide Edit Admin Bloc
	$("#edit-admin").hide();
	// Display Delete Admin Bloc
	$("#delete-admin").show();

	// Change Active Button Background Color on Click
	$("#add-admin-btn").css("background-color","#00a54f");
	$("#edit-admin-btn").css("background-color","#00a54f");
	$("#delete-admin-btn").css("background-color","#007237");

	$("#delete-admin-matricule").val("");
	$("#admin #delete-result").hide();
}

// Display Add Archivist Section
function addArchivistSection()
{
	// Hide Edit Archivist Bloc
	$("#edit-archivist").hide();
	// Hide Delete Archivist Bloc
	$("#delete-archivist").hide();
	// Display Add Archivist Bloc
	$("#add-archivist").show();

	// Change Active Button Background Color on Click
	$("#edit-archivist-btn").css("background-color","#00a54f");
	$("#delete-archivist-btn").css("background-color","#00a54f");
	$("#add-archivist-btn").css("background-color","#007237");

	$("#add-archivist-matricule").val("");
	$("#add-archivist-password").val("");
	$("#add-archivist-fname").val("");
	$("#add-archivist-lname").val("");
	$("#add-archivist-arrondissement").val($("#add-archivist-arrondissement option:first").val());
}

// Display Edit Archivist Section
function editArchivistSection()
{
	// Hide Add Archivist Bloc
	$("#add-archivist").hide();
	// Hide Delete Archivist Bloc
	$("#delete-archivist").hide();
	// Display Edit Archivist Bloc
	$("#edit-archivist").show();

	// Change Active Button Background Color on Click
	$("#add-archivist-btn").css("background-color","#00a54f");
	$("#delete-archivist-btn").css("background-color","#00a54f");
	$("#edit-archivist-btn").css("background-color","#007237");

	$("#edit-archivist-matricule").val("");
	$("#edit-archivist-password").val("");
	$("#edit-archivist-fname").val("");
	$("#edit-archivist-lname").val("");
	$("#edit-archivist-arrondissement").val($("#edit-archivist-arrondissement option:first").val());
}

// Display Delete Archivist Section
function deleteArchivistSection()
{
	// Hide Add Archivist Bloc
	$("#add-archivist").hide();
	// Hide Edit Archivist Bloc
	$("#edit-archivist").hide();
	// Display Delete Archivist Bloc
	$("#delete-archivist").show();

	// Change Active Button Background Color on Click
	$("#add-archivist-btn").css("background-color","#00a54f");
	$("#edit-archivist-btn").css("background-color","#00a54f");
	$("#delete-archivist-btn").css("background-color","#007237");

	$("#delete-archivist-matricule").val("");
	$("#archivist #delete-result").hide();
}

// Display Add Technician Section
function addTechnicianSection()
{
	// Hide Edit Technician Bloc
	$("#edit-technician").hide();
	// Hide Delete Technician Bloc
	$("#delete-technician").hide();
	// Display Add Technician Bloc
	$("#add-technician").show();

	// Change Active Button Background Color on Click
	$("#edit-technician-btn").css("background-color","#00a54f");
	$("#delete-technician-btn").css("background-color","#00a54f");
	$("#add-technician-btn").css("background-color","#007237");

	$("#add-technician-matricule").val("");
	$("#add-technician-password").val("");
	$("#add-technician-fname").val("");
	$("#add-technician-lname").val("");
	$("#add-technician-arrondissement").val($("#add-technician-arrondissement option:first").val());
}

// Display Edit Technician Section
function editTechnicianSection()
{
	// Hide Add Technician Bloc
	$("#add-technician").hide();
	// Hide Delete Technician Bloc
	$("#delete-technician").hide();
	// Display Edit Technician Bloc
	$("#edit-technician").show();

	// Change Active Button Background Color on Click
	$("#add-technician-btn").css("background-color","#00a54f");
	$("#delete-technician-btn").css("background-color","#00a54f");
	$("#edit-technician-btn").css("background-color","#007237");

	$("#edit-technician-matricule").val("");
	$("#edit-technician-password").val("");
	$("#edit-technician-fname").val("");
	$("#edit-technician-lname").val("");
	$("#edit-technician-arrondissement").val($("#edit-technician-arrondissement option:first").val());
}

// Display Delete Technician Section
function deleteTechnicianSection()
{
	// Hide Add Technician Bloc
	$("#add-technician").hide();
	// Hide Edit Technician Bloc
	$("#edit-technician").hide();
	// Display Delete Technician Bloc
	$("#delete-technician").show();

	// Change Active Button Background Color on Click
	$("#add-technician-btn").css("background-color","#00a54f");
	$("#edit-technician-btn").css("background-color","#00a54f");
	$("#delete-technician-btn").css("background-color","#007237");

	$("#delete-technician-matricule").val("");
	$("#technician #delete-result").hide();
}

// Display Add Arrondissement Section
function addArrondissementSection()
{
	// Hide Edit Admin Bloc
	$("#edit-arrondissement").hide();
	// Hide Delete Admin Bloc
	$("#delete-arrondissement").hide();
	// Display Add Admin Bloc
	$("#add-arrondissement").show();

	// Change Active Button Background Color on Click
	$("#edit-arrondissement-btn").css("background-color","#00a54f");
	$("#delete-arrondissement-btn").css("background-color","#00a54f");
	$("#add-arrondissement-btn").css("background-color","#007237");

	$("#add-arrondissement-matricule").val("");
	$("#add-arrondissement-password").val("");
	$("#add-arrondissement-fname").val("");
	$("#add-arrondissement-lname").val("");
	$("#add-arrondissement-arrondissement").val($("#add-arrondissement-arrondissement option:first").val());
}

// If Input is Empty Display Input's Error and Empty Fields Error
function Empty(value,input,error)
{
	if ( (value == "") || (input[0].selectedIndex === 0) )
	{
		// Display Input Error
		input.css("border","1px solid red");
		// Display Necessary Input Error
		error.show();
	}
	else
	{
		// Hide Input Error
		input.css("border","1px solid #999");
		// Hide Necessary Input Error
		error.hide();
	}
}

// Reset All  Errors
function ResetAllErrors()
{
	// Hide Add Admin Inputs Error Color
	$("#add-admin-matricule").css("border","1px solid #999");
	$("#add-admin-password").css("border","1px solid #999");
	$("#add-admin-fname").css("border","1px solid #999");
	$("#add-admin-lname").css("border","1px solid #999");
	$("#add-admin-arrondissement").css("border","1px solid #999");

	// Hide Add Admin Inputs Error
	$("#add-admin-matricule-error").hide();
	$("#add-admin-password-error").hide();
	$("#add-admin-fname-error").hide();
	$("#add-admin-lname-error").hide();
	$("#add-admin-arrondissement-error").hide();

	// Hide Add Admin Errors
	$("#add-admin-exists-error").hide();

	// Hide Add Archivist Inputs Error Color
	$("#add-archivist-matricule").css("border","1px solid #999");
	$("#add-archivist-password").css("border","1px solid #999");
	$("#add-archivist-fname").css("border","1px solid #999");
	$("#add-archivist-lname").css("border","1px solid #999");
	$("#add-archivist-arrondissement").css("border","1px solid #999");

	// Hide Add Archivist Inputs Error
	$("#add-archivist-matricule-error").hide();
	$("#add-archivist-password-error").hide();
	$("#add-archivist-fname-error").hide();
	$("#add-archivist-lname-error").hide();
	$("#add-archivist-arrondissement-error").hide();

	// Hide Add Archivist Errors
	$("#add-archivist-exists-error").hide();

	// Hide Add Technician Inputs Error Color
	$("#add-technician-matricule").css("border","1px solid #999");
	$("#add-technician-password").css("border","1px solid #999");
	$("#add-technician-fname").css("border","1px solid #999");
	$("#add-technician-lname").css("border","1px solid #999");
	$("#add-technician-arrondissement").css("border","1px solid #999");

	// Hide Add Technician Inputs Error
	$("#add-technician-matricule-error").hide();
	$("#add-technician-password-error").hide();
	$("#add-technician-fname-error").hide();
	$("#add-technician-lname-error").hide();
	$("#add-technician-arrondissement-error").hide();

	// Hide Add Technician Errors
	$("#add-technician-exists-error").hide();

	// Hide Add Arrondissement Inputs Error Color
	$("#add-arrondissement-matricule").css("border","1px solid #999");
	$("#add-arrondissement-fname").css("border","1px solid #999");
	$("#add-arrondissement-arrondissement").css("border","1px solid #999");

	// Hide Add Arrondissement Inputs Error
	$("#add-arrondissement-matricule-error").hide();
	$("#add-arrondissement-fname-error").hide();
	$("#add-arrondissement-arrondissement-error").hide();

	// Hide Add Arrondissement Errors
	$("#add-arrondissement-exists-error").hide();
}

function setMessage(msg,related)
{
	switch (msg)
	{
		case "C":
				message = "a connecté depuis la machine d'adresse IP <b>"+related+"</b>";
			break;
		case "D":
				message = "a déconnecté depuis la machine d'adresse IP <b>"+related+"</b>";
			break;
		case "WP":
				message = "a tapé un mauvais mot de passe depuis la machine d'adresse IP <b>"+related+"</b>";
			break;
		case "AA":
				message = "a ajouté un administrateur avec le matricule <b>"+related+"</b>";
			break;
		case "EA":
				message = "a mis à jour l'administrateur avec le matricule <b>"+related+"</b>";
			break;
		case "DA":
				message = "a supprimé l'administrateur avec le matricule <b>"+related+"</b>";
			break;
		case "AC":
				message = "a ajouté un archiviste avec le matricule <b>"+related+"</b>";
			break;
		case "EC":
				message = "a mis à jour l'archiviste avec le matricule <b>"+related+"</b>";
			break;
		case "DC":
				message = "a supprimé l'archiviste avec le matricule <b>"+related+"</b>";
			break;
		case "AT":
				message = "a ajouté un technicien avec le matricule <b>"+related+"</b>";
			break;
		case "ET":
				message = "a mis à jour le technicien avec le matricule <b>"+related+"</b>";
			break;
		case "DT":
				message = "a supprimé le technicien avec le matricule <b>"+related+"</b>";
			break;
		case "AR":
				message = "a ajouté un arrondissement avec le code <b>"+related+"</b>";
			break;
		case "FO":
				var info = related.split(',');
				message = "a Donné l'Archive Numéro <b>"+info[1]+"</b> au Technicien avec le Matricule <b>"+info[0]+"</b>";
			break;
		case "FI":
				message = "a connecté de mettre la date de retour d'Archive avec le Bon Numéro <b>"+related+"</b>";
			break;
	}

	return message;
}