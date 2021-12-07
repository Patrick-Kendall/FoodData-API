class FoodData {
  constructor() {
    this.baseEndpoint = `https://api.nal.usda.gov/fdc/v1/foods`;
    this.apiKey = `d7Oz5ahadOFQJVmGbPy73LiaSEzitDK8BucZSdgB`;

  }

  //calling URL with fetch; fetching title, charge, etc..
  async search(chemical) {
    //chemical = chemical.split(" ").join("+");

    const chemicalResponse = await fetch (`${this.baseEndpoint}/search?api_key=${this.apiKey}&query=${chemical}&dataType=Branded`, {
      method:'GET',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    });

    const response = await chemicalResponse.json();

    console.log(response);

    // return response from website in JSON format
    return {
      response
    }
  }


}