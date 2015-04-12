var page = new WebPage(), testindex = 0, loadInProgress = false;
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log("load finished");
};

var steps = [
  function() {
    //Load Login Page
    page.open("https://get.cbord.com/dartmouth/full/login.php");
  },
  function() {
    //Enter Credentials
    page.evaluate(function() {
      var arr = document.getElementsByTagName("input");
      var i;
      for (i=0; i < arr.length; i++) { 
        if (arr[i].getAttribute('name') == "username") {
 arr[i].setAttribute("value", 'robert.y.sayegh.18@dartmouth.edu');
        } else if (arr[i].getAttribute('name') == "password") {
 arr[i].setAttribute("value", 'Dummy123');
      }
 }
    });
  }, 
  function() {
    //Login
    page.evaluate(function() {
      var arr = document.getElementsByTagName("form");
      var i;

      for (i=0; i < arr.length; i++) {
 if (arr[i].getAttribute('name') == "login_form") {
document.login_form.submit.click();
console.log("Made it there");
           }
      }

    });
  }, 
  function() {sleep(2000);},
  function() {
    // Output content of page to stdout after form has been submitted
    page.evaluate(function() {
var arr = document.getElementsByTagName("td");
var foundKey=0;
for (var i=0; i< arr.length; i++) {
if (arr[i].getAttribute("class") == "first-child account_name") {
var DDS_Charging = arr[i+1].innerHTML;
foundKey = i+3;
break;
}
}
var DBA = arr[foundKey].innerHTML;
var swipes = arr[foundKey+6].innerHTML;
console.log("DDS: "+DDS_Charging+" DBA: "+DBA+" swipes: "+swipes);
//console.log(document.querySelectorAll('html')[0].outerHTML);
// return document.querySelectorAll('html')[0].outerHTML;
//console.log(document.querySelectorAll('tbody')[0].outerHTML);
    });
  }
];


interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    console.log("step " + (testindex + 1));
    steps[testindex]();
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    console.log("test complete!");
    phantom.exit();
  }
}, 50);