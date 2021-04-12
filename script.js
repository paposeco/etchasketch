const outerDiv = document.querySelector("#outerdiv");

let divArray = [];
function createDivsNames() {
  for (let i = 0; i < 256; i++) {
    divArray.push("div" + i);
  }
  return divArray;
}
function createDivs() {
  createDivsNames();
  for (let j = 0; j < divArray.length; j++) {
    divArray[j] = document.createElement("div");
    outerDiv.appendChild(divArray[j]);
  }
}
createDivs();
