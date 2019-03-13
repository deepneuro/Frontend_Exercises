/*
Criar um programa que chama o serviço descrito 
em https://www.coinlore.com/cryptocurrency-data-api e lista as 
10 criptomoedas com maior crescimento nos ultimo 7 dias.
*/

"use strict";
var start;
var url = "https://api.coinlore.com/api/tickers/";
var input, filter;
var topTen;

document.onkeypress = function(event) {
  if (event.charCode === 13) {
    goTo();
  }
};

var serviceData = null;

function goTo() {
  var input = document.getElementById("searchId");
  input.onkeydown = function() {
    goTo();
  };

  filter = input.value.toUpperCase();

  if (filter !== "") {
    if (serviceData === null) {
      serviceData = loadData();
    }
    myFunction(serviceData);
  }
}

function loadData(start = 0) {
  var url = `https://api.coinlore.com/api/tickers/?start=${start}&limit=100`;
  var data = loadDoc(url);

  if (data.data === undefined) {
    return [];
  }

  if (data.data.length < 100) {
    return data;
  } else {
    return data.data.concat(loadData(start + 100));
  }

  return [];
}

function loadDoc(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(null);
  return JSON.parse(xhr.responseText);
}

function byGrowthDesc(a, b) {
  if (parseFloat(a.growth) < parseFloat(b.growth)) return 1;
  if (parseFloat(a.growth) > parseFloat(b.growth)) return -1;
  return 0;
}

function myFunction(data) {
  /*
  Ferrao answer
  data.sort((a, b) => {return parseFloat(b.percent_change_7d) - parseFloat(a.percent_change_7d)});
  console.log(data.slice(0, 7));
  */

  var myObj = [];

  data.forEach(coin => {
    var name = coin.name;
    var growth = coin.percent_change_7d;
    myObj.push({ name, growth });
  });

  myObj.sort(byGrowthDesc);

  var table = document.getElementById("myTable");

  while (table.children.length > 1) {
    table.removeChild(table.children[1]);
  }

  for (let i = 0; i < myObj.length - 1; i++) {
    var myMatch = myObj[i].name.toUpperCase().match(filter);

    if (myMatch && myMatch["index"] === 0) {
      var tr = document.createElement("TR");
      tr.setAttribute("id", "myTr");
      table.appendChild(tr);

      var td = document.createElement("TD");
      var n = document.createTextNode(myObj[i].name);
      td.appendChild(n);
      td.style.display = "";
      table.appendChild(td);

      var td = document.createElement("TD");
      var g = document.createTextNode(myObj[i].growth);
      td.appendChild(g);
      td.style.display = "";
      table.appendChild(td);
    }
  }
}
