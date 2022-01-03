// entry point

// instance of object with methods to fetch from DOA database
const api = new FoodData;

// object to allow switching between dataType filters on the api connection
const state = new State;

// instance of UI which prints html to two divs in index.html
const ui = new UI(state);

const data = new DataController(state);

// getting user input from webpage
const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value;

  // check state
  const appState = state.getState();

  switch(appState) {
    case 0:
      if (userText !== ''){
        api.searchSurvey(userText)
        .then(surveyData =>
          {
            data.clear();
            data.processNutrition(surveyData.response);
            ui.showNutrition();
            data.processRelatedBrands(surveyData.response);
            ui.showRelatedSearches();
          })
      }
      break;
    case 1:
      if(userText !== '') {
        // 
        api.searchBrand(userText)
        .then(brandData => {
          api.searchSurvey(userText)
          .then(surveyData =>
            {
              data.clear();
              data.processNutrition(brandData.response);
              ui.showNutrition();
              data.processRelatedBrands(surveyData.response);
              ui.showRelatedSearches();
            })
        })
      }
      break;
    case 2:
      api.searchAll(userText)
      .then(allData =>
        {
          data.clear();
          data.processNutrition(allData.response);
          ui.showNutrition();
          data.processRelatedBrands(allData.response);
          ui.showRelatedSearches();
        })
      break;
    case 3:
      api.searchFoundational(userText)
      .then(foundationData =>
        {
          data.clear();
          data.processNutrition(foundationData.response);
          ui.showNutrition();
          data.processRelatedBrands(foundationData.response);
          ui.showRelatedSearches();
        })
      break;
    default:
      break;
  }

  // check if input is empty
})