class UI {
  constructor() {
    this.nutrient_tab = document.getElementById("nutrient-tab");
    this.related = document.getElementById("related");
    this.nutrientDat = "";
    this.relatedBrands = "";
    this.majorData = "";
    this.mineralData = "";
    this.vitaminData = "";
    this.fatBreakdown = "";
    this.fatBreakdown2 = "";
    this.nutrients = new nutrientData;
    //this.accessToApi = new FoodData;
  }

  formatUnits() {
    this.nutrients.formatUnits(this.nutrients.major);
    this.nutrients.formatUnits(this.nutrients.fats.sat);
    this.nutrients.formatUnits(this.nutrients.fats.monoUnsat);
    this.nutrients.formatUnits(this.nutrients.fats.polyUnsat);
    this.nutrients.formatUnits(this.nutrients.vitamins);
    this.nutrients.formatUnits(this.nutrients.minerals);
    this.nutrients.formatUnits(this.nutrients.misc);
  }

  // receive data from fetch; print to webpage
  showNutrition(searchResponse) {
    // storing data from API path in object properties
    this.foodOne = searchResponse.foods[0];

    this.brandName = this.foodOne.brandName;
    this.ingredients = this.foodOne.ingredients;
    

    // load nutrient profile for first returned food match: foods[0]
    this.nutrients.loadAll(this.foodOne.foodNutrients);
    this.nutrients.calcTotalWeight(this.nutrients);

    // convert units to SI unit standards
    this.formatUnits();

    // process nutrient profile and display in html <tr> groupings
    this.majorData = this.genHTML_tr(this.nutrients.major);
    this.mineralData = this.genHTML_tr(this.nutrients.minerals);
    this.vitaminData = this.genDecodeHTML_tr(this.nutrients.vitamins);

    // 
    this.fatBreakdown = this.genDecodeHTML_tr(this.nutrients.fats.sat) + '<tr> </tr>' + this.genDecodeHTML_tr(this.nutrients.fats.monoUnsat);
    this.fatBreakdown2 = this.genDecodeHTML_tr(this.nutrients.fats.polyUnsat); 

    // printing to an html div with id="nutrient-tab"
    this.nutrient_tab.innerHTML = `
          <div class="nutrient-container">

          <h4 class="nutrient-header"> ${this.foodOne.description} : 100g Serving<br>
          </h4>
          <div class="nutrient-flex">
            <div class="nutrient-col">
              <table id="entry" class="nutrient-table">
              <tr>
                 <th>Macronutrients: </th>
              </tr>
              ${this.majorData}
              </table>
              <hr class="nutrient-total-line">
              <table id="entry2" class="nutrient-table">
              <tr> 
                <td>calories:</td>
                <td class="nutrient-value-units"> ${this.nutrients.energy.weight} </td>
              </tr> 
              </table>
            </div>
            <div class="nutrient-col">
            <table id="entry" class="nutrient-table">
              <tr>
                <th>Minerals: </th>
              </tr>
              ${this.mineralData}
              </table>
            </div>
            <div class="nutrient-col">
              <table id="entry" class="nutrient-table">
                <tr>
                  <th>Vitamins: </th>
                </tr>
                ${this.vitaminData}
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
                ${this.fatBreakdown}
              </table>
            </div>
            <div class="nutrient-col extended invisible">
              <table id="entry" class="nutrient-table">
              <tr>
                 <th>Fatty Acids: </th>
              </tr>
              ${this.fatBreakdown2}
              </table>
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

  // printing to an html div with id ""
  showBrands(searchResponse) {
    this.relatedBrands = this.genHTML_li(searchResponse.foods);
    
    // printing to htlm div : related
    this.related.innerHTML = `
    <div class = "relatedList">
    <h4> Related Searches </h4>
    <ul id="similar">
      <a href="#">${this.relatedBrands}</a>
    </ul>
    </div>
    `

    // enabling link to new, related searches
    let sim = document.getElementById("similar");
    sim.addEventListener('click',(e) => 
    {
      const search = e.target.innerHTML;
      const api = new FoodData;


      // calling api which returns 50 food entries by default
      api.searchSurvey(search)
      .then(data =>
        {
          // change user input text to similar search term
          let targ = document.getElementById("searchUser");
          targ.value = data.response.foods[0].description;

          //update UI
          this.clear();
          this.showNutrition(data.response);
          this.showBrands(data.response);
        })
    })
  }

  // call clear function on nutrient data structure
  clear() {
    this.nutrients.clear()
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

    // generate html list elements with inputted object
    genHTML_li(data) {
      let result = ``;


      for(const [nutrientName,nutrient] of Object.entries(data)) {
          let buffer = nutrient.lowercaseDescription;
          result += `
            <li>${buffer}</li>
        `

      }

      return result
    }

    // generate html table rows with inputted object
    genHTML_tr(data) {
      let result = ``;

      for(const [nutrientName,nutrient] of Object.entries(data)) {
        if (!nutrient.units) {

        } else {
          result += `
          <tr>
            <td> ${nutrientName}:</td>
            <td class="nutrient-value-units"> ${nutrient.weight} ${nutrient.units} </td>
          </tr>
        `
        }
      }

      return result
    }

    // html table rows with inputted object AND convert "_" to " "
    genDecodeHTML_tr(data) {
      let result = ``;

      for(const [nutrientName,nutrient] of Object.entries(data)) {
        if (!nutrient.units) {

        } else if (nutrient.weight < 0.01) {

        } else {

          result += `
          <tr>
            <td> ${nutrientName.split("_").join(" ")}:</td>
            <td class="nutrient-value-units"> ${nutrient.weight} ${nutrient.units} </td>
          </tr>
        `
        }
      }

      return result
    }
}