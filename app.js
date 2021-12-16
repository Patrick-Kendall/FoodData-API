// entry point

// instance of object with methods to fetch from DOA database
const api = new FoodData;

// object to allow switching between dataType filters on the api connection
const state = new State;

// instance of UI which prints html to two divs in index.html
const ui = new UI(state);

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
            ui.clear();
            ui.showNutrition(surveyData.response);
            ui.showRelatedSearches(surveyData.response);
          })
      }
      break;
    case 1:
      if(userText !== '') {
        // 
        api.search(userText)
        .then(data => {
          api.searchSurvey(userText)
          .then(surveyData =>
            {
              ui.clear();
              ui.showNutrition(data.response);
              ui.showRelatedSearches(surveyData.response);
              ui.showProfile(data.response.foods[0]);
            })
        })
      }
      break;
    case 2:
      api.searchAll(userText)
      .then(allData =>
        {
          ui.clear();
          ui.showNutrition(allData.response);
          ui.showRelatedSearches(allData.response);
        })
      break;
    case 3:
      api.searchFoundational(userText)
      .then(allData =>
        {
          ui.clear();
          ui.showNutrition(allData.response);
          ui.showRelatedSearches(allData.response);
        })
      break;
    default:
      break;
  }

  // check if input is empty
})