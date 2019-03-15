

function loadDoc(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(null);
  return JSON.parse(xhr.responseText);
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
    console.log("entering add function");
    this.root = new Node(value, data);
  } else {
    console.log("entering _add function");
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

BinarySearchTree.prototype._printTree = function(node) {
  if (node !== null) {
    this._printTree(node.left);
    console.log(node.value);
    this._printTree(node.right);
  }
};

BinarySearchTree.prototype.printTree = function() {
  if (this.root !== null) {
    this._printTree(this.root);
  }
};

var tree = new BinarySearchTree();

function parseCoins(dataCoins) {
  // main function
  dataCoins.forEach(coin => {
    tree.add(parseFloat(coin.price_usd), coin);
  });
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
  }

var dataCoins = loadData();
// console.log(dataCoins);
// parseCoins(dataCoins);
// console.log(tree.printTree());
