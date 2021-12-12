class Profile3 {
    constructor() {
        this.ingredients = "";
        this.serving = {
            'size' : "",
            'units' : ""
        };
        this.description = "";
        this.published_date = "";
        this.density = 0;
    }

    loadAll(data) {
        this.ingredients = data.ingredients;
        this.serving.size = data.servingSize;
        this.serving.units = data.servingSizeUnit;
        this.published_date = data.publishedDate;
    }
}