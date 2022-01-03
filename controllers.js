
class HTMLController {
    constructor() {

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

        } else if (nutrient.weight < 0.01) {

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
            <td class="nutrient-value-vanish">${nutrient.rdvPercent} % </td>
          </tr>
        `
        }
      }

      return result
    }
    
    // html table rows with limited number of rows
    genLimitedHTML_tr(data,limit) {
      let result = ``;
      let index = 0;

      for(const [nutrientName,nutrient] of Object.entries(data)) {
        index++;
        console.log(index);
        if (index < limit) {
          if (!nutrient.units) {

          } else if (nutrient.weight < 0.01) {

          } else {

            result += `
            <tr>
              <td> ${nutrientName.split("_").join(" ")}:</td>
              <td class="nutrient-value-units">${nutrient.weight} ${nutrient.units} </td>
              <td class="nutrient-daily-value">${nutrient.rdvPercent} % </td>
            </tr>
          `
          }
        }
      }

      return result
    }

}

class DataController {
  constructor(appState) {
    this.nutrients = new nutrientData;
    this.HTMLControl = new HTMLController;
    //this.profile = new Profile;
    this.foodOne = {};
    this.nutrientDat = "";
    this.relatedBrandsList = "";
    this.majorDataTable = "";
    this.mineralDataTable = "";
    this.vitaminDataTable = "";
    this.aminoAcidDataTable = "";
    this.fatBreakdownTable = "";
    this.fatBreakdown2Table = "";
    this.appState = appState;
  }

    // receive data from fetch; store first entry; generate html tables for each grouping of nutrient data
  processNutrition(searchResponse) {
      // storing data from API path in object properties
      this.foodOne = searchResponse.foods[0];
  
      // load nutrient profile for first returned food match: foods[0]
      this.nutrients.loadAll(this.foodOne.foodNutrients);
      this.nutrients.calcTotalWeight(this.nutrients);
  
      console.log(this.nutrients);
  
      // convert units to SI unit standards
      this.formatUnits();
  
      // process nutrient profile and display in html <tr> groupings; 
      this.majorDataTable = this.HTMLControl.genDecodeHTML_tr(this.nutrients.major);
      this.mineralDataTable = this.HTMLControl.genDecodeHTML_tr(this.nutrients.minerals);
      this.vitaminDataTable = this.HTMLControl.genDecodeHTML_tr(this.nutrients.vitamins);
  
      // 2nd row of columns
      this.aminoAcidDataTable = this.HTMLControl.genDecodeHTML_tr(this.nutrients.aminoAcids,7);
      this.fatBreakdownTable = this.HTMLControl.genDecodeHTML_tr(this.nutrients.fats.sat) + '<tr> </tr>' + this.HTMLControl.genDecodeHTML_tr(this.nutrients.fats.monoUnsat);
      this.fatBreakdown2Table = this.HTMLControl.genDecodeHTML_tr(this.nutrients.fats.polyUnsat); 
  }

  // generate list of brands containing one of the identical keywords as the current search
  processRelatedBrands(searchResponse) {
    this.relatedBrandsList = this.HTMLControl.genHTML_li(searchResponse.foods);
  }

  // process profile data ( yet to be completed)
  processProfile(searchResponse) {
    this.brandProfile.loadAll(searchResponse);

    console.log(this.brandProfile);
  }

  formatUnits() {
    this.nutrients.formatUnits(this.nutrients.major);
    this.nutrients.formatUnits(this.nutrients.fats.sat);
    this.nutrients.formatUnits(this.nutrients.fats.monoUnsat);
    this.nutrients.formatUnits(this.nutrients.fats.polyUnsat);
    this.nutrients.formatUnits(this.nutrients.vitamins);
    this.nutrients.formatUnits(this.nutrients.minerals);
    this.nutrients.formatUnits(this.nutrients.misc);
    this.nutrients.formatUnits(this.nutrients.aminoAcids);
  }

  clear() {
    this.nutrients.clear();
    this.foodOne = {};
    this.nutrientDat = "";
    this.relatedBrands = "";
    this.majorData = "";
    this.mineralData = "";
    this.vitaminData = "";
    this.aminoAcidData = "";
    this.fatBreakdown = "";
    this.fatBreakdown2 = "";
  }

}