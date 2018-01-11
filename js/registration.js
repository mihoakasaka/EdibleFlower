// JavaScript Document

// Name and Password from the register-form
$(document).ready(function() {
	var storedFirstName = "";
	$('.registrationError').css("visibility", "hidden");
	
	$('#registrationForm').submit(function(event) {
		$('.registrationError').css("visibility", "hidden");
		var firstName = $('#firstName').val();
		var lastName = $('#lastName').val();
		var pw = $('#password').val();
		var repeatpw = $('#reppassword').val();
		var email = $('#email').val();
		var avatarName ="empty_avatar.jpg";
		
		console.log("Avatar " + avatarName);
		if(('#uploadAvatar').files != null ){
			console.log("Avatar chosen");
			avatarName = $('#uploadAvatar').files[0]['name'];
		}
		
		//validate input
		var notValid = true;
		if(firstName.length< 2 || lastName.length < 2 ){
			notValid = false;			
		}
		if(firstName.length< 2 || lastName.length < 2 || email === "" || pw.length < 6 || repeatpw.length < 6 ){
			notValid = false;			
		}
		if(pw !== repeatpw){
			notValid = false;	
		}
		if(!(/^[a-zA-z_-]+@[a-z]+\.[a-z]{1,}$/.test(email))) {
			notValid = false;	
		}
		$('#registrationForm input').each(function() {
			if (!isValid($(this))) {
                            
                            $(this).parent().siblings('p').css("visibility", "visible");
							event.preventDefault();
                        } else {
                           $(this).parent().siblings('p').css("visibility", "hidden");
                           
                        }
		
			localStorage.setItem('firstName', firstName);
			localStorage.setItem('lastName', lastName);
			localStorage.setItem('email', email);
   			localStorage.setItem('pw', pw);
			localStorage.setItem('avatarName', avatarName);
			});
			
		});
		$('#loginForm').submit(function(event) {
			var storedEmail = localStorage.getItem('email');
			var storedPassword = localStorage.getItem('pw');
			var email = $('#emailLogin').val();
			var pw = $('#passwordLogin').val();
			console.log('StoredEmail ' + storedEmail + "storedPassword" + storedPassword );			
			
			 
        // check if stored data from register-form is equal to data from login form
    if(email != storedEmail || pw != storedPassword || email == "") {
       alert('Email or Password are not correct or you must sign up first');
		event.preventDefault();
    }
		});
		 storedFirstName = localStorage.getItem('firstName');
		 if (storedFirstName == "" || storedFirstName == null) {
        $('#loginLink').show();
		$('#signOutLink').hide();
    } else {
        $('#loginLink').hide();
		$('#signOutLink').show();
    }
	$('#signOutLink').click(function() {
		
		 var r = confirm(storedFirstName + ", are you sure you want to sign out?");
		 if(r) {
			 localStorage.clear();
			  window.location.reload();
		 }
		});
		
	});
	

function isValid(origin) {
                var isValid = false;
                var patt = /^.+$/;
                var input = $(origin).val();
                
                switch($(origin).attr("id")) {
                    case "firstName":
                    case "lastName":
                        patt =  /^[A-Za-z .-]{2,}$/;
                        break;
                   
                     case "email":
                        patt = /^[a-zA-z_-]+@[a-z]+\.[a-z]{1,}$/;
                        break;  
                     case "password":
                     case "reppassword":
                        patt =  /^.{6,}$/;
                        break;                   
                        
                }
                if (patt.test(input)) {
                    isValid = true;
                }
                
                if($(origin).attr("id") == "reppassword") {
                   if($(origin).val() != $('#password').val()){
					    isValid = false;
				   }
                }
               
                return isValid;
            }