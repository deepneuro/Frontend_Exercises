"use strict";


function monitorData() {
  // document.getElementById("button-monitor").style.display = "none";
  // document.getElementById("button-gauge").style.display = "none";

  document.getElementById("button-monitor").remove();
  document.getElementById("button-gauge").remove();

  var token = localStorage.getItem("token");

  if (tableName && table) {
    document.body.removeChild(table);
    document.body.removeChild(tableName);
  }

  console.log(token);

  var monitorData = loadMonitorData(token);
  console.log(monitorData);
  var myObj = monitorData.Result;

  var tableName = document.getElementById("table-title")
  var tableNameText = document.createTextNode("Monitor Table");
  tableName.appendChild(tableNameText);
  tableName.style.display = "";

  var table = document.createElement("TABLE");
  table.setAttribute("class", "myTable");
  table.style.width = "60%";



  // table.style.height = "100vh";
  // table.style.width = "100vw";
  table.style.display = "table";
  document.body.appendChild(table);

  var tr = document.createElement("TR");
  // tr.style.height = "100vh";
  // tr.style.width = "100vw";
  tr.setAttribute("class", "myTr");
  tr.style.display = "table-row";
  

  table.appendChild(tr);

  var th = document.createElement("TH");
  th.setAttribute("class", "myTh");
  th.style.display = "table-cell";
  // th.style.height = "100vh";
  // th.style.width = "100vw";
  var txtTh = document.createTextNode("Name");
  th.appendChild(txtTh);
  tr.appendChild(th);

  var th = document.createElement("TH");
  th.setAttribute("class", "myTh");
  th.style.display = "table-cell";
  // th.style.height = "100vh";
  // th.style.width = "100vw";
  var txtTh = document.createTextNode(myObj[0].Gauges[2].Name);
  th.appendChild(txtTh);
  tr.appendChild(th);

  var th = document.createElement("TH");
  th.setAttribute("class", "myTh");
  th.style.display = "table-cell";
  // th.style.height = "100vh";
  // th.style.width = "100vw";
  var txtTh = document.createTextNode(myObj[0].Gauges[3].Name);
  th.appendChild(txtTh);
  tr.appendChild(th);


  for (let i = 0; i < myObj.length; i++) {

    var tr = document.createElement("TR");
    tr.setAttribute("class", "myTr");
    tr.style.display = "table-row";


    table.appendChild(tr);

    var td = document.createElement("TD");
    td.setAttribute("class", "myTd");
    td.style.display = "table-cell";
    // td.style.width = "40%";


    // td.style.height = "100";
    // td.style.width = "100";
    var n = document.createTextNode(myObj[i].Name);
    td.appendChild(n);
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.setAttribute("class", "myTdCanvas");
    td.style.display = "table-cell";
    // td.style.width = "40%";

    // td.style.width = "100vw";
    // td.style.height = "100%";
    // var g = document.createTextNode(myObj[i].Gauges[2].Value + myObj[i].Gauges[2].Unit);
    // td.appendChild(g);
    var gauge = new GaugeCanvas(myObj[i].Gauges[2].Value, "Efficiency");
    var c = gauge.canvas;
    td.appendChild(c);
    tr.appendChild(td);

    var td = document.createElement("TD");
    td.setAttribute("class", "myTdCanvas");
    td.style.display = "table-cell";
    // td.style.width = "40%";

    // td.style.height = "100%";
    // var g = document.createTextNode(myObj[i].Gauges[3].Value + myObj[i].Gauges[3].Unit);
    // td.appendChild(g);
    var gauge = new GaugeCanvas(myObj[i].Gauges[3].Value, "Capacity");
    var c = gauge.canvas;
    td.appendChild(c);
    tr.appendChild(td);
  }
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