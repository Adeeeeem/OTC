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
			if (result != "CeqcPggTJ9")
			{
				window.location.href="../";
			}
		}
	});
});

// Change Active Button Background Color on Click
$(function()
{
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
	}

	$("#left-menu ul li:nth-child(1) button").click(function(){localStorage.setItem("last-tab-outer", "#left-menu ul li:nth-child(1) button");});
	$("#left-menu ul li:nth-child(2) button").click(function(){localStorage.setItem("last-tab-outer", "#left-menu ul li:nth-child(2) button");});
	$("#left-menu ul li:nth-child(3) button").click(function(){localStorage.setItem("last-tab-outer", "#left-menu ul li:nth-child(3) button");});

	$(localStorage.getItem("last-tab-outer")).click();
});

// Load Technicien into Website
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "../admin/php/arrondissement.php",
		success: function(result)
		{
			var len = result.length;

			for (var i = 0; i < len; i++)
			{
				if (result[i].code_arrondissement != null)
				{
					$("#add-receipt-user").append("<optgroup id='"+result[i].code_arrondissement+"' label='"+result[i].code_arrondissement+" - "+result[i].name_arrondissement+"'></optgroup>");
				}
			}

			$.ajax
			({
				type: "POST",
				dataType: "json",
				url: "php/technician.php",
				success: function(result)
				{
					var len = result.length;

					for (var i = 0; i < len; i++)
					{
						if (result[i].code_arrondissement != null)
						{
							$("#add-receipt-user optgroup#"+result[i].code_arrondissement).append("<option id='"+result[i].matricule_user+"' value='"+result[i].matricule_user+"'>"+result[i].matricule_user+" - "+result[i].fname_user+" "+result[i].lname_user+"</option>");
						}
					}
				}
			});
		}
	});
});

$(function()
{
	$("#add-receipt-date").change(function()
	{
		if ($("#add-receipt-date").val() != "")
		{
			var date = new Date ($("#add-receipt-date").val());

			date.setMonth(date.getMonth() + 1);

			var date = date.getFullYear()+"-"+(("0" + (date.getMonth() + 1)).slice(-2))+"-"+(("0" + date.getDate()).slice(-2));
			
			$("#add-folder-date-limit").val(date);
		}
	})

	$("#confirm-add-folder").click(function(e)
	{
		e.preventDefault();

		Empty($("#add-receipt-number").val(),$("#add-receipt-number"),$("#add-receipt-number-error"));
		Empty($("#add-receipt-date").val(),$("#add-receipt-date"),$("#add-receipt-date-error"));
		Empty($("#add-receipt-user").val(),$("#add-receipt-user"),$("#add-receipt-user-error"));
		Empty($("#add-folder-number").val(),$("#add-folder-number"),$("#add-folder-number-error"));
		Empty($("#add-folder-cadastre").val(),$("#add-folder-cadastre"),$("#add-folder-cadastre-error"));
		Empty($("#add-folder-type").val(),$("#add-folder-type"),$("#add-folder-type-error"));
		Empty($("#add-folder-rat").val(),$("#add-folder-rat"),$("#add-folder-rat-error"));
		Empty($("#add-folder-name").val(),$("#add-folder-name"),$("#add-folder-name-error"));
		Empty($("#add-folder-carton").val(),$("#add-folder-carton"),$("#add-folder-carton-error"));
		Empty($("#add-folder-plans").val(),$("#add-folder-plans"),$("#add-folder-plans-error"));

		$.ajax
		({
			type: "POST",
			dataType: "text",
			data: {receipt_number: $("#add-receipt-number").val(), receipt_date: $("#add-receipt-date").val(), receipt_user: $("#add-receipt-user").val().toUpperCase(), folder_number: $("#add-folder-number").val(), folder_cadastre: $("#add-folder-cadastre").val(), folder_type: $("#add-folder-type").val(), folder_rat: $("#add-folder-rat").val().toUpperCase(), folder_name: $("#add-folder-name").val().toUpperCase(), folder_carton: $("#add-folder-carton").val(), folder_plans: $("#add-folder-plans").val(), folder_date_limit: $("#add-folder-date-limit").val()},
			url: "php/folder-out.php",
			success: function(result)
			{
				switch (result)
				{
					case "WbFAW7kstJ":
							ResetAllErrors();

							Empty($("#add-receipt-number").val(),$("#add-receipt-number"),$("#add-receipt-number-error"));
							Empty($("#add-receipt-date").val(),$("#add-receipt-date"),$("#add-receipt-date-error"));
							Empty($("#add-receipt-user").val(),$("#add-receipt-user"),$("#add-receipt-user-error"));
							Empty($("#add-folder-number").val(),$("#add-folder-number"),$("#add-folder-number-error"));
							Empty($("#add-folder-cadastre").val(),$("#add-folder-cadastre"),$("#add-folder-cadastre-error"));
							Empty($("#add-folder-type").val(),$("#add-folder-type"),$("#add-folder-type-error"));
							Empty($("#add-folder-rat").val(),$("#add-folder-rat"),$("#add-folder-rat-error"));
							Empty($("#add-folder-name").val(),$("#add-folder-name"),$("#add-folder-name-error"));
							Empty($("#add-folder-carton").val(),$("#add-folder-carton"),$("#add-folder-carton-error"));
							Empty($("#add-folder-plans").val(),$("#add-folder-plans"),$("#add-folder-plans-error"));

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Veuillez remplir tous les champs!", "Erreur");
						break;
					case "YR4zqKAdwY":
							ResetAllErrors();

							$("#add-receipt-number").css("border","1px solid #999");
							$("#add-receipt-number-exists-error").show();

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il semble que le numéro de reçu est déjà utilisé avant!", "Erreur");
						break;
					case "Xa3XFqfzkY":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;
					case "Pdee3kCkqv":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["success"]("Archive sauvegardée avec succès", "Succès");
						break;
				}
			}
		});
	});
});

