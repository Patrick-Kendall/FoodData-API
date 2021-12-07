class UI {
  constructor() {
    this.profile = document.getElementById("profile");
    this.profile2 = document.getElementById("profile2");
    this.nutrientDat = "";
    this.relatedBrands = "";
    this.test = new nutrientData;
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

    this.test.loadAll(this.foodOne.foodNutrients);

    console.log(this.test);


    // printing literal string to an html div
    this.profile.innerHTML = `
      <div class="col spec-sheet">
          <h4 class=""> </h4><br>
          <div class="spec-sheet-container">
            <div class="spec-sheet-image">
              <img src="">
            </div>
          </div>
          
          <table id="entry">
          <tr>
             <th colspan= "3">Nutrient Data: </th>
          </tr>
          ${this.nutrientDat}
          
        </div>
    `;
  }

  showBrands(searchResponse) {


    this.relatedBrands = this.generateTable2(searchResponse.foods);

    this.profile2.innerHTML = `
    <div class = "brandTable">
    <table>
      <th> Related Searches </th>
      ${this.relatedBrands}
    `
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

    generateTable2(data) {
      let result = ``;
      let index = 0;
      
      data.forEach(brand =>
      {  
            result += `
              <tr>
                 <td>${brand.servingSize}
              </tr>
               `;
          index++;
        });
      result += `</table>`;
  
      return result
    }

    generate
}