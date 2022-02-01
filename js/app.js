// entry point

// instance of object with methods to fetch from DOA database
const api = new FoodDataConnect;

// object to allow switching between dataType filters on the api connection
const state = new State;

// instance of UI which prints html to two divs in index.html
const ui = new UI(state);

const data = new DataController(state);

ui.createSearchUser();

// check if input is empty
