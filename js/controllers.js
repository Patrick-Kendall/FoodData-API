function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
} // Source: stackExchange

class HTMLController {
    constructor() {

    }

    // generate html list elements with inputted object
    genHTML_li(data) {
      let result = ``;


      data.forEach(el => {
        result += `
        <li class="related__entry">
          <a href="javascript:void(0)" class="related__title">${el}</a> 
          <div>
            <input class="compare" type="checkbox" id="${el}" style="transform:scale(1.5);"></input>
            Compare
          </div>
        </li>
        `
      })
      
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
            <td class="nutrient-table-label"> ${nutrientName.split("_").join(" ")}:</td>
            <td class="nutrient-table-units"> ${nutrient.weight} ${nutrient.units} </td>
            <td class="invisible">${nutrient.rdvPercent} % </td>
          </tr>
        `
        }
      }

      return result
    }

    genDecodeHTML_column(dataTable,calories) {
      let result = ``;

      console.log(dataTable);

      result += `
      <div class="col-wrapper">
        <div class="compare-col">
          <table class="nutrient-table">
            <tr>
              <th class = "nutrient-table-header"> Macro: </th>
            </tr>
            ${dataTable}
          </table>
          <hr class="nutrient-total-line">
          <table class="nutrient-table">
           <tr class = "nutrient-table-row"> 
              <td>calories:</td>
              <td class="nutrient-table-units"> ${calories} </td>
            </tr>
          </table>
          `;
      
      

      return result
    }

    // data is expected input array of "15g" ... 
    genDecodeHTML_row(title,data) {
      let result = ``;

      result += `
      <tr>
        <td class="compareTable__title"> ${title} </td>`;

      data.forEach(el => {
        result += `${el}`;
      })

      
    }
    
    // html table rows with limited number of rows
    genLimitedHTML_tr(data,limit) {
      let result = ``;
      let index = 0;

      for(const [nutrientName,nutrient] of Object.entries(data)) {
        index++;
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
    const array = this.extractTitle(this.appData.cache.full[this.appData.cache.full.length-1].foods);

    const uniqueArray = array.filter(onlyUnique);

    this.relatedBrandsList = this.HTMLControl.genHTML_li(uniqueArray);
  }

  // process profile data ( yet to be completed)
  processProfile() {

    this.brandProfile.loadAll(this.appData.cache.all[this.appData.cache.all.length-1]);

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

  // input foods array, return lowercaseDescription of each entry; removes characters at or after index of first digit
  extractTitle(data) {
    const array = [];
    for(const [nutrientName,nutrient] of Object.entries(data)) {
      let buffer = nutrient.lowercaseDescription;

      let indexDigit = buffer.search(/\d/);

      if (indexDigit==-1) {

      } else {
        buffer = buffer.slice(0,buffer.search(/\d/));
      }
      array.push(buffer);
    }

    return array
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

class CompareController {
  constructor() {
    this.data = new compareData;
    this.compareLength = 0;
    this.HTMLControl = new HTMLController;
    this.compareTable = "";
    this.proteinRow = "";
    this.fatRow = "";
    this.carbRow = "";
    this.waterRow = "";
    this.calRow = "";
  }


  async addFood(title) {
    this.compareLength++;

    this.data.addTitle(title);
    await this.newSearch(title);
    this.data.formatUnits();
    

    this.data.addItem(this.data.cache.all[this.data.cache.all.length-1]);

    this.processMajor();

    this.data.addColumn(this.HTMLControl.genDecodeHTML_column(this.majorDataTable,this.data.nutrients.energy.weight));

    console.log(this.data.column[0]);

    this.updateTable();

  }

  removeFood(index) {
    this.compareLength--;
    //console.log(this.compareLength);

    this.data.removeItem(index);

    this.updateTable();


  }

  async newSearch(userText) {

    const appState = state.getState();
    
    switch(appState) {
      case 0:
        
        await this.data.searchSurvey(userText);

        break;
      case 1:
        
        await this.data.searchBranded(userText);

 
        break;
      case 2:
        
        // fill data, then callback to function to process and display in ui
        await this.data.searchAll(userText);



        break;
      case 3:
        

        await this.data.searchFoundation(userText);


        break;
      default:
        break;
    }
  }

  processMajor() {
    this.majorDataTable = this.HTMLControl.genDecodeHTML_tr(this.data.nutrients.major);
  }

  updateTable() {
    let index = 0;
    if (this.compareLength == 0) {
      this.compareTable = "";
      ui.clearCompare();

    } else {
      this.compareTable = "";
      this.data.queue.forEach( () => {
        this.compareTable += this.data.column[index];
        this.compareTable += `
          <a href="javascript:void(0)" class="remove-btn btn" id="${index}"> Remove </a>
        </div>
        <h5 class="col-title"> ${this.data.titlesQueue[index]} </h5>
        </div>
        `
        index++;
      })
    }
  }

  clearTable() {
    this.compareTable = "";
  }
}