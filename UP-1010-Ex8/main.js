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
    return this._printTree(this.root, coinName);
  }
};

BinarySearchTree.prototype._printTree = function(node, xArray, coinName) {
  if (node !== null) {
    this._printTree(node.left, xArray, coinName);
    xArray.push(node.data.name);
    this._printTree(node.right, xArray, coinName);
  }
  return xArray;
};

BinarySearchTree.prototype.getAllCoins = function(coinName) {
    if (this.root !== null) {
      this.valueArray = [];
      return _getAllCoins(this.root, this.valueArray, v);
    }
  
    function _getAllCoins(node, valueArray) {
      if (node !== null) {
        if (node.data.name !== coinName) {
          valueArray.push(node.data.name);
          }
  
        _getAllCoins(node.left, valueArray);
        _getAllCoins(node.right, valueArray);
      }
      return valueArray;
    };
  };

BinarySearchTree.prototype.getCoinMinor = function(v) {
  if (this.root !== null) {
    this.valueArray = [];
    return _getCoinMinor(this.root, this.valueArray, v);
  }

  function _getCoinMinor(node, valueArray) {
    if (node !== null) {
      if (node.value <= v) {
        valueArray.push(node.data.name);
      }
      _getCoinMinor(node.left, valueArray);

      _getCoinMinor(node.right, valueArray);
    }
    return valueArray;
  };
};

BinarySearchTree.prototype.getCoinMajor = function(v) {
  if (this.root !== null) {
    this.valueArray = [];
    return _getCoinMajor(this.root, this.valueArray, v);
  }

  function _getCoinMajor(node, valueArray) {
    if (node !== null) {
      if (node.value > v) {
        valueArray.push(node.data);
        }
      _getCoinMajor(node.left, valueArray);

      _getCoinMajor(node.right, valueArray);
    }
    return valueArray;
  };
};

var dataCoins = loadData();
console.log('number of coins:', dataCoins.length);
var tree = new BinarySearchTree();

function addToTree(dataCoins) {
  // main function
  dataCoins.forEach(coin => {
    tree.add(parseFloat(coin.price_usd), coin);
  });
}

addToTree(dataCoins);

var coinName = "Jesus Coin";

console.log('Getting coin Price USD from coinName in Tree..')
var v = tree.getValue(coinName);
console.log(v);

console.log('Minor and Major coin values than input coin value..');
var allCoins = tree.getAllCoins(coinName);
console.log(allCoins);

console.log('Minor coin values than input coin value..');
var minorCoins = tree.getCoinMinor(v);
console.log(minorCoins);

console.log('Major coin values than input coin value..');
var majorCoins = tree.getCoinMajor(v);
console.log(majorCoins);

