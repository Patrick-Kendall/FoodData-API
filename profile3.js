class Profile {
    constructor() {
        this.ingredients = "";
        this.serving = {
            'size' : "",
            'units' : ""
        };
        this.description = "";
        this.published_date = "";
        this.density = 0;
        this.brandOwner = "";
    }

    loadAll(data) {
        this.ingredients = data.ingredients;
        this.serving.size = parseInt(data.servingSize);
        this.serving.units = data.servingSizeUnit;
        this.published_date = data.publishedDate;
        this.description = data.description;
        this.brandOwner = data.brandOwner;
    }
}