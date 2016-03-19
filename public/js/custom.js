
// Nicholas LaRosa

var timeout = 1000;
var openMenuObj = null;
var menuClosing = null;
var currentPage = null;
var galleryActive = false;

var popupClosing = null;
var popupTimeout = 1000;

var defaultPages = ["#titleRow", "#subtitleRow", "#menuRow", "#footerRow"];
var pages = ["#home", "#about", "#faq", "#contact", "#events", "#gradEvent", "#sponsors", "#sponsorUs", "#rankings", "#mens", "#womens", "#register", "#login", "#campaign"];
var images = 21;

$(document).ready(function()
{
	$("#backgroundContainer").focus();

	for( i = 0; i < pages.length; i++ )
	{
		$(pages[i]).removeClass("bounceInUp");
	}

	for( var i = 0; i < defaultPages.length; i ++ )
	{
		$(pages[i]).removeClass("bounceInUp");
	}

	for( var i = 0; i < pages.length; i ++ )
	{
		$(pages[i]).removeClass("bounceInUp");
	}

	$("#mAbout").hide();
	$("#mEvents").hide();
	$("#mSponsors").hide();
	$("#mRankings").hide();
	$("#mAccounts").hide();
	$("#mDonate").hide();

	// Initialize event listeners

	$("#cullen").hide();
	$(document).keydown(function(e)
	{
		// CTRL + b keydown combo
		if( e.ctrlKey && e.keyCode == 66 )
		{
			// Page becomes frozen with Cullen's face
			if( galleryActive )
			{
				$("#homeButton").replaceWith('<img src="images/gallery/1.jpg" id="img1"/>');

				for( var i = 0; i < images; i++ )
				{
					$("#img" + i).hide();
				}

				$("#cullen").show();
			}
		}
	});

	$("#popupTrigger").mouseenter(function()
	{
		if( popupClosing )
		{
			window.clearTimeout( popupClosing );
			popupClosing = null;
		}

		$("#popupSalon").fadeIn();
	});

	$("#popupTrigger").mouseleave(function()
	{
		popupClosing = window.setTimeout( closePopup, popupTimeout );
	});

	$("#popupSalon").mouseenter(function()
	{
		if( popupClosing )
		{
			window.clearTimeout( popupClosing );
			popupClosing = null;
		}

		$("#popupSalon").fadeIn();
	});

	$("#popupSalon").mouseleave(function()
	{
		popupClosing = window.setTimeout( closePopup, popupTimeout );
	});

	// Menu listeners

	$("#aboutButton").mouseenter(function(){
		openMenu($("#mAbout"));
	});

	$("#eventsButton").mouseenter(function(){
		openMenu($("#mEvents"));
	});
    
	$("#sponsorsButton").mouseenter(function(){
		openMenu($("#mSponsors"));
	});

	$("#rankingsButton").mouseenter(function(){	
		openMenu($("#mRankings"));
	});

	$("#accountsButton").mouseenter(function(){
		openMenu($("#mAccounts"));
	});

	$("#donateButton").mouseenter(function(){
		openMenu($("#mDonate"));
	});

	$("#aboutButton").mouseleave(function(){
		startToClose();
	});

	$("#accountsButton").mouseleave(function(){
		startToClose();
	});

	$("#eventsButton").mouseleave(function(){
		startToClose();
	});

	$("#sponsorsButton").mouseleave(function(){
		startToClose();
	});

	$("#rankingsButton").mouseleave(function(){
		startToClose();
	});

	$("#donateButton").mouseleave(function(){
		startToClose();
	});

	$("#mAbout").mouseenter(function(){
		cancelClose();
	});

	$("#mEvents").mouseenter(function(){
		cancelClose();
	});

	$("#mSponsors").mouseenter(function(){
		cancelClose();
	});

	$("#mRankings").mouseenter(function(){
		cancelClose();
	});

	$("#mAccounts").mouseenter(function(){
		cancelClose();
	});

	$("#mDonate").mouseenter(function(){
		cancelClose();
	});

	$("#mAbout").mouseleave(function(){
		startToClose();
	});

	$("#mEvents").mouseleave(function(){
		startToClose();
	});

	$("#mSponsors").mouseleave(function(){
		startToClose();
	});

	$("#mRankings").mouseleave(function(){
		startToClose();
	});

	$("#mAccounts").mouseleave(function(){
		startToClose();
	});

    document.onclick = closeMenu;
	
	currentPage = $("#home");

	$("#backgroundContainer").focus();
	currentPage.addClass("bounceInUp");

	$("#titleRow").addClass("bounceInUp");
	$("#subtitleRow").addClass("bounceInUp");
	$("#menuRow").addClass("bounceInUp");
	$("#footerRow").addClass("bounceInUp");

	$("#titleRow").show()
	$("#subtitleRow").show();
	$("#menuRow").show();
	$("#footerRow").show();
	currentPage.show();

	setTimeout(function()
	{
		$("#titleRow").css("-webkit-animation-delay", "0s");
		$("#subtitleRow").css("-webkit-animation-delay", "0s");
		$("#menuRow").css("-webkit-animation-delay", "0s");
		$("#contentRow").css("-webkit-animation-delay", "0s");
		$("#footerRow").css("-webkit-animation-delay", "0s");

		$("#titleRow").css("animation-delay", "0s");
		$("#subtitleRow").css("animation-delay", "0s");
		$("#menuRow").css("animation-delay", "0s");
		$("#contentRow").css("animation-delay", "0s");
		$("#footerRow").css("animation-delay", "0s");

		$("#titleRow").removeClass("bounceInUp");
		$("#subtitleRow").removeClass("bounceInUp");
		$("#menuRow").removeClass("bounceInUp");
		$("#footerRow").removeClass("bounceInUp");
		currentPage.removeClass("bounceInUp");
	}, 2500);

	$("#backgroundContainer").focus();
});

