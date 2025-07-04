function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
} // Source: stackExchange

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
} // Source: stackExchange

class HTMLController {
  constructor() {}

  // generate html list elements with inputted object
  genHTML_li(data) {
    let result = ``;

    data.forEach((el) => {
      result += `
        <li class="related__entry">
          <a href="javascript:void(0)" class="related__title">${el}</a> 
          <div>
            <btn class="compare__btn btn" id="${el}">Compare</btn>
          </div>
        </li>
        `;
    });

    return result;
  }

  // generate html table rows with inputted object
  genHTML_tr(data) {
    let result = ``;

    for (const [nutrientName, nutrient] of Object.entries(data)) {
      if (!nutrient.units) {
      } else if (nutrient.weight < 0.01) {
      } else {
        result += `
          <tr>
            <td> ${nutrientName}:</td>
            <td class="nutrient-value-units"> ${nutrient.weight} ${nutrient.units} </td>
          </tr>
        `;
      }
    }

    return result;
  }

  // html table rows with inputted object AND convert "_" to " "
  genDecodeHTML_tr(data) {
    let result = ``;

    for (const [nutrientName, nutrient] of Object.entries(data)) {
      if (!nutrient.units) {
      } else if (nutrient.weight < 0.01) {
      } else {
        result += `
          <tr class="nutrient-table-row">
            <td class="nutrient-table-label"> ${nutrientName
              .split("_")
              .join(" ")}:</td>
            <td class="nutrient-table-units"> ${nutrient.weight} ${
          nutrient.units
        } </td>
            <td class="invisible">${nutrient.rdvPercent} % </td>
          </tr>
        `;
      }
    }

    return result;
  }

  genDecodeHTML_column(dataTable, calories) {
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

    return result;
  }

  // data is expected input array of "15g" ...
  genDecodeHTML_row2(identifier, title, data) {
    let result = ``;

    result += `
      <tr>
        <td class="${identifier}Table__title"><div class="square square-${title}" ></div> ${title} </td>`;

    data.forEach((el) => {
      result += `<td class="${identifier}Table__element"> ${el}g </td>`;
    });

    result += `</tr>`;

    return result;
  }

  genDecodeHTML_row(identifier, title, data) {
    let result = ``;

    result += `
      <tr>
        <td class="${identifier}Table__title"> ${title} </td>`;

    data.forEach((el) => {
      result += `<td class="${identifier}Table__element"> ${el} </td>`;
    });

    result += `</tr>`;

    return result;
  }

  // generate canvas with inputted id
  genCanvas(index) {
    let result = ``;

    result += `
      <canvas id="pie${index}" class="pie" width="150px" height="90"></canvas>
      `;

    return result;
  }

  genPieChart(index) {
    let result = `
      <div class="pie-container"> 
        `;

    result += this.genCanvas(index);

    result += `</div>`;

    return result;
  }
  // html table rows with limited number of rows
  genLimitedHTML_tr(data, limit) {
    let result = ``;
    let index = 0;

    for (const [nutrientName, nutrient] of Object.entries(data)) {
      index++;
      if (index < limit) {
        if (!nutrient.units) {
        } else if (nutrient.weight < 0.01) {
        } else {
          result += `
            <tr>
              <td> ${nutrientName.split("_").join(" ")}:</td>
              <td class="nutrient-value-units">${nutrient.weight} ${
            nutrient.units
          } </td>
              <td class="nutrient-daily-value">${nutrient.rdvPercent} % </td>
            </tr>
          `;
        }
      }
    }

    return result;
  }
}

class DataController {
  constructor() {
    this.HTMLControl = new HTMLController();
  }

  loadEventListeners() {
    // getting user input from webpage
    const searchUser = document.getElementById("searchUser");

    searchUser.addEventListener("keypress", this.searchSubmit.bind(this));
  }

  createClickEventListenerRelated() {
    // enabling link to new, related searches
    let sim = document.querySelectorAll(".related__title");
    sim.forEach((el) => {
      el.addEventListener("click", this.relatedSubmit.bind(this));
    });
  }

