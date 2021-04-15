const canvas = document.getElementById("canvas");
const newCanvasBtn = document.getElementById("newCanvas");
const clearCanvasBtn = document.getElementById("clearCanvas");
const pencilButtons = document.querySelectorAll(".pencil");
const pencilButtonsDiv = document.getElementById("pencilButtonsDiv");
const colorPicker = document.getElementById("colorPicker");
const pencilIconColor = document.querySelector(".fa-pencil-alt");
const para = document.getElementById("clickHere");
let pencilType;

// inital settings
let sideSquares = 16;
let totalNumberSquares = 256;
let click = false;

// creates an array with the necessary number of divs, sets class, and appends to canvas; creates grid
function createDivs(sideSquares, totalNumberSquares) {
  let divsArray = [];
  for (let i = 0; i < totalNumberSquares; i++) {
    divsArray[i] = document.createElement("div");
    divsArray[i].setAttribute("class", "innerdivs");
    canvas.appendChild(divsArray[i]);
  }
  canvas.style.gridTemplateColumns = "repeat(" + sideSquares + ", 1fr)";
}

// on click on canvas adds or removes event listeners to each innerdivs
function colorInnerDivs(innerDivs) {
  if (!click) {
    innerDivs.forEach((item) => {
      item.addEventListener("mouseover", brushPicker);
    });
    click = true;
    return click;
  } else if (click) {
    innerDivs.forEach((item) => {
      item.removeEventListener("mouseover", brushPicker);
    });
    click = false;
    return click;
  }
}

// create initial canvas and listens for clicks on canvas; on click, draws
window.onload = createDivs(sideSquares, totalNumberSquares);
canvas.addEventListener("click", function (event) {
  para.style.display = "none";
  colorInnerDivs(document.querySelectorAll("div.innerdivs"), click);
});

// **Clear Canvas ** without changing its size
clearCanvasBtn.addEventListener("click", function (event) {
  const innerDivs = document.querySelectorAll("div.innerdivs");
  for (let i = 0; i < innerDivs.length; i++) {
    innerDivs.item(i).remove();
  }
  createDivs(sideSquares, totalNumberSquares);
});

// **New Size Canvas ** prompts user for desired number of side squares, validates input, clears previous canvas and dcreates new canvas with provided settings
newCanvasBtn.addEventListener("click", function (event) {
  sideSquares = window.prompt(
    "Select the number of squares per side (number between 5 and 99).",
    16
  );
  if (validateSize(sideSquares)) {
    totalNumberSquares = sideSquares * sideSquares;
    // selects all innerdivs and deletes each one
    const innerDivs = document.querySelectorAll("div.innerdivs");
    for (let i = 0; i < innerDivs.length; i++) {
      innerDivs.item(i).remove();
    }
    createDivs(sideSquares, totalNumberSquares);
  }
});

function validateSize(sideSquares) {
  let sideSquaresNumber = Number(sideSquares);
  if (sideSquares === "" || sideSquares === null) {
    return false;
  }
  if (Number.isNaN(sideSquaresNumber)) {
    alert("Please select a number.");
    return "ERROR";
  } else if (sideSquares < 5 || sideSquares > 100) {
    alert("Please select a number larger than 5 and smaller than 100.");
    return "ERROR";
  } else return true;
}

// ** Brush Options **
// color divs according to selected brush. changes color for pencil if user selected a new color
function brushPicker(event) {
  if (pencilType === "pencil") {
    event.target.style.backgroundColor = colorPicker.value;
    pencilIconColor.style.color = colorPicker.value;
    event.target.classList.add("switchedPencil");
  } else if (pencilType === "crazy") {
    event.target.style.backgroundColor = randomRGB();
    event.target.classList.add("switchedPencil");
  } else {
    var element = event.target;
    // if the user switched pencils, resets the mouseover counter
    if (event.target.classList.contains("switchedPencil")) {
      element.mouseover = 0;
      event.target.classList.remove("switchedPencil");
    }
    element.mouseover = (element.mouseover || 0) + 1;
    switch (element.mouseover) {
      case 1:
        event.target.style.backgroundColor = darkenColor(85);
        break;
      case 2:
        event.target.style.backgroundColor = darkenColor(75);
        break;
      case 3:
        event.target.style.backgroundColor = darkenColor(65);
        break;
      default:
        event.target.style.backgroundColor = darkenColor(55);
        break;
    }
  }
}

// listens for selection of pencil
pencilButtonsDiv.addEventListener("click", function (event) {
  switch (event.target.getAttribute("id")) {
    case "pencil":
      pencilType = "pencil";
      break;
    case "crazy":
      pencilType = "crazy";
      break;
    case "spray":
      pencilType = "spray";
      break;
  }
});

// random number selection
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// random color selection
function randomRGB() {
  let redRgb = randomInt(0, 255);
  let greenRgb = randomInt(0, 255);
  let blueRgb = randomInt(0, 255);
  let newColor = `rgb(${redRgb}, ${greenRgb}, ${blueRgb})`;
  return newColor;
}

//changes lightness of color and returns updated color
function darkenColor(lightness) {
  let darkerColor = "hsl(96, 56%," + lightness + "%)";
  return darkerColor;
}
