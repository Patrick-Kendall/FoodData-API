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
          .then(data =>
            {
              // change user input text to similar search term
              let targ = document.getElementById("searchUser");
              targ.value = data.response.foods[0].description;
    
              //update UI
              this.clear();
              this.showNutrition(data.response);
              this.showRelatedSearches(data.response);
            })
          break;
        case 1:
          api.search(userText)
          .then(data =>
            {
              // change user input text to similar search term
              let targ = document.getElementById("searchUser");
              targ.value = data.response.foods[0].description;
    
              //update UI
              this.clear();
              this.showNutrition(data.response);
              this.showRelatedSearches(data.response);
            })
          break;
        case 2:
          api.searchAll(userText)
          .then(data =>
            {
              // change user input text to similar search term
              let targ = document.getElementById("searchUser");
              targ.value = data.response.foods[0].description;
    
              //update UI
              this.clear();
              this.showNutrition(data.response);
              this.showRelatedSearches(data.response);
            })
          break;
        case 3:
          api.searchFoundational(userText)
          .then(data =>
            {
              // change user input text to similar search term
              let targ = document.getElementById("searchUser");
              targ.value = data.response.foods[0].description;
    
              //update UI
              this.clear();
              this.processNutrition(data.response);
              this.showRelatedSearches(data.response);
            })
          break;
        default:
          break;
      }
    })
  }

  // printing to an html div with id "profile"
  showProfile(searchResponse) {
    this.brandProfile.loadAll(searchResponse);

    console.log(this.brandProfile);
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

    // generate table from inputted array of strings; heading must be included external to this function
    generateTable(data) {
      let result = ``;
      let index = 0;
      
      data.forEach(brand =>
      {  
        if(index % 3 == 0) {
            result += `
              </tr>
              <tr>
                 <td>${brand.nutrientName} : ${brand.value} ${brand.unitName}
               `
          } else {
            result += `<td id="entry">${brand.nutrientName} : ${brand.value} ${brand.unitName}</td>`
          }
          index++;
        });
      result += `</tr> </table>`;
  
      return result
    }

    // generates html <tr> instances with 
    genTableFromArray(data) {
      let result = ``;
      
      data.forEach(brand =>
      {  
            result += `
              <tr>
                 <td>${brand.lowercaseDescription}
              </tr>
               `;
          index++;
        });
  
      return result
    }

}