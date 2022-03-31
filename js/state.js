class State {
    constructor() { 
        // dataType is a state variable for different endpoints of the API; affects event listeners in app.js and ui.js
        // 0 == Survey, 
        // 1 == Branded,
        // 2 == All: 
        // 3 == Foundational: complete nutrition info with amino acids; low variety of foodstuff
        this.dataType = 2;

        this.serving = 100;
        this.dailyCalories = 2000;
    }

    getState() {
        return this.dataType;
    }

    setServing(servingSize) {
        this.serving = servingSize;
    }

    setCalories(cal) {
        this.dailyCalories = cal;
    }
}