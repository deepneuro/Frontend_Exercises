/*
Criar um programa que chama o serviço descrito 
em https://www.coinlore.com/cryptocurrency-data-api e lista as 
10 criptomoedas com maior crescimento nos ultimo 7 dias.
*/

"use strict";
var url = `https://api.coinlore.com/api/tickers/`;

function loadDoc(url, cFunction) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");

  xhttp.send();
}

function byGrowthDesc(a, b) {
  if (parseFloat(a.growth) < parseFloat(b.growth)) return 1;
  if (parseFloat(a.growth) > parseFloat(b.growth)) return -1;
  return 0;
}

function myFunction(xhttp) {
  var data = JSON.parse(xhttp.responseText);
  /*
  Ferrao answer
  data.sort((a, b) => {return parseFloat(b.percent_change_7d) - parseFloat(a.percent_change_7d)});
  console.log(data.slice(0, 7));
*/
  var myObj = [];
  data.data.forEach(coin => {
    var name = coin.name;
    var growth = coin.percent_change_7d;
    myObj.push({ name, growth });
  });
  myObj.sort(byGrowthDesc);
  // console.log(JSON.stringify(myObj.slice(0,10)));
  var topTen = myObj.slice(0, 10);
  console.log(topTen);
  var message = '';
  for (let i = 0; i < topTen.length; i++) {
    var par = document.createElement("p");
    var text = document.createTextNode(`${topTen[i].name} : ${topTen[i].growth}`);
    par.appendChild(text);
    document.body.appendChild(par);
    //var message = message + ;
  }
 // document.getElementById("demo").innerHTML = message
}
var topTen = loadDoc(url, myFunction);
