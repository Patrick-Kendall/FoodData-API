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
            <btn class="compare__btn btn" id="${el}">Compare</btn>
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
    genDecodeHTML_row2(identifier,title,data) {
      let result = ``;

      result += `
      <tr>
        <td class="${identifier}Table__title"><div class="square square-${title}" ></div> ${title} </td>`;

      data.forEach(el => {
        result += `<td class="${identifier}Table__element"> ${el}g </td>`;
      })

      result += `</tr>`

      return result
    }

    genDecodeHTML_row(identifier,title,data) {
      let result = ``;

      result += `
      <tr>
        <td class="${identifier}Table__title"> ${title} </td>`;

      data.forEach(el => {
        result += `<td class="${identifier}Table__element"> ${el} </td>`;
      })

      result += `</tr>`

      return result
    }
    
    // generate canvas with inputted id
    genCanvas(index) {
      let result = ``;
      
      result += `
      <canvas id="pie${index}" class="pie" width="150px" height="90"></canvas>
      `;

      return result
    }

    genPieChart(index) {
      let result = `
      <div class="pie-container"> 
        `;

      result += this.genCanvas(index);

      result += `</div>`;

      return result
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
    this.titlesQueue = "";
    this.pieQueue = "";
    this.removeQueue = "";
    this.proteinRow = "";
    this.fatRow = "";
    this.carbRow = "";
    this.waterRow = "";
    this.calRow = "";
    this.proArray = [];
    this.fatArray = [];
    this.carbArray = [];
    this.waterArray = [];
    this.calArray = [];
  }
  
  async processQueue() {

    const queue = this.data.queue;
    console.log(queue);

    queue.forEach(el => 
      {
        this.data.nutrients.loadAll(el.foodNutrients);
        this.data.formatUnits();

        if (this.data.nutrients.major.protein.weight == 0) {
          this.proArray.push("0");
        } else {
          this.proArray.push(this.data.nutrients.major.protein.weight);
        };
  
        if (this.data.nutrients.major.fat.weight == 0) {
          this.fatArray.push("0");
        } else {
          this.fatArray.push(this.data.nutrients.major.fat.weight);
        };
    
        if (this.data.nutrients.major.carb.weight == 0) {
          this.carbArray.push("0");
        } else {
          this.carbArray.push(this.data.nutrients.major.carb.weight);
        };
        
        if (this.data.nutrients.major.water.weight == 0) {
          this.waterArray.push("0");
        } else {
          this.waterArray.push(this.data.nutrients.major.water.weight);
        };

        if (this.data.nutrients.energy.weight == 0) {
          this.calArray.push(0);
        } else {
          this.calArray.push(this.data.nutrients.energy.weight);
        };
      });


    return
  }
  
  async addFood(title) {
    this.compareLength++;

    this.data.addTitle(title);
    await this.newSearch(title);
    this.data.formatUnits();

    this.data.addItem(this.data.cache.all[this.data.cache.all.length-1]);

    await this.processQueue();

    this.createCompare();
  }

  async removeFood(index) {
    this.compareLength--;
    //console.log(this.compareLength);

    this.data.removeItem(index);

    this.clear();
    ui.clearCompare();

    await this.processQueue();

    this.createCompare();

    console.log(this.titlesQueue);

    ui.showCompare();


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

  // inputs arrays created in processQueue()
  createTable() {
    let result =  `<table class="compare__table">`;

    result += this.HTMLControl.genDecodeHTML_row2('compare','Protein',this.proArray);
    result += this.HTMLControl.genDecodeHTML_row2('compare','Fat',this.fatArray);
    result += this.HTMLControl.genDecodeHTML_row2('compare','Carbs',this.carbArray);
    result += this.HTMLControl.genDecodeHTML_row2('compare','Water',this.waterArray);

    result += `</table>`

    this.compareTable = result;
  }

  createCompare() {
    
    this.createTable();

    this.createPieQueue();
    

    
    this.createTitles();

    this.createRemove();

  }

  createTitles() {
    let result = `<table class="title__table">`;

    result += this.HTMLControl.genDecodeHTML_row('title','',this.data.titlesQueue);

    result += `</table`;

    this.titlesQueue = result;
  }

  createRemove() {
    let result = "";
    let index = 0;

    this.data.queue.forEach(() => {
      result += `<div class="remove__container"> <btn class="remove__btn btn" id="${index}">Remove </btn></div>`;
      index++;
    })

    this.removeQueue = result;
  }

  createPieQueue() {
    let index = 0;
    if (this.compareLength == 0) {
      this.pieQueue = "";


    } else {
      this.pieQueue = "";
      this.data.queue.forEach( () => {
        this.pieQueue += this.HTMLControl.genPieChart(index);
        index++;
      })
    }
  }

  updatePieQueue() {
    let index = 0;
    if (this.compareLength == 0) {
      this.pieQueue = "";


    } else {
      this.data.queue.forEach( (el) => {
        this.data.nutrients.loadAll(el.foodNutrients);
        this.newPieChart(index);
        index++;
      })
    }
  }

  clear() {
    this.data.nutrients.clear();
    this.compareTable = "";
    this.titlesQueue = "";
    this.pieQueue = "";
    this.removeQueue = "";
    this.proteinRow = "";
    this.fatRow = "";
    this.carbRow = "";
    this.waterRow = "";
    this.calRow = "";
    this.proArray = [];
    this.fatArray = [];
    this.carbArray = [];
    this.waterArray = [];
    this.calArray = [];
  }
  
  newPieChart(index) {

    const ctx = document.getElementById(`pie${index}`).getContext("2d");
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Protein','Fat','Water','Carbs'],
            datasets: [{
                label: 'Food',
                data: [this.data.nutrients.major.protein.weight,this.data.nutrients.major.fat.weight,this.data.nutrients.major.water.weight,this.data.nutrients.major.carb.weight],
                backgroundColor: [
                    'rgba(253, 6, 6,0.8)',
                    'rgba(255,255,33,1)',
                    'rgba(33,33,235,0.5)',
                    'rgba(255, 255, 255,1)'
                ],
                borderColor: [
                    'rgba(253, 6, 6,1)',
                    'rgba(255,255,33,1)',
                    'rgba(33,33,235,1)',
                    'rgba(255, 255, 255,1)'
                ],
                borderWidth: 1
            }]
          },
        options: {
          plugins: {
            title: {
              display: false,
              text: this.data.titlesQueue[index],
              font: {
                size: 18
              }
            },
            legend: {
              display: false,
              
            }
          }
        }
    });

      }
}