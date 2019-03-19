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
var serviceData = null;
var xArray = [];
var yArray = [];
var xFindArray = [];
var yMajorArray = [];

document.onkeypress = function(event) {
  if (event.charCode === 13) {
    goTo();
  }
};

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
    // treeFunction(serviceData);
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

function treeFunction(dataCoins) {
  var xValue = 0.000187;
  var yValue = 0.000187;
  var tree = new BinarySearchTree();


  function parseCoins(dataCoins) {
    // main function
    dataCoins.forEach(coin => {
      tree.add(parseFloat(coin.price_usd), coin);
    });
  }

  console.log('finding value from X coin..')
  var xFindFinalArray = tree.findX(xValue);
  var xFindFinalArray = tree.findX(coinName);
  console.log(xFindFinalArray);
  
  console.log('Getting inferior values than our Y coin..');
  var yFinalArray = tree.findY(yValue);
  console.log(yFinalArray);
  
  console.log('Getting superior values than our Y coin..');
  var yFinalMajorArray = tree.findMajorY(yValue);
  console.log(yFinalMajorArray);

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
    var growth = coin.price_usd;
    myObj.push({ name, growth });
  });

  myObj.sort(byGrowthDesc);

// ADD MY TREE HERE!!!!



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

function Node(value, data) {
  this.value = value;
  this.data = data !== undefined ? data : null;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  // Node.call(this);
  this.root = null;
}

BinarySearchTree.prototype.add = function(value, data) {
  if (this.root === null) {
    // console.log("entering add function");
    this.root = new Node(value, data);
  } else {
    // console.log("entering _add function");
    this._add(value, this.root, data);
  }
};

BinarySearchTree.prototype._add = function(value, node, data) {
  if (value < node.value) {
    if (node.left !== null) {
      this._add(value, node.left, data);
    } else {
      node.left = new Node(value, data);
    }
  } else {
    if (node.right !== null) {
      this._add(value, node.right, data);
    } else {
      node.right = new Node(value, data);
    }
  }
};

BinarySearchTree.prototype.printTree = function(coinName) {
  if (this.root !== null) {
    this.xArray = [];
    return this._printTree(this.root, this.xArray, coinName);
  }
};

BinarySearchTree.prototype._printTree = function(node, xArray) {
  if (node !== null) {
    this._printTree(node.left, xArray);
    xArray.push(node.data.name);
    this._printTree(node.right, xArray);
  }
  return xArray;
};

BinarySearchTree.prototype.findX = function(xValue) {
  // Pequisar todas as moedas com valor maior que X ou valor menor que X
  if (this.root !== null) {
    this.xFindArray = [];
    this._findX(xValue, this.root, this.xFindArray);
    return this.xFindArray;
  } else {
    return [];
  }
}

BinarySearchTree.prototype._findX = function(xValue, node, xFindArray) {
  if (xValue > node.value && node.left !== null) {
    xFindArray.push(node.data.name);
    return this._findX(xValue, node.left, xFindArray);

  } else if (xValue < node.value && node.right !== null) {
    xFindArray.push(node.data.name);
    return this._findX(xValue, node.right, xFindArray);
  }
}

BinarySearchTree.prototype.findMinorY = function(yValue) {
  // Procurar moedas com valor menor que a moeda Y
  if (this.root !== null) {
    this.yMinorArray = [];
    this._findMinorY(yValue, this.root, this.yMinorArray);
    return this.yMinorArray;
  } else {
    return [];
  }
}

BinarySearchTree.prototype._findMinorY = function(yValue, node, yArray) {
  // Procurar moedas com valor menor que a moeda Y

  // if (node.value === null ) {
    // return yArray;
  // } 
  
  if (yValue < node.value && node.left !== null) {
    return this._findMinorY(yValue, node.left, yArray);

  }
  else if (yValue >= node.value && node.right !== null) {
    yArray.push(node.data.name);
    return this._findMinorY(yValue, node.right, yArray);
  }
  return yArray;
}

BinarySearchTree.prototype.findMajorY = function(yValue) {
  // Procurar moedas com valor maior que a moeda Y
  if (this.root !== null) {
    this.yMajorArray = [];
    this._findMajorY(yValue, this.root, this.yMajorArray);
    return this.yMajorArray;
  } else {
    return [];
  }
}

BinarySearchTree.prototype._findMajorY = function(yValue, node, yMajorArray) {
  // Procurar moedas com valor maior que a moeda Y
  if (node.value === yValue) {
    return node.value;
    }

  else if (yValue < node.value && node.left !== null) {
    return this._findMajorY(yValue, node.left, yMajorArray);

  } else if (yValue > node.value && node.right !== null) {
    yMajorArray.push(node.data.name);
    return this._findMajorY(yValue, node.right, yMajorArray);
  }
}

BinarySearchTree.prototype.findValue = function(coinName) {
  // var res = [];
  if (this.root !== null) {
    return this.recurse(this.root);
    }
    // return this._findValue(coinName, this.root);
  else {
    return [];
  }
}


BinarySearchTree.prototype.recurse = function(node) {
  // console.log(node.data.name);
  console.log(node);
  if (node.data.name === coinName) {
    return node.value;
  }
  
  else {
    if (node.left !== null) {
    // if (node.left !== null && node.value > node.left.value) {
      return this.recurse(node.left);
    }
  
    else if (node.right !== null) {
    // else if (node.right !== null && node.value < node.right.value) {
      return this.recurse(node.right);
    }

    return undefined;
  }
}

var dataCoins = loadData();
console.log(dataCoins.length);
var tree = new BinarySearchTree();

function addToTree(dataCoins) {
  // main function
  dataCoins.forEach(coin => {
    tree.add(parseFloat(coin.price_usd), coin);
  });
}

addToTree(dataCoins);

var coinName = "Dogecoin";

// console.log(tree.findValue(coinName))
// tree.findValue(coinName);
var v = tree.findValue(coinName);
console.log(v);
// var v = value.data.price_usd
console.log('Got the value!',v);

// value = 0.000187;
// console.log(dataCoins);
// console.log('Getting all values from tree..')
// var xFinalArray = tree.printTree();
// xFinalArray.pop(-1);
// console.log(xFinalArray);

console.log('finding value from X coin..')
var xFindFinalArray = tree.findX(v);
console.log(xFindFinalArray);
// var xFindFinalArray = tree.findX(coinName);

console.log('Getting inferior values than our Y coin..');
var yMinorArray = tree.findMinorY(v);
console.log(yMinorArray);

// console.log('Getting superior values than our Y coin..');
// var yFinalMajorArray = tree.findMajorY(v);
// console.log(yFinalMajorArray);
