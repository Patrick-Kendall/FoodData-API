// entry point

// instance of object with methods to fetch from PubChem
const chemical2 = new FoodData;

// instance of UI which prints html to div with id = "profile"
const ui = new UI;

// getting user input from webpage
const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value;

  // check if input is empty
  if(userText !== '') {
    // get selected properties: IUPAC Name, Title, MW, Mol. Formula
    chemical2.search(userText)
    .then(data => {
      ui.showNutrition(data.response);
      ui.showBrands(data.response);
    })
  }
})