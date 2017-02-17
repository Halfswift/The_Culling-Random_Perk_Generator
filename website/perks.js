/**********************************************************************

Random Perk & Airdrop generator for The Culling
~ By Halfswift w/ help from oberien

**********************************************************************/

// All the perk-classes containing their perks and airdrops.
var utilityArray = ["Backpacker", "Load Dropper", "Bow Flexer", "Chemist", "Man Tracker", "Master Crafter", "Moneybags"];
var combatArray = ["Ranger", "Brutus", "Trapper", "Mangler", "Basher", "Golden Arm"];
var movementArray = ["Leg Day", "Stealthy Blade", "Speedy Spear", "Recovery"];
var survivalArray = ["Cannibal", "Regenerator", "Blood Guzzler", "Bomb Suit", "Dig Deep", "Immunity", "Sixth Scents", "Thick Skin", "Tough Mother", "Angry Octopus", "Inhuman"];
var airdropArray = ["Early", "Mid", "Late", "Utility"];

// The array used to call to a perk-class array.
var perkClassArray = [utilityArray, combatArray, movementArray, survivalArray];
// Used to count the amount of players in the form of indexes.
var playersArray = []; 

// get all relevant elements from html
var form = document.getElementById("form");
var perks = document.getElementById("perks");
var input = document.getElementById("name");

// EventListener and function which generates the perks.
form.onsubmit = (evt) => {
  evt.preventDefault();
  generate();
}
input.onkeydown = (evt) => {
  if (evt.keyCode == 13) {
    evt.preventDefault();
    generate();
  }
}
function generate() {
  // Converts the inputted playernames into 1 string.
  var player = input.value;
  if (player === "") {
    return;
  }
  // clear the input
  input.value = "";
  
  // Defines the arrays used while generating 1 set, and also resets the previous job.
  var selectedClassArray = [];
  var selectedPerkArray = [];
  
  // This while generates 3 perks.
  while (selectedPerkArray.length < 3) {
    // Defines and resets a checker.
    var checker = false;
    // Makes a random number from 0-3.
    var randomNumber = Math.floor(Math.random()*4);
    // Defines and resets the currentJob.
    var currentJob = undefined;
    
    // Runs through all the selected perkclasses, and...
    for (var j = 0; j < selectedClassArray.length; j++) {
      // ...checks if the randomly made number has already been chosen.
      if (selectedClassArray[j] == randomNumber) {
        checker = true;
      }
    }
    
    // if the number has been picked, this step is skipped, and a new number is made.
    // Otherwise, this will push the unique class, and choose a perk from it.
    if (checker == false) {
      // Adds the unique class number to selectedClassArray.
      selectedClassArray.push(randomNumber);
      
      // Uses the randomly made number, and uses it to take all the perks from the class it corrolates to.
      currentJob = perkClassArray[randomNumber];  
      
      // Makes a new random number, using the length of the currentJob array (the amount of perks from the class)
      var randomNumber2 = Math.floor(Math.random()*currentJob.length);
      
      // Takes the randomly chosen number, and uses that to take a perk from the currentJob. 
      // Also adds spaces to make theend result look better.
      selectedPerkArray.push("   " + currentJob[randomNumber2]);
      
      // Makes a new random number, and selects an airdrop from the airdropArray.
      randomNumber2 = Math.floor(Math.random()*airdropArray.length);
      var selectedAirdrop = airdropArray[randomNumber2];
    }
  }
  // After selecting 3 perks and 1 airdrop for 1 player, it makes this String
  let perks = selectedPerkArray.join(", ") + "   with any " + selectedAirdrop + " airdrop";

  // After making all the loadouts for all the players, it displays the player names
  addPerk(player, perks);
};

function addPerk(name, perk) {
  const nameDiv = document.createElement("div");
  nameDiv.className = "name flex1";
  const perkDiv = document.createElement("div");
  perkDiv.className = "perk flex5";
  nameDiv.innerText = name;
  perkDiv.innerText = perk;
  const together = document.createElement("div");
  together.className = "flex-row flex-center";
  together.appendChild(nameDiv);
  together.appendChild(perkDiv);
  perks.appendChild(together);
}
