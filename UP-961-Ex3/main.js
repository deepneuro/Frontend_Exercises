/*
Criar um programa que dadas duas strings encontra o maior padrao comum.
Por exemplo "zdcmangularoiiehdbas" e "pqwrangulkarmwhs" retorna "angular".
*/

"use strict";

// const x = "zdqwertycmangularoiiehqwertyqwertydbas";
// const y = "pqwrangulkarmwhsqwertyqwertyangular";

// const x = "zdqweabcdefabcdqwertyqwertyyyefabcdefrqwertytycmangularoiiehqwertyqwertyydbasqwertyqwe";
// const y = "pqwrangulkarmwhsqwertyqwertyyyanguqwertyqwelarabcdef";
// const x = "aa";
// const y = "a";

const x = "zdcmangularoiiehdbas";
const y = "pqwrangularmwhs";
var res = "";

function getCommonPattern() {
  if (x.length < y.length) {
    var smallString = x;
    var largeString = y;
  } else {
    var smallString = y;
    var largeString = x;
  }
  for (let i = 0; i < smallString.length; i++) {
    for (let j = 0; j < largeString.length; j++) {
      var matchSub = "";
      if (smallString[i] === largeString[j]) {
        matchSub += " " + largeString[j];
      }
      var subInd = 1;
      while (
        i + subInd < smallString.length &&
        j + subInd < largeString.length
      ) {
        // console.log("large", largeString.substring(j, subInd));
        // console.log("small", smallString.substring(i, subInd));
        // console.log("subInd:", subInd, "i:", i, "j:", j);
        if (
          largeString.substring(j, j+subInd) === smallString.substring(i, i+subInd)
        ) {
          matchSub += " " + largeString.substring(j, j+subInd);
          subInd += 1;
          // console.log('This is matchSub',matchSub);
        } else {
          subInd += 1;
        }
      }
      if (matchSub.length > res.length) {
        res = matchSub;
      }
    }
  }
  res = res.split(' ');
  console.log('Final result:', res[res.length -1]);
  return res[res.length -1];
}

res = getCommonPattern();

document.getElementById("long").innerHTML = `Maior padrao comum: ${res}`;

