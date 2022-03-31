class FoodDataConnect {
  constructor() {
    this.baseEndpoint = `https://api.nal.usda.gov/fdc/v1/foods`;
    this.apiKey = `d7Oz5ahadOFQJVmGbPy73LiaSEzitDK8BucZSdgB`;

  }

  //calling URL with fetch; using "Branded" endpoint to fetch ingredients and limited nutrient data
  async searchBrand(food) {

    const foodResponse = await fetch (`${this.baseEndpoint}/search?api_key=${this.apiKey}&query=${food}&dataType=Branded`, {
      method:'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    });

    const response = await foodResponse.json();

    // return response from website in JSON format
    return {
      response
    }
  }

  // search api with dataType=SR Legacy
  async searchLegacy(food) {

    const foodResponse = await fetch (`${this.baseEndpoint}/search?api_key=${this.apiKey}&query=${food}&dataType=SR Legacy`, {
      method:'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    });

    const response = await foodResponse.json();
    // return response from website in JSON format
    return {
      response
    }
  }

  // search api with dataType=SR Legacy
  async searchFoundational(food) {

    const foodResponse = await fetch (`${this.baseEndpoint}/search?api_key=${this.apiKey}&query=${food}&dataType=Foundation`, {
      method:'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    });

    const response = await foodResponse.json();

    // return response from website in JSON format
    return {
      response
    }
  }

  // search API without a dataType filter
  async searchAll(food) {

    const foodResponse = await fetch (`${this.baseEndpoint}/search?api_key=${this.apiKey}&query=${food}`, {
      method:'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    });

    const response = await foodResponse.json();

    // return response from website in JSON format
    return {
      response
    }
  }

  // use "Survey" endpoint to get complete food nutrition based on average not brand
  async searchSurvey(food) {

    const foodResponse = await fetch (`${this.baseEndpoint}/search?api_key=${this.apiKey}&query=${food}&dataType=Survey (FNDDS)`, {
      method:'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    });

    const response = await foodResponse.json();
    
    // return response from website in JSON format
    return {
      response
    }
  }


}