const outerDiv = document.querySelector("#outerdiv");
const clearButton = document.querySelector("#clear");
const pencilButtons = document.querySelectorAll(".pencil");
const pencilButtonsDiv = document.querySelector("#pencilButtonsDiv");
let pencilType;
let innerDivs;

//to do: reset mouseover, change font and buttons. make pretty
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
  innerDivs = document.querySelectorAll("div.innerdivs");
  // colors updated innerDivs
  colorInnerDivs(innerDivs);
}

// create initial canvas
createDivs(16, 256);

// prompts user for desired number of side squares, validates input, clears previous canvas and draws new canvas with provided settings
clearButton.addEventListener("click", function (event) {
  let sideSquares = window.prompt(
    "Select the number of squares per side (number between 5 and 99).",
    16
  );
  if (validateSize(sideSquares)) {
    let totalNumberSquares = sideSquares * sideSquares;
    innerDivs = document.querySelectorAll("div.innerdivs");
    for (let i = 0; i < innerDivs.length; i++) {
      innerDivs.item(i).remove();
    }
    innerDivs = document.querySelectorAll("div.innerdivs");
    createDivs(sideSquares, totalNumberSquares);
    return;
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

// adds event listener to each innerdiv and colors according to selected pencil
function colorInnerDivs(innerDivs) {
  innerDivs.forEach((item) => {
    item.addEventListener("mouseover", function (event) {
      if (pencilType === "boring") {
        event.target.style.backgroundColor = "lightblue";
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
  });
}

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
