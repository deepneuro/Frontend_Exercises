/*
Criar um programa em que dado um array numericos encontra o elemento com maior frequencia.

Para todos os exercícios:
- Instalar NodeJS (8.X) e npm

- Criar novo projeto (package.json) com ficheiro main.js a imprimir "Hello UNO"

- Ao longo de todos os exercicios nunca utilizar bibliotecas externas.

*/

// randomly generated N = 40 length array 0 <= A[N] <= 39
// const numbers = Array.from({ length: 100 }, () => Math.floor(Math.random() * 40));
// console.log(numbers);
'use strict';
const numbers = [
  36,
  2,
  13,
  3,
  18,
  38,
  35,
  34,
  14,
  13,
  2,
  24,
  26,
  35,
  10,
  9,
  32,
  29,
  13,
  21,
  19,
  6,
  26,
  2,
  38,
  35,
  22,
  7,
  33,
  14,
  24,
  11,
  30,
  30,
  31,
  7,
  2,
  9,
  23,
  13,
  7,
  28,
  0,
  15,
  34,
  25,
  33,
  8,
  16,
  7,
  35,
  5,
  14,
  39,
  29,
  24,
  33,
  13,
  21,
  8,
  29,
  5,
  12,
  3,
  13,
  22,
  36,
  27,
  1,
  34,
  20,
  1,
  35,
  33,
  25,
  9,
  18,
  6,
  32,
  8,
  17,
  3,
  24,
  36,
  14,
  33,
  3,
  0,
  7,
  14,
  36,
  17,
  5,
  32,
  30,
  31,
  30,
  3,
  26,
  11,
  37,
  8,
  27
];

const visited = [];
const recording = {};
let maxValue = 1;
const res = 0;
let result;

function getMostFreq(numbers, visited, recording, maxValue, res) {
  for (let i = 0; i < numbers.length; i++) {
    if (visited.indexOf(numbers[i]) === -1) {
      visited.push(numbers[i]);
      recording[numbers[i]] = 1;
    }
    else {
      recording[numbers[i]] += 1;
      if (recording[numbers[i]] > maxValue) {
        maxValue = recording[numbers[i]];
        res = numbers[i];
      }
    }
  }
return res, maxValue
}

result, maxValue = getMostFreq(numbers, visited, recording, maxValue, res);

document.getElementById("start").innerHTML = 'Hello UNO';
document.getElementById("results").innerHTML = `The most frequent element is number ${result} with a total of ${maxValue} hits.`;
