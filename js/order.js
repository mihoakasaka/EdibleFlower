  //display subtotal in product table
  function calcSubtotal(name){
       
        var qty =document.getElementById(name+'Qty').value;
          qty=parseFloat(qty);
        var price;
        switch(name){
            case "camomile": price = 25.00;
            break;
            case "elderberry": price = 35.50;
            break;
            case "hibiscus" : price = 39.50;
            break;
             case "lavender": price = 48.00;
            break;
            case "marigold": price = 36.75;
            break;
            case "nasturtium": price =55.75 ;
            break;
            case "primrose": price = 47.50;
            break;
            case "rose": price =49.75 ;
            break;
        }
        price=parseFloat(price);    
       var subtotal = price* qty;
       subtotal = Number(subtotal).toFixed(2);
       document.getElementById(name+"Total").innerHTML = " cost $"+subtotal;
    }
 // for shopping cart
            var flowers = ["camomile","elderberry","hibiscus","lavender","marigold","nasturtium","primrose","rose"];
            var cart = [];
            var index = 0;
            //object Item holding product name, price and quantity.
            var Item = function (name, price, qty) {
                this.name = name;
                this.price = price;
                this.qty = qty;
            };
//get info about selected flowers and add to cart
            function readOrder(){
              for  (i=0; i< flowers.length;i++){
                var name = flowers[i];
                var qty =document.getElementById(name+'Qty').value;
                qty=parseFloat(qty);
                 document.getElementById(name+'Qty').value = "0";
        var price;
        switch(name){
            case "camomile": price = 25.00;
            name = "Camomile";
            break;
            case "elderberry": price = 35.50;
                name = "Elderberry";
            break;
            case "hibiscus" : price = 39.50;
                name = "Hibiscus";
            break;
             case "lavender": price = 48.00;
                nSame = "Lavender";
            break;
            case "marigold": price = 36.75;
                 name = "MaryGold";
            break;
            case "nasturtium": price =55.75 ;
                name = "Nasturtium";
            break;
            case "primrose": price = 47.50;
            name = "Primrose";
            break;
            case "rose": price =49.75 ;
            name = "Rose";
            break;
           
        } 
      
        price=parseFloat(price);
        if(qty != 0){
        addToCart(name, price, qty);}

            }

       if(cart.length == 0){
        alert("Enter your order.")
        return;
       }
        displayCart();
       }