function closePopup()
{
	$("#popupSalon").fadeOut();
}

// Menu Javascript

function openMenu(jQueryObj)
{
	$(".contentRow").css("z-index", "-1");

	cancelClose();

	if( openMenuObj ) openMenuObj.slideUp();

	openMenuObj = jQueryObj;
	openMenuObj.slideDown();
}

// We start to close the menu
function startToClose()
{
	menuClosing = window.setTimeout( closeMenu, timeout );
}

function closeMenu()
{
	$(".contentRow").css("z-index", "35");

	if( openMenuObj ) openMenuObj.slideUp();
}

// But if the mouse enters another part of the menu, keep it open
function cancelClose()
{
	if( menuClosing )
	{
		window.clearTimeout( menuClosing );
		menuClosing = null;
	}
}

// Page Displays

function showHome()
{
	if( galleryActive )
	{
		$("#backgroundContainer").removeClass("hoverGallery", 2000, "easeOutBounce");
		$("#homeButton").replaceWith('<img src="images/gallery/1.jpg" id="img1"/>');

		setTimeout(function()
		{
			$("#bodyContainer").removeClass("bounceOut");
			$("#bodyContainer").addClass("bounceIn");
			galleryActive = false;
		}, 1000);
	}
}
	
function showContent(pageHash)
{
	//window.location.hash = pageHash;

	if( !currentPage )
	{
		console.log("No current page");
		currentPage = $(pageHash);
		currentPage.show();
		$("#backgroundContainer").focus();
	}
	else if( currentPage )
	{
		if( pageHash == "#gallery" )
		{
			$("#bodyContainer").addClass("bounceOut");
			$("#img1").replaceWith('<div id="homeButton" onclick="showHome();"><span>Home Page</span></div>');
			$("#backgroundContainer").addClass("hoverGallery", 2000, "easeOutBounce");
			galleryActive = true;
			return;
		}

		if( currentPage.selector == pageHash )	return;

		var nextPage = $(pageHash);
		
		// Make sure our animations will not delay
		currentPage.css("-webkit-animation-delay", "0s");
		currentPage.css("animation-delay", "0s");
		
		nextPage.css("-webkit-animation-delay", "0s");
		nextPage.css("animation-delay", "0s");
		
		$("#footerRow").css("-webkit-animation-delay", "0s");
		$("#footerRow").css("animation-delay", "0s");
		
		currentPage.removeClass("bounceInUp")
		currentPage.removeClass("bounceIn");
		currentPage.addClass("bounceOut");

		setTimeout(function()
		{
			currentPage.hide();
			nextPage.removeClass("bounceInUp");
			nextPage.removeClass("bounceOut");
			nextPage.addClass("bounceIn");
			nextPage.show();
			$("#backgroundContainer").focus();

			setTimeout(function()
			{
				currentPage = nextPage;
				$("#backgroundContainer").focus();
			}, 750);

		}, 1000);

		// Have new page enter
		//nextPage.removeClass("bounceOutDown");
		//nextPage.addClass("bounceInUp");
		
		// Have footerRow enter again
		//$("#footerRow").removeClass("bounceOutDown");
		//$("#footerRow").addClass("bounceInUp");
		
		//setTimeout(function() { nextPage.show(); }, 2000);
	}
}

// MENU JAVASCRIPT

// Copyright 2006-2007 javascript-array.com

var timeout	= 500;
var closetimer	= 0;
var ddmenuitem	= 0;

// open hidden layer
function mopen(id)
{	
	// cancel close timer
	mcancelclosetime();

	// close old layer
	//if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';

	// get new layer and show it
	//ddmenuitem = document.getElementById(id);
	//ddmenuitem.style.visibility = 'visible';

	if ( ddmenuitem ) ddmenuitem.slideUp();

	ddmenuitem = $("#" + id);
	ddmenuitem.slideDown();
}

// close showed layer
function mclose()
{
	//if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
	if ( ddmenuitem ) ddmenuitem.slideUp();
}

// go close timer
function mclosetime()
{
	closetimer = window.setTimeout(mclose, timeout);
}

// cancel close timer
function mcancelclosetime()
{
	if(closetimer)
	{
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}

// close layer when click-out
document.onclick = mclose;
