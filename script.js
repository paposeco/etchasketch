const outerDiv = document.querySelector("#outerdiv");
const clearButton = document.querySelector("#clear");
const pencilButtons = document.querySelectorAll(".pencil");
const pencilButtonsDiv = document.querySelector("#pencilButtonsDiv");
let pencilType;

// name each node of the requested squares
function createDivsNames(sideSquares, divArray) {
  for (let i = 0; i < sideSquares; i++) {
    divArray.push("div" + i);
  }
  return divArray;
}

// creates a div for each node on the divArray and appends to outerdiv
function createDivs(sideSquares, totalNumberSquares) {
  let divArray = [];
  createDivsNames(totalNumberSquares, divArray); //returns divArray
  for (let j = 0; j < divArray.length; j++) {
    divArray[j] = document.createElement("div");
    divArray[j].setAttribute("class", "innerdivs");
    outerDiv.appendChild(divArray[j]);
  }
  // divide available space on page between the requested squares and stores the created divs
  outerDiv.style.gridTemplateColumns = "repeat(" + sideSquares + ", 1fr)";
  const innerDivs = document.querySelectorAll("div.innerdivs");
}

// create initial canvas
createDivs(16, 256);

// listens to mouseover on the outerdiv, and if no pencil is selected, draws with the pretty pencil

outerDiv.addEventListener("mouseover", function (event) {
  // changes pencil between boring (one color), crazy(multiple random colors) and the pretty/default option (color gets darker after passing over div more than once)

  if (pencilType === "boring") {
    event.target.style.backgroundColor = "lightblue";
  } else if (pencilType === "crazy") {
    event.target.style.backgroundColor = randomRGB();
  } else {
    var element = event.target;
    element.mouseover = (element.mouseover || 0) + 1;
    // the mouseover counter doesn't reset when switching to this pencil and uses the darker color :: to be fixed
    switch (element.mouseover) {
      case 1:
        event.target.style.backgroundColor = darkenColor(90);
        break;
      case 2:
        event.target.style.backgroundColor = darkenColor(80);
        break;
      case 3:
        event.target.style.backgroundColor = darkenColor(70);
        break;
      default:
        event.target.style.backgroundColor = darkenColor(65);
        break;
    }
  }
});

// listens for selection of pencil
pencilButtonsDiv.addEventListener("click", function (event) {
  switch (event.target.getAttribute("id")) {
    case "boring":
      pencilType = "boring";
      break;
    case "crazy":
      pencilType = "crazy";
      break;
    case "pretty":
      pencilType = "pretty";
      break;
  }
});

// checks if the number of squares provided is valid
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

// prompts user for desired number of side squares, validates input, clears previous canvas and draws new canvas with provided settings
clearButton.addEventListener("click", function (event) {
  let sideSquares = window.prompt(
    "Select the number of squares per side (number between 5 and 99).",
    16
  );
  if (validateSize(sideSquares)) {
    let totalNumberSquares = sideSquares * sideSquares;
    const innerDivs = document.querySelectorAll("div.innerdivs");
    for (let i = 0; i < innerDivs.length; i++) {
      innerDivs.item(i).remove();
    }
    createDivs(sideSquares, totalNumberSquares);
  }
  return;
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
  darkerColor = "hsl(6.2, 93.2%," + lightness + "%)";
  return darkerColor;
}
