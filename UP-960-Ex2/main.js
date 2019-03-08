/*
Criar um programa que gera aleatoriamente cores CSS no formato "#XXXXXX".
*/

// randomly generated N = 40 length array 0 <= A[N] <= 39
// const numbers = Array.from({ length: 100 }, () => Math.floor(Math.random() * 40));
// console.log(numbers);

"use strict";

let newColor = '#';
let letters = ["a", "b", "c", "d", "e", "f"];
let text = "Changing this one!";
// let newColor;

function changeColor(color) {
  document.getElementById("color2").innerHTML = `${text}`;
  document.getElementById("color2").style.color = `${color}`;
  document.getElementById("color1").style.background = `${color}`;
  console.log(color)
}

// Ferrao Answer
// '#' + Math.ceil(Math.random() * 0xFFFFFF).toString(16)

function genColor(letters, newColor) {
  for (let i = 0; i < 6; i++) {
    let digit = Math.floor(Math.random() * 9);
    let l = Math.floor(Math.random() * 5);
    let letter = letters[l];
    let pick = Math.floor(Math.random()*2) + 1;
    if (pick === 1) {
      newColor += digit;
    }
    else {
      newColor += letter;
    }
  }
  changeColor(newColor)
}

genColor(letters, newColor);
