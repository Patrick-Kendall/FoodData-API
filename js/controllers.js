
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
          <tr class="nutrient-table-row">
            <td> ${nutrientName.split("_").join(" ")}:</td>
            <td class="nutrient-table-units"> ${nutrient.weight} ${nutrient.units} </td>
            <td class="invisible">${nutrient.rdvPercent} % </td>
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
    this.appData = new AppData;
    this.HTMLControl = new HTMLController;
    this.brandProfile = new Profile;
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
    this.allData = {};
  }

    // receive data from fetch; store first entry; generate html tables for each grouping of nutrient data
  processNutrition() {
      // convert units to SI unit standards
      this.appData.formatUnits();
  
      // process nutrient profile and display in html <tr> groupings; 
      this.majorDataTable = this.HTMLControl.genDecodeHTML_tr(this.appData.nutrients.major);
      //console.log(this.appData.nutrients.major);
      this.mineralDataTable = this.HTMLControl.genDecodeHTML_tr(this.appData.nutrients.minerals);
      this.vitaminDataTable = this.HTMLControl.genDecodeHTML_tr(this.appData.nutrients.vitamins);
  
      // 2nd row of columns
      this.aminoAcidDataTable = this.HTMLControl.genDecodeHTML_tr(this.appData.nutrients.aminoAcids,7);
      this.fatBreakdownTable = this.HTMLControl.genDecodeHTML_tr(this.appData.nutrients.fats.sat) + '<tr> </tr>' + this.HTMLControl.genDecodeHTML_tr(this.appData.nutrients.fats.monoUnsat);
      this.fatBreakdown2Table = this.HTMLControl.genDecodeHTML_tr(this.appData.nutrients.fats.polyUnsat); 
  }

  // generate list of brands containing one of the identical keywords as the current search
  processRelatedBrands() {
    this.relatedBrandsList = this.HTMLControl.genHTML_li(this.appData.cache.full[this.appData.cache.full.length-1].foods);
  }

  // process profile data ( yet to be completed)
  processProfile() {

    this.brandProfile.loadAll(this.appData.cache.all[this.appData.cache.all.length-1]);

    console.log(this.brandProfile);
  }

  async newSearch(userText) {

    const appState = state.getState();
    
    switch(appState) {
      case 0:
        this.clear();
        await this.appData.searchSurvey(userText);

        this.process();
        ui.showNewUserText();
        break;
      case 1:
        this.clear();
        await this.appData.searchBranded(userText);

        ui.showNewUserText();
        this.process();
       
        break;
      case 2:
        this.clear();
        // fill data, then callback to function to process and display in ui
        await this.appData.searchAll(userText);

        this.process();

        // change user input text to similar search term
        ui.showNewUserText();


        break;
      case 3:
        this.clear();

        await this.appData.searchFoundation(userText);

        ui.showNewUserText();
        this.process();

        break;
      default:
        break;
    }
  }

  process() {
    //update UI
    this.processNutrition();
    ui.showNutrition();
    this.processRelatedBrands();
    ui.showRelatedSearches();
    this.processProfile();
  }


  clear() {
    this.appData.nutrients.clear();
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