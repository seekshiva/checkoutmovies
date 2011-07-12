var movieListLength = 10;
var movieCounter = 1;
var refreshLock = false;
$(document).ready(function() {
    refreshMovieList();
    refreshSuggestList();
    bindSuggestionEvents();
});

function bindSuggestionEvents()
{
    //binding event related to the close button
    $(".removeMovie").unbind("click").bind("click",function() {
	
	//send a call to not show the movie for another few more days
	console.log("removing " + $(this).next().attr('id'));
	var rand = Math.random() * (100000000000000000);
	refreshLock = rand;
	$(this).parent().animate({
	    opacity:.2
	},500, function() {
	    $(this).slideUp(300,function() {
		if(refreshLock == rand) refreshLock = false;
		$(this).remove();
		refreshMovieList();
	    });
	});
    });
    
    //binding events related to the checkbox
    $(".suggestion input[type=checkbox]").unbind("change").bind("change",function() {
	if($(this).attr("checked") == true)
	{
	    //write script to check the movie to the db
	    console.log("adding " + $(this).attr('value') + " to your movie list");
	    var rand = Math.random() * (100000000000000000);
	    refreshLock = rand;
	    $(this).parent().animate({
		opacity:.2
	    },500, function() {
		$(this).slideUp(300,function() {
		    if(refreshLock == rand) refreshLock = false;
		    $(this).remove();
		    refreshMovieList();
		});
	    });
	}
    });
    
}

function refreshMovieList()
{
    var str = "";
    if(refreshLock) return;
    console.log ($("#movieSuggestionList").children().length + " ,=== ," + movieListLength);
    console.log("In!!!");
    var diff = movieListLength - $("#movieSuggestionList").children().length;
    while(diff--)
    {
	movieCounter++;
	str += "<div class=\"suggestion\" id=\"addedSuggestion\"><div class=\"removeMovie floatButton\">X</div><input type=\"checkbox\" name=\"\" id=\"movie" + movieCounter + "\" value=\"moviename" + movieCounter + "\"> <label for=\"movie" + movieCounter + "\">Movie Suggestion #" + movieCounter + "</label><span class=\"imdblink\">[<a href=\"#\">View Movie in IMDb</a>]</span></div>";
    }
    $("#movieSuggestionList")[0].innerHTML += str;
    $(".suggestion").unbind("fadeIn").fadeIn(1000,function() {
	bindSuggestionEvents();
    });
}

function refreshSuggestList()
{
    var boundx = 80;
    var boundy = 100;
    $("<a><img src=\"images/dp.jpg\"></a>").appendTo("#friendsDP");
    $("<a><img src=\"images/dp.jpg\"></a>").appendTo("#friendsDP");
    $("<a><img src=\"images/dp.jpg\"></a>").appendTo("#friendsDP");
    $("<a><img src=\"images/dp.jpg\"></a>").appendTo("#friendsDP");
    $("<a><img src=\"images/dp.jpg\"></a>").appendTo("#friendsDP");
    $("<a><img src=\"images/dp.jpg\"></a>").appendTo("#friendsDP");
    $("<a><img src=\"images/dp.jpg\"></a>").appendTo("#friendsDP");
    $("<a><img src=\"images/dp.jpg\"></a>").appendTo("#friendsDP");
    $("<a><img src=\"images/dp.jpg\"></a>").appendTo("#friendsDP");
    
    for(i=0;i<$("#friendsDP a img").length;i++)
    {
	var csstext = "";
	var el = $("#friendsDP a img")[i];
	if(parseInt($(el).css("width")) > parseInt($(el).css("height")))
	{
	    csstext += "max-height:100px; ";
	    if((parseInt($(el).css("width")) / parseInt($(el).css("height")) * boundy) > boundx)
	    {
		csstext += "margin-left:-" + ((parseInt($(el).css("width")) / parseInt($(el).css("height")) * boundy) - boundx)/2 + "px; ";
	    }
	}
	else
	{
	    csstext += "max-width:80px";
	    if((parseInt($(el).css("height")) / parseInt($(el).css("width")) * boundx) > boundx)
	    {
		csstext += "margin-left:-" + ((parseInt($(el).css("height")) / parseInt($(el).css("width")) * boundx) - boundy)/2 + "px; ";
	    }
	}
	el.style.cssText = csstext;
    }
}