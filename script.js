const outerDiv = document.querySelector("#outerdiv");
const clearButton = document.querySelector("#clear");

function createDivsNames(gridSize, divArray) {
  for (let i = 0; i < gridSize; i++) {
    divArray.push("div" + i);
  }
  return divArray;
}

function createDivs(gridSize, totalNumberSquares) {
  let divArray = [];
  createDivsNames(totalNumberSquares, divArray); //returns divArray
  for (let j = 0; j < divArray.length; j++) {
    divArray[j] = document.createElement("div");
    //implementation for white pencil
    divArray[j].setAttribute("class", "innerdivs clearColor");

    //implementation for random color
    //divArray[j].setAttribute("class", "innerdivs");
    outerDiv.appendChild(divArray[j]);
  }
  outerDiv.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";
  const innerDivs = document.querySelectorAll("div.innerdivs");
}

createDivs(16, 256);

// make option for switching between pencils
outerDiv.addEventListener("mouseover", function (event) {
  var element = event.target;
  element.mouseover = (element.mouseover || 0) + 1;

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
  // var element = event.currentTarget;
  // element.mouseover = (element.mouseover || 0) + 1;
  // if (element.mouseover === 2) {
  //   event.target.style.backgroundColor = darkenColor(65);
  // } else {
  //   event.target.style.backgroundColor = darkenColor(80);
  // }

  // implementation for white pencil
  //   event.target.classList.replace("clearColor", "paint");

  // implementation for random color
  //event.target.style.backgroundColor = randomRGB();
});

function validateSize(gridSize) {
  let gridSizeNumber = Number(gridSize);
  if (Number.isNaN(gridSizeNumber)) {
    alert("Please select a number.");
    return "ERROR";
  } else if (gridSize < 5 || gridSize > 100) {
    alert("Please select a number larger than 5 and smaller than 100.");
    return "ERROR";
  } else return true;
}

clearButton.addEventListener("click", function (event) {
  let gridSize = window.prompt("Pick the number of squares per side:");
  if (validateSize(gridSize)) {
    let totalNumberSquares = gridSize * gridSize;
    const innerDivs = document.querySelectorAll("div.innerdivs");
    for (let i = 0; i < innerDivs.length; i++) {
      innerDivs.item(i).remove();
    }
    createDivs(gridSize, totalNumberSquares);
  }
});

// random color selection
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomRGB() {
  let redRgb = randomInt(0, 255);
  let greenRgb = randomInt(0, 255);
  let blueRgb = randomInt(0, 255);
  let newColor = `rgb(${redRgb}, ${greenRgb}, ${blueRgb})`;
  return newColor;
}

function darkenColor(lightness) {
  darkerColor = "hsl(6.2, 93.2%," + lightness + "%)";
  return darkerColor;
}
