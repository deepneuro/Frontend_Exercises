"use strict";

var url = "";
var username, pwd;

document.onkeypress = function(event) {
    if (event.charCode === 13) {
      goTo();
    }
  };

var serviceData = null;
function goTo() {
    var input = document.getElementById("input-username");
    input.onkeydown = function() {
    document.getElementById("login-fail").style.display = "none";
    }

    username = input.value;

    pwd = document.getElementById("input-pwd").value;

    // username = input[name="email"].value;
    // pwd = input[name="pwd"].value;
    
    
    if ((username !== "" && username.includes("@") && username.includes(".")) && pwd !== "") {
    console.log(username);
    console.log(pwd);

    } else {
        document.getElementById("login-fail").style.display = "block";
        // document.getElementById("input-username").value = '';
        document.getElementById("input-pwd").value = '';
    }

      if (serviceData === null) {
        serviceData = loadData(username, pwd);
        console.log(serviceData);
      }
    //   myFunction(serviceData);

}
  
function loadData(username, pwd) {
    var url = "http://urano.eqs.local:8081/api/auth/login";
    // dataParam: {email: username, password: pwd }
    var token = [];
    var data = loadDoc(url, username, pwd, token);
    return data;
  }

  function loadDoc(url, username, pwd, token) {
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        // console.log(this.responseText);

        if (this.readyState == 4 && this.status == 200) {
            // const serverResponse = document.getElementById('serverResponse');
            // serverResponse.innerHTML = xhr.responseText;
            // serverResponse.style.color = "#fff";
            // console.log(token);
        }
    };

    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`email=${username}&password=${pwd}`);
    return JSON.parse(xhr.responseText);
  }
  




