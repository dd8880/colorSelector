"use strict";

const colorPicker = document.querySelector("#colorId");

colorPicker.addEventListener("input", getUserInput);

function getUserInput(e) {
  const hexColor = e.target.value;
  displayChanges(hexColor);
}

function displayChanges(hexColor) {
  const rgb = hexToRgb(hexColor);
  const rgbColor = rgbToCss(rgb);
  const hsl = rgbToHsl(rgb);
  const hex = rgbToHex(rgb);

  updateOutput(rgbColor);
  updateHex(hex);
  updateHsl(hsl);
  updateRgb(rgb);
}

function updateOutput(color) {
  document.querySelector(".output").style.backgroundColor = color;
}

function updateHex(hex) {
  document.querySelector(".hex > span").textContent = hex;
}

function updateRgb(rgbObject) {
  document.querySelector(
    ".rgb > span"
  ).textContent = `${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b}`;
}

function updateHsl(hsl) {
  document.querySelector(
    ".hsl > span"
  ).textContent = `${hsl.h}, ${hsl.s}, ${hsl.l}`;
}

// hex to rgb function
function hexToRgb(hex) {
  const hexStr = hex.slice(1);
  const red = parseInt(hexStr.substring(0, 2), 16);
  const green = parseInt(hexStr.substring(2, 4), 16);
  const blue = parseInt(hexStr.substring(4, 6), 16);

  return {
    r: red,
    g: green,
    b: blue,
  };
}

// rgb to css string function
function rgbToCss(rgbObject) {
  return `rgb(${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b})`;
}

// rgb to hsl function
function rgbToHsl(rgbObject) {
  let r = rgbObject.r;
  let g = rgbObject.g;
  let b = rgbObject.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  //console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing

  return {
    h: `${h.toFixed(0)}`,
    s: `${s.toFixed(0)}%`,
    l: `${l.toFixed(0)}%`,
  };
}

function rgbToHex(rgbObject) {
  let hex = "#";

  hex += getBasicHexColor(rgbObject.r);
  hex += getBasicHexColor(rgbObject.g);
  hex += getBasicHexColor(rgbObject.b);

  return hex;
}

// get two hex numbers for every color (reg, green, and blue)
function getBasicHexColor(rgbNumber) {
  let twoOfHex = "";
  const char1 = Math.floor(rgbNumber / 16);
  twoOfHex += getHexChar(char1);
  const char2 = rgbNumber % 16;
  twoOfHex += getHexChar(char2);
  return twoOfHex;
}

// turn hex number to hex character
function getHexChar(num) {
  if (num >= 0 && num <= 9) {
    return num;
  } else if (num === 10) {
    return "A";
  } else if (num === 11) {
    return "B";
  } else if (num === 12) {
    return "C";
  } else if (num === 13) {
    return "D";
  } else if (num === 14) {
    return "E";
  } else if (num === 15) {
    return "F";
  }
}