// JavaScript Document
var postedDate;
var topicsCount = 1;
var topicText = "";
var storedFirstName = localStorage.getItem('firstName');
var storedLastName = localStorage.getItem('lastName');
var storedAvatarName = localStorage.getItem('avatarName');
var parentCollapse = "";
var parentblockQuote = "";
var parentUserName = "";

$(document).ready(function() {
	
    //make the form invisible
    $('#centered').css('visibility', 'hidden');
    $('#errorTopicText').css("visibility", "hidden");

    $('.rightSidePanel').each(function() {
        var thisId = $(this).find('span').find('span').attr('id').split('_');
        postedDate = new Date($('#postedDate_' + thisId[1]).html());
        var passedTime = monthDiff(postedDate, new Date());
        $(this).find('span').find('span').html(passedTime);

    });

    //Handler for postTopic form
    $('#topicForumForm').submit(function(event) {
		
         if (storedFirstName === "" || storedFirstName === undefined || storedFirstName === null) {
            alert("To participate in the forum you must log in first");
            $('#centered').css("visibility", "hidden");
			$('#errorTopicText').css("visibility", "hidden");
            event.preventDefault();
			return;
        }
		
        topicText = $('#topicText').val();
        // validate the input field
        if (topicText.length < 5) {
            $('#errorTopicText').css("visibility", "visible");
			event.preventDefault();
			return;       
        }
		

        //add the new topic to the html page
        var strHtml ='<div class=\"panel panel-default\"><div class=\"panel-heading\"><div class=\"panel-title leftSidePanel col-xs-8 col-md-10"><h4><a data-toggle=\"collapse\" data-parent=\"#accordion1\" href=\"#collapseFour1">' +topicText +'</a></h4><span>Started by '+ storedFirstName + " " + storedLastName + '</span>&nbsp;<img src=\"images/avatars/' + storedAvatarName +'" width=\"38\" height=\"28\" alt=\"Avatar Image\" title=\"avatar image\"/></div><div class=\"rightSidePanel col-xs-offset-0 col-md-2\"><span>0 Replies<br>0 months ago</div></div><div id=\"collapseFour1\" class=\"panel-collapse collapse\"><div class=\"panel-body\"><div class=\"row\" id=\"post_4\"><div class=\"col-md-2\"><p><img src=\"images/avatars/' + storedAvatarName + '\" width=\"80\" height=\"80\" alt=\"Avatar Image\"  class=\"img-responsive\"/></p><p>' + storedFirstName + " " + storedLastName + '<br></p><p>Posted <span id=\"postedDate_4\">' + today()+ '</span></p></div><div class=\"col-md-7\">' + topicText + '</div><div class=\"col-md-1 col-md-offset-1\"><input type=\"submit\" value=\"Reply\" id=\"reply4\"></div></div></div></div>';
        $("#accordion1").append(strHtml);
		$('#topicText').val() = "";
    });
    //post a reply to a comment 
    $('#formReply').submit(function(event) {
		
        $('#errorReplyText').css("visibility", "hidden");
       replyText = $('#replyToPost').val();
        // validate the input field
        if (replyText.length < 1) {
            $('#errorReplyText').css("visibility", "visible");
			event.preventDefault();	
			return;		
		}
        var replyPostHtml ='<div class=\"panel-body\"><div class=\"row\" id=\"post_2\"><div class=\"col-md-2\"><p><img src=\"images/avatars/' + storedAvatarName + '\" width=\"80\" height=\"80\" alt=\"\"/></p><p>' + storedFirstName + " " + storedLastName + '<br></p><p class=\"smallText\">Posted <span id=\"postedDate_2\">' + today() + '</span></p></div><div class=\"col-md-7\"><div class=\"row answer\" ><blockquote>' + parentblockQuote + '</blockquote><p class=\"smallText\" style=\"float: right; color: green; padding-right: 15px\">posted by ' + parentUserName + ' </p></div><div class=\"row\" ><p>' + replyText + '</p></div></div><div class=\"col-md-1 col-md-offset-1\"><input type=\"submit\" value=\"Reply\" id=\"reply1\"></div></div>';
        parentCollapse.append(replyPostHtml);
        $('#centered').css("visibility", "hidden");
        event.preventDefault();

    });   
    $('input[value=Reply]').click(function() {
		//$('#replyToPost').val() = "";
		$('#centered').css("visibility", "visible");
        $('#errorReplyText').css("visibility", "hidden");
       
        if (storedFirstName === "" || storedFirstName === undefined || storedFirstName === null) {
			 $('#centered').css("visibility", "hidden");
            alert("To participate in the forum you must log in first");
           
            return;
        }

        parentCollapse = $(this).closest('.panel-collapse');
        parentblockQuote = $(this).parent().siblings('.col-md-7').html();
        parentUserName = $(this).parent().siblings('.col-md-2').last().text();
    });

    $('#postTopic').click(function() {
       

    });


});

function monthDiff(d1, d2) {
    topicsCount++;
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();

    return months <= 0 ? 0 : months;
}

function today() {
    //create an instance of the date object
    var now = new Date();
    //extract from that object the date, month and the current year
    var thisDate = now.getDate();
    var thisMonth = now.getMonth() + 1;
    var thisYear = now.getFullYear();
    var thisMonthText = "";
    switch (thisMonth) {
        case 1:
            thisMonthText = "January";
            break;
        case 2:
            thisMonthText = "February";
            break;
        case 3:
            thisMonthText = "March";
            break;
        case 4:
            thisMonthText = "April";
            break;
        case 5:
            thisMonthText = "May";
            break;
        case 6:
            thisMonthText = "June";
            break;
        case 7:
            thisMonthText = "July";
            break;
        case 8:
            thisMonthText = "August";
            break;
        case 9:
            thisMonthText = "September";
            break;
        case 10:
            thisMonthText = "October";
            break;
        case 11:
            thisMonthText = "November";
            break;
        case 12:
            thisMonthText = "December";
            break;
    }
    var dateNow = thisMonthText + " " + thisDate + ", " + thisYear;
    return dateNow;

}