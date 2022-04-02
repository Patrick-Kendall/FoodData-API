class UI {
  constructor(appState) {
    this.nutrient_tab = document.getElementById("nutrient-tab");
    this.compare_tab = document.getElementById("compare-tab");
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
  const userText = e.target.value;

  const key = e.code;

  if (key == 'Enter') {
    dataControl.newSearch(userText);
  }
})
  }

  // establish event listener on related search's inner HTML
  createRelatedSearch() {
    // enabling link to new, related searches
    let sim = document.querySelectorAll(".related__title");
    sim.forEach(el => 
      {
        el.addEventListener('click',(e) => 
        {
          let userText = e.target.innerHTML;
    
          // convert % to URL encoded "%25"
          userText = userText.split("%").join("%25");
          userText = userText.split("\"").join("");
    
          dataControl.newSearch(userText);
        })
      })
  }

  // event listener for compare
  createCompare() {
    const comp = document.querySelectorAll('.compare');
    comp.forEach(el => {
      el.addEventListener('change',async (e) => 
      {
         console.log('hi');
         if (e.target.checked) {
          compareControl.clearTable();
          //const title = e.target.innerHTML;
          await compareControl.addFood(e.target.getAttribute("id"));
          
          this.showCompare();
  
          this.createRemoveComp();
  
        
         }
      })
    })
  }

  createRemoveComp() {
    const compItems = document.querySelectorAll('.remove-btn');
    compItems.forEach(el => {
      el.addEventListener('click', (e) =>
      {
        let id = e.target.getAttribute("id");

        compareControl.removeFood(id);


        this.showCompare();
        this.createRemoveComp();
      })
    })
  }

  // printing to an html div with id "related"
  showRelatedSearches() {
    // printing to htlm div : related
    this.related.innerHTML = `
    <div class = "relatedList">
    <h4> Related Searches </h4>
    <ul id="related">
      ${dataControl.relatedBrandsList}
    </ul>
    </div>
    `;
    this.createRelatedSearch();
    this.createCompare();
  }

  // printing to an html div with id "profile"
  showProfile() {
  }

  // printing to an html div with id="nutrient-tab"
  showNutrition() {
       this.nutrient_tab.innerHTML = `
       <div class="nutrient-container">

       <h4 class="nutrient-header" id="nutrient-header"> ${dataControl.appData.cache.all[dataControl.appData.cache.all.length-1].lowercaseDescription} : <span id="serving-value">${state.serving}</span>g Serving<br>
       </h4>
       <div class="nutrient-row">
         <div class="nutrient-col">
           <table class="nutrient-table">
           <tr>
              <th class = "nutrient-table-header">Macronutrients: </th>
           </tr>
           ${dataControl.majorDataTable}
           </table>
           <hr class="nutrient-total-line">
           <table class="nutrient-table">
           <tr class = "nutrient-table-row"> 
             <td>calories:</td>
             <td class="nutrient-table-units"> ${dataControl.appData.nutrients.energy.weight} </td>
           </tr>
           </table>
         </div>
         <div class="nutrient-col">
         <table class="nutrient-table">
           <tr>
             <th class = "nutrient-table-header">Minerals: </th>
           </tr>
           ${dataControl.mineralDataTable}
           </table>
         </div>
         <div class="nutrient-col">
           <table class="nutrient-table">
             <tr>
               <th class = "nutrient-table-header">Vitamins: </th>
             </tr>
             ${dataControl.vitaminDataTable}
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
             ${dataControl.fatBreakdownTable}
           </table>
         </div>
         <div class="nutrient-col nutrient-row-extended invisible">
           <table class="nutrient-table">
           <tr>
              <th class = "nutrient-table-header">Fatty Acids: </th>
           </tr>
           ${dataControl.fatBreakdown2Table}
           </table>
         </div>
         <div class="nutrient-col nutrient-row-extended invisible">
           <table class="nutrient-table">
             <tr>
              <th class = "nutrient-table-header">Amino Acids: </th>
             </tr>
             ${dataControl.aminoAcidDataTable}
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

  showCompare() {
    if (compareControl.compareLength == 0) {
      return
    }

    this.compare_tab.innerHTML = `
    <div class="nutrient-container">

    <h4 class="nutrient-header" id="nutrient-header"> Compare : <span id="serving-value">${state.serving}</span>g Serving<br>
    </h4>
    <div class="nutrient-row">
      ${compareControl.compareTable}
    </div>
    `;
  }

  clearCompare() {
    this.compare_tab.innerHTML = ``;
  }

  // change user input text to similar search term
  showNewUserText() {
      let targ = document.getElementById("searchUser");
      targ.value = dataControl.appData.cache.all[dataControl.appData.cache.all.length-1].lowercaseDescription;
  }

  newPieChart() {
    
const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Protein','Fat','Water','Carbs'],
        datasets: [{
            label: 'Food',
            data: [22,28,34,57],
            backgroundColor: [
                'rgba(255,33,33,0.62)',
                'rgba(33,192,33,0.62)',
                'rgba(33,33,235,0.62)',
                'rgba(255,255,33,0.62)'
            ],
            borderColor: [
                'rgba(255,33,33,1)',
                'rgba(33,192,33,1)',
                'rgba(33,33,235,1)',
                'rgba(255,255,33,1)'
            ],
            borderWidth: 2
        }]
    }
})
  }

}

