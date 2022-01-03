class UI {
  constructor(appState) {
    this.nutrient_tab = document.getElementById("nutrient-tab");
    this.related = document.getElementById("related");
    this.profile = document.getElementById("profile");
    this.appState = appState;
  }

  // printing to an html div with id "related"
  showRelatedSearches() {
    // printing to htlm div : related
    this.related.innerHTML = `
    <div class = "relatedList">
    <h4> Related Searches </h4>
    <ul id="similar">
      <a href="#">${data.relatedBrandsList}</a>
    </ul>
    </div>
    `;

    // enabling link to new, related searches
    let sim = document.getElementById("similar");
    sim.addEventListener('click',(e) => 
    {
      const userText = e.target.innerHTML;
      const api = new FoodData;
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

  // printing to an html div with id "profile"
  showProfile() {
  }

  showNutrition() {
       // printing to an html div with id="nutrient-tab"
       this.nutrient_tab.innerHTML = `
       <div class="nutrient-container">

       <h4 class="nutrient-header" id="nutrient-header"> ${data.foodOne.description} : 100g Serving<br>
       </h4>
       <div class="nutrient-flex">
         <div class="nutrient-col">
           <table id="entry" class="nutrient-table">
           <tr>
              <th>Macro: </th>
           </tr>
           ${data.majorDataTable}
           </table>
           <hr class="nutrient-total-line">
           <table id="entry2" class="nutrient-table">
           <tr> 
             <td>calories:</td>
             <td class="nutrient-value-units"> ${data.nutrients.energy.weight} </td>
           </tr>
           </table>
         </div>
         <div class="nutrient-col">
         <table id="entry" class="nutrient-table">
           <tr>
             <th>Minerals: </th>
           </tr>
           ${data.mineralDataTable}
           </table>
         </div>
         <div class="nutrient-col">
           <table id="entry" class="nutrient-table">
             <tr>
               <th>Vitamins: </th>
             </tr>
             ${data.vitaminDataTable}
           </table>
         </div>
         <div class="nutrient-frame">
           <div class="plus"> + </div>
         </div>
       </div>

       <!-- fats/sugar breakdown; optional -->
       <div class="nutrient-flex extended invisible">
         <div class="nutrient-col extended invisible">
           <table id="entry" class="nutrient-table">
             <tr>
               <th>Fatty Acids: </th>
             </tr>
             ${data.fatBreakdownTable}
           </table>
         </div>
         <div class="nutrient-col extended invisible">
           <table id="entry" class="nutrient-table">
           <tr>
              <th>Fatty Acids: </th>
           </tr>
           ${data.fatBreakdown2Table}
           </table>
         </div>
         <div class="nutrient-col extended invisible">
           <table id="entry" class="nutrient-table">
             <tr>
              <th>Amino Acids: </th>
             </tr>
             ${data.aminoAcidDataTable}
           </table>
         </div>
       </div>
       
       
     </div>
     <p class="table-caption extended invisible">* PUFA 18x3 indicates fatty acid with 18 saturated carbons and 3 unsaturated carbons</p>
 `;

 // create control which reveals and hides fatty acid breakdown
 let extend = document.querySelector(".nutrient-frame");

 extend.addEventListener("click", function()
 {
   let items = document.querySelectorAll(".extended");

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