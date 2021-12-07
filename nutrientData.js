// class to sort nutrient data and concatenate into desired format
class nutrientElement extends Object {
    constructor() {
        super();
        this.weight = 0;
        this.units = "";
    }

    fill(weight,units) {
        this.weight = parseInt(weight);
        this.units = units;
    }
}

// structure to organize food nutrient data
class nutrientData {
    constructor() {

        //total weight of nutrients
        this.totalWeight = 0;

        // major nutrients
        this.major = {
            'protein' : new nutrientElement(),
            'fat' : new nutrientElement(),
            'carb' : new nutrientElement(),
            'fiber' : new nutrientElement()
        }

        // minerals
        this.minerals = {
            'calcium' : new nutrientElement(),
            'iron' : new nutrientElement(),
            'magnesium' : new nutrientElement(),
            'phosphorous' : new nutrientElement(),
            'zinc' : new nutrientElement(),
            'copper' : new nutrientElement(),
            'potassium' : new nutrientElement(),
            'sodium' : new nutrientElement(),
            'selenium' : new nutrientElement(),
        }

        // vitamins
        this.vitamins = {
            'vitA' : new nutrientElement(),
            'vitB6' : new nutrientElement(),
            'vitB12' : new nutrientElement(),
            'vitC' : new nutrientElement(),
            'vitD' : new nutrientElement(),
            'vitE' : new nutrientElement(),
            'vitK' : new nutrientElement(),
            'caroteneA' : new nutrientElement(),
            'caroteneB' : new nutrientElement(),
            'folicAcid' : new nutrientElement(),
            'niacin' : new nutrientElement(),
            'thiamin' : new nutrientElement(),
            'riboflavin' : new nutrientElement()
        }

        // miscellaneous
        this.misc = {
            'addedSugar' : new nutrientElement(),
            'cholesterol' : new nutrientElement(),
            'caffeine' : new nutrientElement(),
            'theobromine' : new nutrientElement(),
            'retinol' : new nutrientElement(),
            'alcohol' : new nutrientElement()
        }

        this.energy = new nutrientElement();


        // fats
        this.fats = {
            'sat' : {
                'total' : new nutrientElement(),
                '_0_4' : new nutrientElement(),
                '_0_6' : new nutrientElement(),
                '_0_10' : new nutrientElement(),
                '_0_16' : new nutrientElement(),
                '_0_18' : new nutrientElement(),
                '_0_20' : new nutrientElement()
            },
    
            'monoUnsat' : {
                'total' : new nutrientElement(),
                '_1_18' : new nutrientElement(),
                '_1_20' : new nutrientElement()
            },
    
            'polyUnsat' : {
                'total' : new nutrientElement(),
                '_3_18' : new nutrientElement(),
                '_4_20' : new nutrientElement() 
            }
        }


        // sugars
        this.sugars = {
            'total' : new nutrientElement(),
            'sucrose' : new nutrientElement(),
            'glucose' : new nutrientElement(),
            'maltose' : new nutrientElement()
        }



    }
    
    loadAll(nutrients) {
        nutrients.forEach(nutrient =>
            {
                this.sortMessage(nutrient);
            })
    }