// Load Archives into Website
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "php/archive.php",
		success: function(result)
		{
			var len = result.length;

			for (var i = 0; i < len; i++)
			{
				$("#pick-receipt-number").append("<option value='"+result[i].receipt_number+"'>"+result[i].receipt_number+"</option>");
			}
		}
	});
});

//Search Archive
$(function()
{
	$("#pick-receipt-number").change(function()
	{
		$("#tipe-receipt-number").val($("#pick-receipt-number").val());
	});

	$("#tipe-receipt-number").change(function()
	{
		$("#pick-receipt-number").val($("#tipe-receipt-number").val());
	});

	$("#search-receipt-number").click(function(e)
	{
		e.preventDefault();

		$.ajax
		({
			type: "POST",
			dataType: "json",
			data: {receipt: $("#tipe-receipt-number").val()},
			url: "php/search-archive.php",
			success: function(result)
			{
				switch (result.receipt_number)
				{
					case "WbFAW7kstJ":
							$("#tipe-receipt-number-doesnt-exist-error").hide();

							Empty($("#pick-receipt-number").val(),$("#pick-receipt-number"),$("#pick-receipt-number-error"));
							Empty($("#tipe-receipt-number").val(),$("#tipe-receipt-number"),$("#tipe-receipt-number-error"));
						break;
					case "Xa3XFqfzkY":
							ResetAllErrors();

							$("#pick-receipt-number").css("border","1px solid red");
							$("#tipe-receipt-number").css("border","1px solid red");
							$("#pick-receipt-number")[0].selectedIndex = 0;

							$("#tipe-receipt-number-doesnt-exist-error").show();
						break;
					default:
							ResetAllErrors();

							$("#result-folder-number").html(result.folder_number);
							$("#result-folder-name").html(result.folder_name);
							$("#result-folder-user").html(result.user_fname+" "+result.user_lname);
							$("#result-folder-date").html(result.folder_date_out);

							switch (result.folder_stat)
							{
								case "EXISTE":
										$("#archive-result").css("background-color","#32d296");
										$("#archive-result_inner").html(" est disponible dans le bibliothéque.<br><br>L'Archive a été retourné le <b>"+result.folder_date_in+"</b>");
									break;
								case "RESERVED":
										$("#archive-result").css("background-color","#faa05a");
										$("#archive-result_inner").html(" est n'est pas disponible<br><br>La date prévu pour retourner l'Archive est  <b>"+result.folder_date_limit+"</b><br><br><br><form><div class='uk-width-1-1'><button id='return-folder' class='uk-botton otc-btn uk-width-1-2'>Retouner</button></div></form>");
									break;
								case "RETARD":
										$("#archive-result").css("background-color","#f0506e");
										$("#archive-result_inner").html(" est disponible dans le bibliothéque.<br><br>L'Archive a été retourné en <b>RETARD</b> le <b>"+result.folder_date_in+"</b> dépasse la date limite <b>"+result.folder_date_limit+"</b>");
									break;
							}

							$("#archive-result").show();
						break;
				}
			}
		});
	});

	$("#archive-input").on("click","#return-folder",function(e)
	{
		e.preventDefault();

		$.ajax
		({
			type: "POST",
			dataType: "text",
			data: {receipt: $("#tipe-receipt-number").val()},
			url: "php/folder-in.php",
			success: function(result)
			{
				switch(result)
				{
					case "WbFAW7kstJ":
							$("#tipe-receipt-number-doesnt-exist-error").hide();

							Empty($("#pick-receipt-number").val(),$("#pick-receipt-number"),$("#pick-receipt-number-error"));
							Empty($("#tipe-receipt-number").val(),$("#tipe-receipt-number"),$("#tipe-receipt-number-error"));

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Veuillez remplir tous les champs!", "Erreur");
						break;
					case "Xa3XFqfzkY":
							ResetAllErrors();

							$("#pick-receipt-number").css("border","1px solid red");
							$("#tipe-receipt-number").css("border","1px solid red");
							$("#pick-receipt-number")[0].selectedIndex = 0;

							$("#tipe-receipt-number-doesnt-exist-error").show();

							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il semble que le numéro de reçu n'existe pas!", "Erreur");
						break;
					case "FdtH3k3kbA":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["error"]("Il y avait une erreur s'il vous plaît réessayer plus tard!", "Erreur");
						break;
					case "Pdee3kCkqv":
							toastr.options = {"closeButton": true,"debug": false,"newestOnTop": false,"progressBar": false,"positionClass": "toast-top-right","preventDuplicates": false,"onclick": null,"showDuration": "300","hideDuration": "1000","timeOut": "5000","extendedTimeOut": "1000","showEasing": "swing","hideEasing": "linear","showMethod": "fadeIn","hideMethod": "fadeOut"}
							toastr["success"]("Archive est maintenant disponible !", "Succès");
						break;
				}
			}
		});
	});
});

