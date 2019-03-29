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
  var inputUser = document.getElementById("input-username");
  inputUser.onkeydown = function() {
    document.getElementById("login-fail").style.display = "none";
    document.getElementById("serverResponse").style.display = "none";
  };
  username = inputUser.value;
  pwd = document.getElementById("input-pwd").value;

  if (
    username !== "" &&
    username.includes("@") &&
    username.includes(".") &&
    pwd !== ""
  ) {
    loadToken(username, pwd);
    var token = localStorage.getItem("token");

    if (token !== undefined) {
      window.open("http://127.0.0.1:5500/monitor.html");
    }
  } else {
    document.getElementById("login-fail").style.display = "block";
    document.getElementById("input-pwd").value = "";
    return;
  }
}

function loadToken(username, pwd) {
  var url = "http://urano.eqs.local:8081/api/auth/login";
  loadAuthResponse(url, username, pwd);
  function loadAuthResponse(url, username, pwd) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (this.readyState == 4 && this.status == 200) {
        var tokenString = JSON.parse(this.responseText).Result.Token;
        localStorage.setItem("token", tokenString);
        const serverResponse = document.getElementById("serverResponse");
        serverResponse.innerHTML = "Login Successful";
        serverResponse.style.color = "#196B19";
        serverResponse.style.display = "block";
      } else {
        const serverResponse = document.getElementById("serverResponse");
        serverResponse.innerHTML = JSON.parse(this.responseText).Message;
        serverResponse.style.color = "#990000";
        serverResponse.style.display = "block";
        localStorage.removeItem("token"); // to remove token from local storage
      }
    };
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`email=${username}&password=${pwd}`);
  }
  return;
}

function loadMonitorData(token) {
  var url1 =
    "http://urano.eqs.local:8081/api/asset-monitor/operational-unit/list";
  loadMonitorResponse(url1);
  var data;
  function loadMonitorResponse() {
    var monitorRequest = new XMLHttpRequest();
    monitorRequest.onload = function() {
      if (this.readyState == 4 && this.status == 200) {
        // const serverResponse1 = document.getElementById("serverResponse");
        // serverResponse1.innerHTML = "Data here!";
        // serverResponse1.style.color = "#fff";
        // serverResponse1.style.display = "block";

        data = JSON.parse(this.responseText);
      } else {
        const serverResponse1 = document.getElementById("serverResponse");
        serverResponse1.innerHTML = this.responseText;
        serverResponse1.style.color = "#990000";
        serverResponse1.style.display = "block";
      }
    };
    monitorRequest.open("GET", url1, false);
    // monitorRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    monitorRequest.setRequestHeader("Content-Type", "application/json");
    monitorRequest.setRequestHeader("Authorization", "Bearer " + token);
    monitorRequest.send();
  }
  return data;
}

// function createTable(column, value) {
//   var x = document.createElement("TABLE");
//   x.setAttribute("id", "myTable");
//   document.body.appendChild(x);

//   var y = document.createElement("TR");
//   y.setAttribute("id", "myTr");
//   document.getElementById("myTable").appendChild(y);

//   var z = document.createElement("TD");
//   var t = document.createTextNode(value);
//   z.appendChild(t);
//   document.getElementById("myTr").appendChild(z);
// }
