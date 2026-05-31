// en
// instance of object with methods to fetch from DOA database
const api = new FoodDataConnect();

// object to allow switching between dataType filters on the api connection
const appData = new AppData();
const compareData = new CompareData();

// instance of UI which prints html to two divs in index.html
const ui = new UI();

const dataControl = new DataController();
const compareControl = new CompareController();
const errorHandlerI = new ErrorHandler();

dataControl.loadEventListeners();
