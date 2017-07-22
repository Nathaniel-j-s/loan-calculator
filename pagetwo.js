// Information sent to second page. =================
var clientName = localStorage.getItem('clientname'); // Grabbing all of the information from localStorage.
var clientPhone = localStorage.getItem('clientphone'); // Again, there has to be a better way.
var clientEmail = localStorage.getItem('clientemail');
var clientZip = localStorage.getItem('clientzip');
var clientInitial = localStorage.getItem('clientinitial');
var clientTime = localStorage.getItem('clienttime');
var clientLoan = localStorage.getItem('clientloan');
var clientMonth = localStorage.getItem('clientmonth');

document.getElementById('clientname').innerHTML = clientName; // These eight lines, on the other hand, seem to be necessary.
document.getElementById('clientphone').innerHTML = clientPhone; // These apply the info taken from localStorage
document.getElementById('clientemail').innerHTML = clientEmail; // to the table in result.html.
document.getElementById('clientzip').innerHTML = clientZip;
document.getElementById('clientinitial').innerHTML = clientInitial;
document.getElementById('clienttime').innerHTML = clientTime;
document.getElementById('clientloan').innerHTML = clientLoan;
document.getElementById('clientmonth').innerHTML = clientMonth;

// Final page things ================================
$(".officeoption").hide();// jQuery to hide all of the options until the switch statement below determines which one to show.

switch(clientZip) { // Then comes the VERY simple matter of using clientZip to determine which office to show the client.
  case '89502': // Using a switch statement because who couldn't use more practice on these things?
    $("#successfulzip").show();
    $("#officeone").show();
    break;
  case '89431':
    $("#successfulzip").show();
    $("#officetwo").show();
    break;
  case '04604': // This zip code was probably just a typo, but I thought it was a funny one, so I'm keeping it.
    $("#successfulzip").show();
    $("#officethree").show();
    break;
  default:
    console.log(clientZip);
    $("#nooffice").show();
}