//to display shopping cart
        function displayCart() {
             var subtotal = 0;
             var TAX_RATE = 0.15;
             var SHIPPING = 10.00;
             var pprice, pqty,ptotal,tax,total;
                document.getElementById('shoppingList').innerHTML = "";
                for (i = 0; i<cart.length; i++) {
                    pprice = parseFloat(cart[i].price);
                    pqty = parseFloat(cart[i].qty);
                    ptotal = parseFloat(pprice*pqty);
                    subtotal += ptotal;
                    
                    $('#shoppingList').append('<tr><td>' + cart[i].name + '</td>\n\
        <td>$' + Number(pprice).toFixed(2) + '</td><td>' + pqty + '</td>\n\
<td>$' + Number(ptotal).toFixed(2) + '</td></tr>');
                }
                tax = parseFloat(subtotal*TAX_RATE);
                total = subtotal+tax+SHIPPING;


                document.getElementById('subtotal').innerHTML = "$"+ Number(subtotal).toFixed(2);
                document.getElementById('shipping').innerHTML = "$10.00";
                document.getElementById('tax').innerHTML = "$"+Number(tax).toFixed(2);
                document.getElementById('total').innerHTML = "$"+Number(total).toFixed(2);


            }

            //deleat all items from cart and remove list from table.
            function clearCart() {
                cart = [];
                document.getElementById('shoppingList').innerHTML = "";
                     document.getElementById('subtotal').innerHTML = "";
                document.getElementById('shipping').innerHTML = "";
                document.getElementById('tax').innerHTML = "";
                document.getElementById('total').innerHTML = "";

            }
  
                
            //store Item in an array cart[].
            function addToCart(name, price, qty) {
                for (var i in cart) {
                    if(qty==0){
                      return;
                    }
                    if (cart[i].name === name) {
                        cart[i].qty += qty;
                        return;
                    }
                }
                var item = new Item(name, price, qty);
                cart.push(item);
            }  
            $(document).ready(function (){
            $("#checkOut").click(function () {
                    window.location.href = "checkout.html";
                    document.getElementById("checkoutTable").innerHTML=" <caption style='font-size: 18px;\n\
                     font-weight: bold;'>Your Shopping Cart</caption><thead><tr><th >Product</th>\n\
                     <th>Price</th><th >Quantity</th><th>Amount</th> </tr> </thead>\n\
                    <tfoot><tr> <th colspan='3'>Subtotal</th><td ><span id='subtotal'></span></td></tr>\n\
                    <tr><th colspan='3'>Tax</th><td><span id='tax'></span></td></tr>\n\
                    <tr> <th colspan='3'>Shipping</th><td ><span id='shipping'></span></td></tr>\n\
                  <tr> <th colspan='3'>Total</th> <td><span id='total'></span></td></tr>\n\
                    </tfoot><tbody id='shoppingList'></tbody>"
                }); 
            });

 
 // for order from validation
  $(document).ready(function () {
    var storedFirstName = "";
  var storedLastName = "";
  var storedEmail = "";
    
    if (typeof(localStorage.getItem('firstName')) != "undefined"  || typeof(localStorage.getItem('firstName')) != "null") {
    // Store
  storedFirstName = localStorage.getItem('firstName');
  storedLastName = localStorage.getItem('lastName');
  storedEmail = localStorage.getItem('email');
   
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  } 
          
        
                //hide error message
                $('.errorMessage').css("visibility","hidden");
                 //change background color of input when focused
                $('input').focus(function () {
                    $(this).css("background-color", "#0ff");
                });

                $('input').blur(function () {
                    $(this).css("background-color", "#fff");
                });
        //$('#firstName').val(storedFirstName);
        //$('#lastName').val(storedLastName);
        //$('#email').val(storedEmail);
        
                //validation of check out form 
                $('#submitB').click(function () {
                 
                    //regular expression for each input
                    var nameRegex = /^[a-zA-Z]{2,}$/;
                    var addressRegex =  /^[a-zA-Z0-9]{2,}$/;
                    var postalCodeRegex = /^[A-Z][0-9][A-Z]\s?[0-9][A-Z][0-9]$/;
                    var emailRegex = /^[A-Za-z0-9]{2,}[@][A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}$/;
                    var phoneRegex = /^(\d{3})[-](\d{3})[-](\d{4})$/;
                    var cardRegex = /^[0-9]{3,}$/;
                    //get value from input
                    var firstName = $('#firstName').val();
                    var lastName = $('#lastName').val();
                    var address = $('#address').val();
                    var city = $('#city').val();
                    var province = $('#province').val();
                    var postalCode = $('#postalCode').val();
                    var phone = $('#phone').val();
                    var creditNumber = $('#creditNumber').val();
                    var email = $('#email').val();
                    var securityCode = $('#securityCode').val();

                        if (!firstName.match(nameRegex)) {
                       
                            $('#firstName').css("background-color", "#F8E0F1");
                            $('#firstNameError').css("visibility","visible");
                              event.preventDefault();
                        }else{
                             $('#firstNameError').css("visibility","hidden");
                        }
                        if (!lastName.match(nameRegex)) {
                            $('#lastName').css("background-color", "#F8E0F1");
                            $('#lastNameError').css("visibility","visible");
                              event.preventDefault();
                        }else{
                             $('#lastNameError').css("visibility","hidden");
                        }
                             if (!address.match(addressRegex)) {
                            $('#address').css("background-color", "#F8E0F1");
                            $('#addressError').css("visibility","visible");
                              event.preventDefault();
                        }else{
                             $('#addressError').css("visibility","hidden");
                        }
                        if (!city.match(nameRegex)) {
                            $('#city').css("background-color", "#F8E0F1");
                            $('#cityError').css("visibility","visible");
                              event.preventDefault();
                        }else{
                             $('#cityError').css("visibility","hidden");
                        }
                        
                        if (!postalCode.match(postalCodeRegex)) {
                            $('#postalCode').css("background-color", "#F8E0F1");
                            $('#postalCodeError').css("visibility","visible");
                              event.preventDefault();
                        }else{
                            $('#postalCodeError').css("visibility","hidden");
                  
                        }
                        if (!phone.match(phoneRegex)) {
                            $('#phone').css("background-color", "#F8E0F1");
                            $('#phoneError').css("visibility","visible");
                              event.preventDefault();
                        }else{
                             $('#phoneError').css("visibility","hidden");
                        }
                        if (!email.match(emailRegex)) {
                            $('#email').css("background-color", "#F8E0F1");
                            $('#emailError').css("visibility","visible");
                              event.preventDefault();
                        }else{
                             $('#emailError').css("visibility","hidden");
                        }
                   
                        if (!creditNumber.match(cardRegex)) {
                            $('#creditNumber').css("background-color", "#F8E0F1");
                            $('#creditNumberError').css("visibility","visible");
                              event.preventDefault();
                        }else{
                             $('#creditNumberError').css("visibility","hidden");
                        }
                        if (!securityCode.match(cardRegex)) {
                         
                            $('#securityCode').css("background-color", "#F8E0F1");
                            $('#securityCodeError').css("visibility","visible");
                              event.preventDefault();
                        }else{
                             $('#securityCodeError').css("visibility","hidden");
                        }
                         // check if radio button is checked
                  isCredit = document.getElementById("paymentC").checked;
                  isPaypal = document.getElementById("paymentP").checked;
                
                      if(!isCredit && !isPaypal)   { //payment method button is not checked
                      $('#paymentError').css("visibility","visible");}
                     else{
                         $('#paymentError').css("visibility","hidden");

                     }
      
                    });
    });
            
               
