// entry point

// instance of object with methods to fetch from DOA database
const chemical2 = new FoodData;

// instance of UI which prints html to two divs in index.html
const ui = new UI;

// getting user input from webpage
const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value;

  // check if input is empty
  if(userText !== '') {
    // 
    chemical2.searchSurvey(userText)
    .then(data => {
      ui.clear();
      ui.showNutrition(data.response);
      ui.showBrands(data.response);
    })
  }
})