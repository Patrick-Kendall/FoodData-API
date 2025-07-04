class ErrorHandler {
  constructor() {}

  handle(errorMessage) {
    console.log("hi");
    switch (errorMessage) {
      case noResponse:
        console.log("no response from API");
        break;
    }
  }
}
