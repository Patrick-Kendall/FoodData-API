class State {
    constructor() { 
        // dataType is a state variable for different endpoints of the API; affects app.js and ui.js
        // 0 == Survey, 
        // 1 == Branded,
        // 2 == All: 
        // 3 == Foundational: complete nutrition info with amino acids; low variety of foodstuff
        this.dataType = 3;
    }

    getState() {
        return this.dataType;
    }
}