  createClickEventListenerCompare() {
    const comp = document.querySelectorAll(".compare__btn");
    comp.forEach((el) => {
      el.addEventListener(
        "click",
        compareControl.compareSearchSubmit.bind(this)
      );
    });
  }

  createClickEventListenerRemove() {
    const compItems = document.querySelectorAll(".remove__btn");
    compItems.forEach((el) => {
      el.addEventListener("click", compareControl.removeFood.bind(this));
    });
  }

  async newSearch(userText) {
    const appState = appData.getState();

    switch (appState) {
      case 0:
        await appData.searchSurvey(userText);

        break;
      case 1:
        await appData.searchBranded(userText);

        break;
      case 2:
        // fill data, then callback to function to process and display in ui
        await appData.searchAll(userText);

        break;
      case 3:
        await appData.searchFoundation(userText);

        break;
      default:
        break;
    }
  }

  async searchSubmit(e) {
    let userText = e.target.value;

    const key = e.code;

    if (key == "Enter") {
      this.clear();
      await this.newSearch(userText);
    } else {
      return;
    }

    appData.processNutrition();

    // create array of data needed for showNutrition()
    const nutritionData = [
      appData.formattedData,
      appData.cache.all[appData.cache.all.length - 1].description,
      appData.nutrients.energy.weight,
    ];

    ui.showNutrition(nutritionData);

    appData.processRelatedBrands();

    const relatedData = appData.relatedBrandsList;

    ui.showRelatedSearches(relatedData);

    this.createClickEventListenerRelated();
    this.createClickEventListenerCompare();
    this.createClickEventListenerRemove();
  }

  async relatedSubmit(e) {
    let userText = e.target.innerHTML;

    // convert % to URL encoded "%25"
    userText = userText.split("%").join("%25");
    userText = userText.split('"').join("");

    this.clear();
    await this.newSearch(userText);

    appData.processNutrition();

    // create array of data needed for showNutrition()
    const nutritionData = [
      appData.formattedData,
      appData.cache.all[appData.cache.all.length - 1].description,
      appData.nutrients.energy.weight,
    ];

    ui.showNutrition(nutritionData);

    appData.processRelatedBrands();

    const relatedData = appData.relatedBrandsList;

    ui.showRelatedSearches(relatedData);

    this.createClickEventListenerCompare();
    this.createClickEventListenerRemove();
  }

  clear() {
    appData.nutrients.clear();
  }
}

class CompareController {
  constructor() {
    this.HTMLControl = new HTMLController();
  }

  async compareSearchSubmit(e) {
    this.clear();

    compareData.addTitle(e.target.getAttribute("id"));

    // newSearch adds search response to cache.all[]
    await compareControl.newSearch(e.target.getAttribute("id"));
    compareData.formatUnits();

    compareData.addItem(
      compareData.cache.all[compareData.cache.all.length - 1]
    );

    compareData.processQueue();

    compareData.createCompare();

    const compareQueues = [
      compareData.pieQueue,
      compareData.titlesQueue,
      compareData.compareTable,
      compareData.removeQueue,
    ];

    ui.showCompare(compareQueues);

    compareData.updatePieQueue();

    this.createClickEventListenerRemove();
  }

  async removeFood(e) {
    //console.log(this.compareLength);

    compareData.removeItem(e.target.getAttribute("id"));

    ui.clearCompare();

    compareData.processQueue();

    compareData.createCompare();

    const compareQueues = [
      compareData.pieQueue,
      compareData.titlesQueue,
      compareData.compareTable,
      compareData.removeQueue,
    ];

    ui.showCompare(compareQueues);

    compareData.updatePieQueue();

    this.createClickEventListenerRemove();
  }

  async newSearch(userText) {
    const appState = appData.getState();

    switch (appState) {
      case 0:
        await compareData.searchSurvey(userText);

        break;
      case 1:
        await compareData.searchBranded(userText);

        break;
      case 2:
        await compareData.searchAll(userText);

        break;
      case 3:
        await compareData.searchFoundation(userText);

        break;
      default:
        break;
    }
  }

  clear() {
    compareData.nutrients.clear();
  }
}
