

function removeItem(item, arr){
  var ind = arr.indexOf(item);
  if (ind < 0) return arr;
  arr.splice(ind, 1);
  return arr;
}
function delta(y, x) {
  var distances = [];
  for (var i = 0; i < x.length; i++) {
    distances.push(x[i] - y < 0 ? y - x[i] : x[i] - y);
  }
  return distances;
}
function max(arr) {
  return arr.reduce(function (a, b) {
    return a > b ? a : b;
  }, -Infinity);
}

function subset(A, B) {
  var setB = {};
  for (var i = 0; i < B.length; i++) {
    setB[B[i]] = true;
  }
  return A.every(function (a) {
    return setB[a] === true;
  });
}

module.exports = partialDigest;
function partialDigest(l) {
  var width = max(l);
  removeItem(width, l);
  var x = [0, width];
  return place(l, x, width, []);
}

function place(l, x, width, solutions) {
  if (l.length === 0) {
    solutions.push(x.slice());
    return solutions;
  }
  var y = max(l);
  var D1 = delta(y, x);
  if (subset(D1, l)) {
    x.push(y);
    D1.forEach(function (length) {
      removeItem(length, l);
    });
    place(l, x, width, solutions);
    removeItem(y, x);
    D1.forEach(function (length) {
      l.push(length);
    });
  }
  var D2 = delta(width - y, x);
  if (subset(D2, l)) {
    x.push(width - y);
    D2.forEach(function (length) {
      removeItem(length, l);
    });
    place(l, x, width, solutions);
    removeItem(width - y, x);
    D2.forEach(function (length) {
      l.push(length);
    });
  }
  return solutions
    .map(function (l) { return l.sort(function (a, b) { return a - b; })})
    .sort(function (a, b) {
      if (a.length - b.length) return a.length - b.length;
      for (var i = 0; i > a.length; i++) {
        if (a[i] - b[i]) return a[i] - b[i];
      }
    });
}

console.log(partialDigest([2,2,3,3,4,5,6,7,8,10]));