    sortMessage(nutrient) {
        let nutrientId = nutrient.nutrientId;
        switch (nutrientId) {
            // Protein 
            case 1003:
                this.major.protein.fill(nutrient.value,nutrient.unitName);
                break;
            // Lipid 
            case 1004:
                this.major.fat.fill(nutrient.value,nutrient.unitName);
                break; 
            // Carbohydrate
            case 1005:
                this.major.carb.fill(nutrient.value,nutrient.unitName);
                break;    
            // Fiber
            case 1079:
                this.major.fiber.fill(nutrient.value,nutrient.unitName);
                break;

            // Ethyl Alcohol
            case 1018:
                this.misc.alcohol.fill(nutrient.value,nutrient.unitName);
                break;


            // Vitamin A
            case 1104:
                this.vitamins.vitA.fill(nutrient.value,nutrient.unitName);
                break;
            // Niacin (B3)
            case 1167:
                this.vitamins.niacin.fill(nutrient.value,nutrient.unitName);
                break;
            // Thiamin (B1)
            case 1165:
                this.vitaminsthiamin.fill(nutrient.value,nutrient.unitName);
                break;
            // Riboflavin
            case 1166:
                this.vitamins.riboflavin.fill(nutrient.value,nutrient.unitName);
                break;
            // Vitamin B6
            case 1175:
                this.vitamins.vitB6.fill(nutrient.value,nutrient.unitName);
                break;
            // Vitamin B12
            case 1178:
                this.vitamins.vitB12.fill(nutrient.value,nutrient.unitName);
                break; 
            // Vitamin Folate (B)
            case 1177:
                this.vitamins.folicAcid.fill(nutrient.value,nutrient.unitName);
                break;
            // Vitamin C
            case 1162:
                this.vitamins.vitC.fill(nutrient.value,nutrient.unitName);
                break;    
            // Vitamin D
            case 1114:
                this.vitamins.vitD.fill(nutrient.value,nutrient.unitName);
                break;
            // Vitamin K
            case 1185:
                this.vitamins.vitK.fill(nutrient.value,nutrient.unitName);
                break; 
            // Vitamin E
            case 1242:
                this.vitamins.vitE.fill(nutrient.value,nutrient.unitName);
                break;


            // Calcium
            case 1087:
                this.minerals.calcium.fill(nutrient.value,nutrient.unitName);
                break;
            // Iron
            case 1089:
                this.minerals.iron.fill(nutrient.value,nutrient.unitName);
                break;
            // Magnesium
            case 1090:
                this.minerals.magnesium.fill(nutrient.value,nutrient.unitName);
                break;
            // Phosphorous
            case 1091:
                this.minerals.phosphorous.fill(nutrient.value,nutrient.unitName);
                break;
            // Sodium
            case 1093:
                this.minerals.sodium.fill(nutrient.value,nutrient.unitName);
                break;
            // Potassium
            case 1092:
                this.minerals.potassium.fill(nutrient.value,nutrient.unitName);
                break; 
            // Zinc
            case 1095:
               this.minerals.zinc.fill(nutrient.value,nutrient.unitName);
                break;
            // Selenium
            case 1103:
               this.minerals.selenium.fill(nutrient.value,nutrient.unitName);
                break;    
            // Copper
            case 1098:
                this.minerals.copper.fill(nutrient.value,nutrient.unitName);
                break;
            // Vitamin K
            case 1185:
                this.vitamins.vitK.fill(nutrient.value,nutrient.unitName);
                break; 
            // Vitamin E
            case 1242:
                this.vitamins.vitE.fill(nutrient.value,nutrient.unitName);
                break;


            // Sugars
            case 2000:
                this.sugars.total.fill(nutrient.value,nutrient.unitName);
                break; 
            // Sucrose
            case 1010:
                this.sugars.sucrose.fill(nutrient.value,nutrient.unitName);
                //console.log(this.protein);
                break;
            // Glucose
            case 1011:
                this.sugars.glucose.fill(nutrient.value,nutrient.unitName);
                break; 
            // Maltose
            case 1014:
                this.sugars.maltose.fill(nutrient.value,nutrient.unitName);
                break;    



            // SFA 4:0
            case 1259:
                this.fats.sat._0_4.fill(nutrient.value,nutrient.unitName);
                break;
            // SFA 6:0
            case 1260:
                this.fats.sat._0_6.fill(nutrient.value,nutrient.unitName);
                break; 
            // SFA 10:0
            case 1262:
                this.fats.sat._0_10.fill(nutrient.value,nutrient.unitName);
                break;

            // SFA 16:0
            case 1265:
                this.fats.sat._0_16.fill(nutrient.value,nutrient.unitName);
                break;

            // SFA 18:0
            case 1266:
                this.fats.sat._0_18.fill(nutrient.value,nutrient.unitName);
                break;

            // SFA 20:0
            case 1267:
                this.fats.sat._0_20.fill(nutrient.value,nutrient.unitName);
                break;


            // MUFA 18:1
            case 1268:
                this.fats.monoUnsat._1_18.fill(nutrient.value,nutrient.unitName);
                break;

            // MUFA 20:1
            case 1277:
                this.fats.monoUnsat._1_20.fill(nutrient.value,nutrient.unitName);
                break;

                
            // PUFA 18:3
            case 1270:
                this.fats.polyUnsat._3_18.fill(nutrient.value,nutrient.unitName);
                break;

            // PUFA 20:4
            case 1271:
                this.fats.polyUnsat._4_20.fill(nutrient.value,nutrient.unitName);
                break; 




            // Vitamin Folate (B)
            case 1177:
                this.folicAcid.fill(nutrient.value,nutrient.unitName);
                break;
            // Vitamin C
            case 1162:
                this.vitC.fill(nutrient.value,nutrient.unitName);
                break;    
            // Vitamin D
            case 1114:
                this.vitD.fill(nutrient.value,nutrient.unitName);
                break;
            // Vitamin K
            case 1185:
                this.vitK.fill(nutrient.value,nutrient.unitName);
                break; 
            // Vitamin E
            case 1242:
                this.vitE.fill(nutrient.value,nutrient.unitName);
                break;
            // Energy
            case 1008:
                this.energy.fill(nutrient.value,nutrient.unitName);
                break;
        }


    }

    clear() {
        // major nutrients
        this.protein = "";
        this.fat = "";
        this.carb = "";
        this.energy = "";
        this.sugars = "";
        this.fiber = "";

        // minerals
        this.calcium = "";
        this.iron = "";
        this.magnesium = "";
        this.phosphorous = "";
        this.zinc = "";
        this.copper = "";
        this.selenium = "";
        this.potassium ="";
        this.sodium = "";
        this.addedSugar = "";
        this.cholesterol = "";
        this.transFat = "";
        this.satFat = "";
        this.caffeine = "";
        this.theobromine = "";
        this.retinol = "";

        // vitamins
        this.vitA = "";
        this.vitB6 = "";
        this.vitB12 = "";
        this.vitC = "";
        this.vitD = "";
        this.vitE = "";
        this.vitK = "";
        this.caroteneA = "";
        this.caroteneB = "";
        this.folicAcid = "";
        this.niacin = "";
        this.thiamin = "";
        this.riboflavin = "";

        // toxins
        this.alcohol = "";

    }

    concatValueUnits(nutrient) {
        let result = nutrient.weight + ": " + nutrient.units;

        return result
        
    }
}