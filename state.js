class State {
    constructor() { 
        this.totalWeight = 100;
        
        // 0 == Survey, 1 == Branded; affects app.js and ui.js
        this.dataType = 1;
    }

    getState() {
        return this.dataType;
    }
}