// Display Archives
$(function()
{
	$.ajax
	({
		type: "POST",
		dataType: "json",
		url: "php/all-archives.php",
		success: function(result)
		{
			var len = result.length;

			for (var i = 0; i < len; i++)
			{
				switch (result[i].folder_stat)
				{
					case "RESERVED":
							$("#archives table tbody").append("<tr style='background-color: #faa05a;'><td>"+result[i].receipt_number+"</td><td>"+result[i].user_matricule+" - "+result[i].user_fname+" "+result[i].user_lname+"</td><td>"+result[i].folder_number+" - "+result[i].folder_name+"</td><td>"+result[i].folder_date_out+"</td><td>"+result[i].folder_date_limit+"</td><td>EN ATTENDANT</td></tr>");
						break;
					case "EXISTE":
							$("#archives table tbody").append("<tr style='background-color: #32d296;'><td>"+result[i].receipt_number+"</td><td>"+result[i].user_matricule+" - "+result[i].user_fname+" "+result[i].user_lname+"</td><td>"+result[i].folder_number+" - "+result[i].folder_name+"</td><td>"+result[i].folder_date_out+"</td><td>"+result[i].folder_date_limit+"</td><td>"+result[i].folder_date_in+"</td></tr>");
						break;
					case "RETARD":
							$("#archives table tbody").append("<tr style='background-color: #f0506e;'><td>"+result[i].receipt_number+"</td><td>"+result[i].user_matricule+" - "+result[i].user_fname+" "+result[i].user_lname+"</td><td>"+result[i].folder_number+" - "+result[i].folder_name+"</td><td>"+result[i].folder_date_out+"</td><td>"+result[i].folder_date_limit+"</td><td>"+result[i].folder_date_in+"</td></tr>");
						break;
				}
			}
		}
	});
});

