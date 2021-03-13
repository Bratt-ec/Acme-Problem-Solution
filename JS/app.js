// Import Employe Class
import { ClsEmploye } from "./Class/Employe.js";
// Declare Variables
let dataEmployes = [];
const inputFile = document.querySelector("#IdEmployes");
const divContent = document.querySelector("#show-content");
let objEmploye = new ClsEmploye();

EventListeners();

function EventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    inputFile.addEventListener("change", readFile, false);
  });
}
/*
 * Get file and return an array with all information.
 * input: file.txt
 * output: array of employes
 */
const readFile = (e) => {
  let employesFile = e.target.files[0];
  if (!employesFile) return;
  let readtxt = new FileReader();
  readtxt.onload = function () {
    let result = readtxt.result;
    dataEmployes = result.split("\n");
    console.log(dataEmployes);
    dataEmployes.map((employe) => {
      /**
       * '/([[a-z]+|[^a-z]+]|[^=,:-]+)/gi'
       * Using regular expression, we get all items of employes array in this way
       * "RENE", "MO", "10", "00", "12", "00", "TU", "10", "00", "12", "00"
       */
      const info = employe.match(/([[a-z]+|[^a-z]+]|[^=,:-]+)/gi);
      let valuePaid = objEmploye.CalculateAmountToPay(
        info.slice(1, info.length + 1)
      );
      let paid = `The amount to pay ${info[0]} is ${valuePaid} USD`;
      divContent.innerHTML += `
            <p>${paid}</p>
            `;
    });
  };
  readtxt.readAsText(employesFile);
};
