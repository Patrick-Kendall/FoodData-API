class UI {
  constructor() {
    this.profile = document.getElementById("profile");
    this.profile2 = document.getElementById("profile2");
    this.nutrientDat = "";
    this.relatedBrands = "";
    this.majorData = "";
    this.mineralData = "";
    this.vitaminData = "";
    this.nutrients = new nutrientData;
    //this.accessToApi = new FoodData;
  }

  // receive data from fetch; print to webpage
  showNutrition(searchResponse) {
    // storing data from API path in object properties
    this.foodOne = searchResponse.foods[0];

    this.brandName = this.foodOne.brandName;
    this.ingredients = this.foodOne.ingredients;
    
    // clearing synonym list
    this.synonyms = "";

    this.nutrientDat = this.generateTable(this.foodOne.foodNutrients);

    this.nutrients.loadAll(this.foodOne.foodNutrients);

    this.nutrients.calcTotalWeight(this.nutrients);

    this.nutrients.formatUnits();

    console.log(this.nutrients);

    this.majorData = this.genHTML_tr(this.nutrients.major);

    this.mineralData = this.genHTML_tr(this.nutrients.minerals);

    this.vitaminData = this.genDecodeHTML_tr(this.nutrients.vitamins);




    // printing literal string to an html div
    this.profile.innerHTML = `
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
              <tr> 
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
            </div>
          </div>
          
          
        </div>
    `;
  }

  showBrands(searchResponse) {


    this.relatedBrands = this.genHTML_li(searchResponse.foods);
    
    this.profile2.innerHTML = `
    <div class = "brandTable">
    <h4> Related Searches </h4>
    <ul id="similar">
      <a href="#">${this.relatedBrands}</a>
    </ul>
    </div>
    `

    let sim = document.getElementById("similar");

    sim.addEventListener('click',(e) => 
    {
      const search = e.target.innerHTML;
      const api = new FoodData;


      api.searchSurvey(search)
      .then(data =>
        {
          this.clear();
          this.showNutrition(data.response);
          this.showBrands(data.response);
        })
    })
  }

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

    // generate html table rows containing major nutrient data
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

    genDecodeHTML_tr(data) {
      let result = ``;

      for(const [nutrientName,nutrient] of Object.entries(data)) {
        if (!nutrient.units) {

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