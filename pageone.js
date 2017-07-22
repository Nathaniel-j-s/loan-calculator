// Some quick jQuery to make the page look right. ===
$("#formentry").hide();
$(".validation").hide();
$(".calced").hide();

// Loan amount/payment/etc calculation. =============
var loanAmount = 0;
var loanPeriod = 0;
var adjusted = 0;
var loanTotal = 0;
var monthlyPay = 0;

const calcTotal = function(amt, time) {
  loanTotal = (amt * Math.pow(1.12, time)).toFixed(2);
}; // Does the math to figure out how much interest gathers up in the given time.

const calcMonthlyPay = function(time) {
  monthlyPay = (loanTotal / (time * 12)).toFixed(2);
}; // Divides the loan up evenly into payments.

const calcStuff = function() {
  loanAmount = document.getElementById('loanamount').value; // These two lines give our variables above the client's selections.
  loanPeriod = document.getElementById('loanperiod').value;
  adjusted = loanAmount.replace(/[^0-9.]/g, ''); // Regex removes all values entered that are not digits or periods to turn it into a usable number.
  calcTotal(adjusted, loanPeriod); // Running the two functions above this, given the new information.
  calcMonthlyPay(loanPeriod);
  if (monthlyPay != 0) { // Determines if client has entered any numbers into loanamount and spits out calculations appropriately.
    $(".calced").show();
    document.getElementById('totalcost').innerHTML = "$" + loanTotal + " will be your total cost with interest, if you only make the minimum payment every month for the full " + loanPeriod + " year period.";
    document.getElementById('monthly').innerHTML = "$" + monthlyPay + " is the minimum payment amount per month.";
    $("#formentry").show();
  } else { // Or asks the client for input if they didn't enter any numbers.
    document.getElementById('totalcost').innerHTML = "Please enter a dollar amount in the box above.";
    document.getElementById('monthly').innerHTML = "";
    $("#formentry").hide();
  };
};

// Information validity checker =====================
var clientInfo = { // There is probably a good way around creating this object.
  name: 0, // But I do appreciate that it keeps all of the client's info in a very tidied up way.
  phone: 0, // Plus, this helps differentiate from the localStorage below.
  email: 0,
  zip: 0,
  initial: 0,
  time: 0,
  loan: 0,
  month: 0,
};

const validateClient = function() {
  var nameresult = document.getElementById('clientname').value;
  if (nameresult) { // Only checks if client has entered ANYTHING for a name.
    clientInfo.name = nameresult;
  };

  var phoneresult = document.getElementById('clientphone').value;
  if (phoneresult.length === 12) { // Does not check if all entries are digits, unfortunately.
    clientInfo.phone = phoneresult;
  };

  var emailresult = document.getElementById('clientemail').value;
  const checker = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (checker.test(emailresult)) { // Runs the provided email against this Regex to see if it is in valid email format.
    clientInfo.email = emailresult; // Whether or not it is an email that actually exists cannot be checked here.
  };

  var zipresult = document.getElementById('clientzip').value;
  if (zipresult.length === 5) { // Just checks if they used a five digit zip. Comparing to offices comes on page 2.
    clientInfo.zip = zipresult;
  };

  clientInfo.initial = '$' + loanAmount; // These four lines just fill out the remaining values of the clientInfo object.
  clientInfo.time = loanPeriod + " years"
  clientInfo.loan = '$' + loanTotal;
  clientInfo.month = '$' + monthlyPay;

  if (clientInfo.name === 0 || clientInfo.phone === 0 || clientInfo.email === 0 || clientInfo.zip === 0 || clientInfo.loan === 0 || clientInfo.month === 0) {
    $(".validation").show();
    $("#failuremessage").show(function() {
      $("#successmessage").hide();
    }); // If all sections of the clientInfo object have NOT been successfully modified, will show a simple error.
  } else {
    localStorage.setItem('clientname', clientInfo.name); // These eight lines put the client's info into localStorage.
    localStorage.setItem('clientphone', clientInfo.phone); // There has to be a more efficient way to do this.
    localStorage.setItem('clientemail', clientInfo.email); // But trying to set the clientInfo object
    localStorage.setItem('clientzip', clientInfo.zip); // seemed to cause a whole bunch of errors due to the
    localStorage.setItem('clientinitial', clientInfo.initial); // format of the Storage object.
    localStorage.setItem('clienttime', clientInfo.time); // I'll look into it more. It's interesting.
    localStorage.setItem('clientloan', clientInfo.loan);
    localStorage.setItem('clientmonth', clientInfo.month);
    $(".validation").show();
    $("#successmessage").show(function() {
      $("#failuremessage").hide();
    }); // If all sections HAVE been successfully modified, shows a message and a link to page 2.
  };
};