// Display Archives by Specific Date
$(function()
{
	$("#archive-start-date").change(function()
	{
		$("#archive-end-date").attr("min", $("#archive-start-date").val());
	});

	$("#search-archive-history").click(function(e)
	{
		e.preventDefault();

		$.ajax
		({
			type: "POST",
			dataType: "json",
			url: "php/search-all-archives.php",
			data: {start_date: $("#archive-start-date").val(), end_date: $("#archive-end-date").val()},
			success: function(result)
			{
				$("#archives table tbody").empty();

				var len = result.length;

				for (var i = 0; i < len; i++)
				{
					switch (result[i].folder_stat)
					{
						case "RESERVED":
								$("#archives table tbody").append("<tr style='background-color: #faa05a;'><td>"+result[i].receipt_number+"</td><td>"+result[i].user_matricule+" - "+result[i].user_fname+" "+result[i].user_lname+"</td><td>"+result[i].folder_number+" - "+result[i].folder_name+"</td><td>"+result[i].folder_date_out+"</td><td>"+result[i].folder_date_limit+"</td><td>EN ATTENDANT</td></tr>");
							break;
						case "EXISTE":
								$("#archives table tbody").append("<tr style='background-color: #32d296;'><td>"+result[i].receipt_number+"</td><td>"+result[i].user_matricule+" - "+result[i].user_fname+" "+result[i].user_lname+"</td><td>"+result[i].folder_number+" - "+result[i].folder_name+"</td><td>"+result[i].folder_date_out+"</td><td>"+result[i].folder_date_limit+"</td><td>"+result[i].folder_date_in+"</td></tr>");
							break;
						case "RETARD":
								$("#archives table tbody").append("<tr style='background-color: #f0506e;'><td>"+result[i].receipt_number+"</td><td>"+result[i].user_matricule+" - "+result[i].user_fname+" "+result[i].user_lname+"</td><td>"+result[i].folder_number+" - "+result[i].folder_name+"</td><td>"+result[i].folder_date_out+"</td><td>"+result[i].folder_date_limit+"</td><td>"+result[i].folder_date_in+"</td></tr>");
							break;
					}
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
			data: {},
			success: function()
			{
				window.location.href="../";
			}
		});
	});
});

$(function()
{
	$("#left-menu ul li:nth-child(1) button").click(function()
	{
		$("#add-receipt-number").val("");
		$("#add-receipt-date").val("");
		$("#add-receipt-user")[0].selectedIndex = 0;
		$("#add-folder-number").val("");
		$("#add-folder-cadastre").val("");
		$("#add-folder-type")[0].selectedIndex = 0;
		$("#add-folder-rat").val("");
		$("#add-folder-name").val("");
		$("#add-folder-carton").val("");
		$("#add-folder-plans").val("");
		$("#add-folder-date-limit").val("");

		ResetAllErrors();
	});

	$("#left-menu ul li:nth-child(2) button").click(function()
	{
		$("#pick-receipt-number")[0].selectedIndex = 0;
		$("#tipe-receipt-number").val("");
		
		ResetAllErrors();
	});

	$("#left-menu ul li:nth-child(3) button").click(function()
	{
		$("#archive-start-date").val("");
		$("#archive-end-date").val("");
	});
});

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
	$("#add-receipt-number").css("border","1px solid #999");
	$("#add-receipt-date").css("border","1px solid #999");
	$("#add-receipt-user").css("border","1px solid #999");
	$("#add-folder-number").css("border","1px solid #999");
	$("#add-folder-cadastre").css("border","1px solid #999");
	$("#add-folder-type").css("border","1px solid #999");
	$("#add-folder-rat").css("border","1px solid #999");
	$("#add-folder-name").css("border","1px solid #999");
	$("#add-folder-carton").css("border","1px solid #999");
	$("#add-folder-plans").css("border","1px solid #999");
	$("#pick-receipt-number").css("border","1px solid #999");
	$("#tipe-receipt-number").css("border","1px solid #999");

	$("#add-receipt-number-error").hide();
	$("#add-receipt-date-error").hide();
	$("#add-receipt-user-error").hide();
	$("#add-folder-number-error").hide();
	$("#add-folder-cadastre-error").hide();
	$("#add-folder-type-error").hide();
	$("#add-folder-rat-error").hide();
	$("#add-folder-name-error").hide();
	$("#add-folder-carton-error").hide();
	$("#add-folder-plans-error").hide();
	$("#add-receipt-number-exists-error").hide();
	$("#pick-receipt-number-error").hide();
	$("#tipe-receipt-number-error").hide();
	$("#tipe-receipt-number-doesnt-exist-error").hide();
	$("#archive-result").hide();
}