class UI {
  constructor(appState) {
    this.nutrient_tab = document.getElementById("nutrient-tab");
    this.related = document.getElementById("related");
    this.profile = document.getElementById("profile");
    this.appState = appState;
  }

  // establish event listener on search input
  createSearchUser() {
    
// getting user input from webpage
const searchUser = document.getElementById('searchUser');

  searchUser.addEventListener('keypress', (e) => {
  // Get input text
  let userText = e.target.value;

  // check state
  const appState = state.getState();


  const key = e.code;

  if (key == 'Enter') {
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
  }
})
  }

  // establish event listener on related search's inner HTML
  createSimilarSearch() {
    // enabling link to new, related searches
    let sim = document.getElementById("related");
    sim.addEventListener('click',(e) => 
    {
      let userText = e.target.innerHTML;

      // convert % to URL encoded "%26"
      userText = userText.split("%").join("%26");
      userText = userText.split("\"").join("");

      const searchType = this.appState.getState();


      switch(searchType) {
        case 0:
          api.searchSurvey(userText)
          .then(surveyData =>
            {
              // change user input text to similar search term
              let targ = document.getElementById("searchUser");
              targ.value = surveyData.response.foods[0].description;
    
              //update UI
              data.clear();
              data.processNutrition(surveyData.response);
              ui.showNutrition();
              data.processRelatedBrands(surveyData.response);
              ui.showRelatedSearches();
            })
          break;
        case 1:
          api.searchBrand(userText)
          .then(brandData => {
            api.searchSurvey(userText)
            .then(surveyData =>
              {
              // change user input text to similar search term
              let targ = document.getElementById("searchUser");
              targ.value = brandData.response.foods[0].description;
    
              //update UI
              data.clear();
              data.processNutrition(brandData.response);
              ui.showNutrition();
              data.processRelatedBrands(surveyData.response);
              ui.showRelatedSearches();
            })
          })
          break;
        case 2:
          api.searchAll(userText)
          .then(allData =>
            {
              // change user input text to similar search term
              let targ = document.getElementById("searchUser");
              targ.value = allData.response.foods[0].description;
    
              //update UI
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
              // change user input text to similar search term
              let targ = document.getElementById("searchUser");
              targ.value = foundationData.response.foods[0].description;
    
              //update UI
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
    })
  }

  // printing to an html div with id "related"
  showRelatedSearches() {
    // printing to htlm div : related
    this.related.innerHTML = `
    <div class = "relatedList">
    <h4> Related Searches </h4>
    <ul id="related">
      <a href="#">${data.relatedBrandsList}</a>
    </ul>
    </div>
    `;

    this.createSimilarSearch();

  }

  // printing to an html div with id "profile"
  showProfile() {
  }

  // printing to an html div with id="nutrient-tab"
  showNutrition() {
       this.nutrient_tab.innerHTML = `
       <div class="nutrient-container">

       <h4 class="nutrient-header" id="nutrient-header"> ${data.foodOne.description} : <span id="serving-value">${state.serving}</span>g Serving<br>
       </h4>
       <div class="nutrient-row">
         <div class="nutrient-col">
           <table class="nutrient-table">
           <tr>
              <th class = "nutrient-table-header">Macro: </th>
           </tr>
           ${data.majorDataTable}
           </table>
           <hr class="nutrient-total-line">
           <table class="nutrient-table">
           <tr class = "nutrient-table-row"> 
             <td>calories:</td>
             <td class="nutrient-table-units"> ${data.nutrients.energy.weight} </td>
           </tr>
           </table>
         </div>
         <div class="nutrient-col">
         <table class="nutrient-table">
           <tr>
             <th class = "nutrient-table-header">Minerals: </th>
           </tr>
           ${data.mineralDataTable}
           </table>
         </div>
         <div class="nutrient-col">
           <table class="nutrient-table">
             <tr>
               <th class = "nutrient-table-header">Vitamins: </th>
             </tr>
             ${data.vitaminDataTable}
           </table>
         </div>
         <div class="nutrient-frame">
           <div class="nutrient-frame-plus"> + </div>
         </div>
       </div>

       <!-- fats/sugar breakdown; optional -->
       <div class="nutrient-row nutrient-row-extended invisible">
         <div class="nutrient-col nutrient-row-extended invisible">
           <table class="nutrient-table">
             <tr>
               <th class = "nutrient-table-header">Fatty Acids: </th>
             </tr>
             ${data.fatBreakdownTable}
           </table>
         </div>
         <div class="nutrient-col nutrient-row-extended invisible">
           <table class="nutrient-table">
           <tr>
              <th class = "nutrient-table-header">Fatty Acids: </th>
           </tr>
           ${data.fatBreakdown2Table}
           </table>
         </div>
         <div class="nutrient-col nutrient-row-extended invisible">
           <table class="nutrient-table">
             <tr>
              <th class = "nutrient-table-header">Amino Acids: </th>
             </tr>
             ${data.aminoAcidDataTable}
           </table>
         </div>
       </div>
       
       
     </div>
     <p class="nutrient-caption nutrient-row-extended invisible">* PUFA 18x3 indicates fatty acid with 18 saturated carbons and 3 unsaturated carbons</p>
 `;

 // create control which reveals and hides fatty acid breakdown
 let extend = document.querySelector(".nutrient-frame");

 extend.addEventListener("click", function()
 {
   let items = document.querySelectorAll(".nutrient-row-extended");

   if(items[0].classList.contains("invisible")) {
     for (let i = 0;i<items.length;i++) {
       items[i].classList.remove("invisible");
       items[i].classList.add("visible")
     }
   } else {
     for (let i = 0;i<items.length;i++) {
       items[i].classList.remove("visible");
       items[i].classList.add("invisible")
     }
   }
 })
  }

}

