class UI {
  constructor(appState) {
    this.nutrient_tab = document.getElementById("nutrient-tab");
    this.compare_tab = document.getElementById("compare-tab");
    this.pieQueue = document.getElementById("pie-Q");
    this.titleQueue = document.getElementById("title-Q");
    this.removeQueue = document.getElementById("remove-Q");
    this.related = document.getElementById("related");
    this.profile = document.getElementById("profile");
    this.appState = appState;
  }

  // printing to an html div with id "related"
  showRelatedSearches(relatedBrandsList) {
    // printing to htlm div : related
    this.related.innerHTML = `
    <div class = "relatedList">
    <h4> Related Searches </h4>
    <ul id="related">
      ${relatedBrandsList}
    </ul>
    </div>
    `;
  }

  // printing to an html div with id="nutrient-tab"
  showNutrition(dataArray) {
    const [formattedData, description, calories] = dataArray;

    console.log(dataArray);

    this.nutrient_tab.innerHTML = `
       <div class="nutrient-container">

       <h4 class="nutrient-header" id="nutrient-header"> ${description}
       </h4>
       <div class="nutrient-row">
         <div class="nutrient-col">
           <table class="nutrient-table"> <tbody class="nutrient-body">
           <tr>
              <th class = "nutrient-table-header">Macronutrients: </th>
           </tr>
           ${formattedData.majorDataTable} </tbody >
           </table>
           <hr class="nutrient-total-line">
           <table class="nutrient-table"> <tbody class="nutrient-body">
           <tr class = "nutrient-table-row"> 
             <td>calories:</td>
             <td class="nutrient-table-units"> ${calories} </td>
           </tr></tbody>
           </table>
         </div>
         <div class="nutrient-col">
         <table class="nutrient-table"> <tbody class="nutrient-body">
           <tr>
             <th class = "nutrient-table-header">Minerals: </th>
           </tr>
           ${formattedData.mineralDataTable} </tbody>
           </table>
         </div>
         <div class="nutrient-col">
           <table class="nutrient-table"> <tbody class="nutrient-body">
             <tr>
               <th class = "nutrient-table-header">Vitamins: </th>
             </tr>
             ${formattedData.vitaminDataTable} </tbody>
           </table>
         </div>
         <div class="nutrient-frame">
           <div class="nutrient-frame-plus"> + </div>
         </div>
       </div>

       <!-- fats/sugar breakdown; optional -->
       <div class="nutrient-row nutrient-row-extended invisible">
         <div class="nutrient-col nutrient-row-extended invisible">
           <table class="nutrient-table"> <tbody class="nutrient-body">
             <tr>
               <th class = "nutrient-table-header">Fatty Acids: </th>
             </tr>
             ${formattedData.fatBreakdownTable} </tbody>
           </table>
         </div>
         <div class="nutrient-col nutrient-row-extended invisible">
           <table class="nutrient-table"> <tbody class="nutrient-body">
           <tr>
              <th class = "nutrient-table-header">Fatty Acids: </th>
           </tr>
           ${formattedData.fatBreakdown2Table} </tbody>
           </table>
         </div>
         <div class="nutrient-col nutrient-row-extended invisible">
           <table class="nutrient-table"> <tbody class="nutrient-body">
             <tr>
              <th class = "nutrient-table-header">Amino Acids: </th>
             </tr>
             ${formattedData.aminoAcidDataTable} </tbody>
           </table>
         </div>
       </div>
       
       
     </div>
     <p class="nutrient-caption nutrient-row-extended invisible">* PUFA 18x3 indicates fatty acid with 18 saturated carbons and 3 unsaturated carbons</p>
 `;

    // create control which reveals and hides fatty acid breakdown
    let extend = document.querySelector(".nutrient-frame");

    extend.addEventListener("click", function () {
      let items = document.querySelectorAll(".nutrient-row-extended");

      if (items[0].classList.contains("invisible")) {
        for (let i = 0; i < items.length; i++) {
          items[i].classList.remove("invisible");
          items[i].classList.add("visible");
        }
      } else {
        for (let i = 0; i < items.length; i++) {
          items[i].classList.remove("visible");
          items[i].classList.add("invisible");
        }
      }
    });
  }

  showPieQueue(pie) {
    if (compareData.cache.all.length == 0) {
      return;
    }

    this.pieQueue.innerHTML = `

      ${pie}

    `;
  }

  showTitles(title) {
    if (compareData.cache.all.length == 0) {
      return;
    }

    this.titleQueue.innerHTML = `

      ${title}

    `;
  }

  showRemove(remove) {
    if (compareData.cache.all.length == 0) {
      return;
    }

    this.removeQueue.innerHTML = `
    ${remove}`;
  }

  showTable(table) {
    if (compareData.cache.all.length == 0) {
      return;
    }

    this.compare_tab.innerHTML = `

      ${table}

    `;
  }

  showCompare(queues) {
    const [pie, title, table, remove] = queues;

    this.showTable(table);

    this.showPieQueue(pie);

    this.showTitles(title);

    this.showRemove(remove);
  }

  clearCompare() {
    this.pieQueue.innerHTML = ``;
    this.compare_tab.innerHTML = ``;
    this.titleQueue.innerHTML = ``;
    this.removeQueue.innerHTML = ``;
  }

  // change user input text to similar search term
  showNewUserText(description) {
    let targ = document.getElementById("searchUser");
    targ.value = description;
  }
}
