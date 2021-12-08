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

        // total weight of nutrients
        this.totalWeight = 0;

        // major nutrients
        this.major = {
            'protein' : new nutrientElement(),
            'fat' : new nutrientElement(),
            'carb' : new nutrientElement()
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
            'vitamin_A' : new nutrientElement(),
            'vitamin_B6' : new nutrientElement(),
            'vitamin_B12' : new nutrientElement(),
            'vitamin_C' : new nutrientElement(),
            'vitamin_D' : new nutrientElement(),
            'vitamin_E' : new nutrientElement(),
            'vitamin_K' : new nutrientElement(),
            'caroteneA' : new nutrientElement(),
            'caroteneB' : new nutrientElement(),
            'folic_acid' : new nutrientElement(),
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
            'alcohol' : new nutrientElement(),
            'fiber' : new nutrientElement()
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
    
    // calls "sortMessage()" on each nutrient
    loadAll(nutrients) {
        nutrients.forEach(nutrient =>
            {
                this.sortMessage(nutrient);
            })
    }

    // sorts each nutrient according to provided nutrientId
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
                this.misc.fiber.fill(nutrient.value,nutrient.unitName);
                break;

            // Ethyl Alcohol
            case 1018:
                this.misc.alcohol.fill(nutrient.value,nutrient.unitName);
                break;


            // Vitamin A
            case 1106:
                this.vitamins.vitamin_A.fill(nutrient.value,nutrient.unitName);
                break;
            // Niacin (B3)
            case 1167:
                this.vitamins.niacin.fill(nutrient.value,nutrient.unitName);
                break;
            // Thiamin (B1)
            case 1165:
                this.vitamins.thiamin.fill(nutrient.value,nutrient.unitName);
                break;
            // Riboflavin
            case 1166:
                this.vitamins.riboflavin.fill(nutrient.value,nutrient.unitName);
                break;
            // Vitamin B6
            case 1175:
                this.vitamins.vitamin_B6.fill(nutrient.value,nutrient.unitName);
                break;
            // Vitamin B12
            case 1178:
                this.vitamins.vitamin_B12.fill(nutrient.value,nutrient.unitName);
                break; 
            // Vitamin Folate (B)
            case 1177:
                this.vitamins.folic_acid.fill(nutrient.value,nutrient.unitName);
                break;
            // Vitamin C
            case 1162:
                this.vitamins.vitamin_C.fill(nutrient.value,nutrient.unitName);
                break;    
            // Vitamin D
            case 1114:
                this.vitamins.vitamin_D.fill(nutrient.value,nutrient.unitName);
                break;
            // Vitamin K
            case 1185:
                this.vitamins.vitamin_K.fill(nutrient.value,nutrient.unitName);
                break; 
            // Vitamin E
            case 1242:
                this.vitamins.vitamin_E.fill(nutrient.value,nutrient.unitName);
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
                this.vitamins.vitamin_K.fill(nutrient.value,nutrient.unitName);
                break; 
            // Vitamin E
            case 1242:
                this.vitamins.vitamin_E.fill(nutrient.value,nutrient.unitName);
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
                this.folic_acid.fill(nutrient.value,nutrient.unitName);
                break;
            // Vitamin C
            case 1162:
                this.vitamin_C.fill(nutrient.value,nutrient.unitName);
                break;    
            // Vitamin D
            case 1114:
                this.vitamin_D.fill(nutrient.value,nutrient.unitName);
                break;
            // Vitamin K
            case 1185:
                this.vitamin_K.fill(nutrient.value,nutrient.unitName);
                break; 
            // Vitamin E
            case 1242:
                this.vitamin_E.fill(nutrient.value,nutrient.unitName);
                break;
            // Energy
            case 1008:
                this.energy.fill(nutrient.value,nutrient.unitName);
                break;
        }


    }

    clear() {
        //total weight of nutrients
        this.totalWeight = 0;

        // major nutrients
        this.major = {
            'protein' : new nutrientElement(),
            'fat' : new nutrientElement(),
            'carb' : new nutrientElement()
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
            'vitamin_A' : new nutrientElement(),
            'vitamin_B6' : new nutrientElement(),
            'vitamin_B12' : new nutrientElement(),
            'vitamin_C' : new nutrientElement(),
            'vitamin_D' : new nutrientElement(),
            'vitamin_E' : new nutrientElement(),
            'vitamin_K' : new nutrientElement(),
            'caroteneA' : new nutrientElement(),
            'caroteneB' : new nutrientElement(),
            'folic_acid' : new nutrientElement(),
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
            'alcohol' : new nutrientElement(),
            'fiber' : new nutrientElement()
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

    calcTotalWeight(data) {
        for (const [key,value] of Object.entries(this.major)) {
            this.totalWeight += value.weight;
        }

        for (const [key,value] of Object.entries(this.minerals)) {
            switch (value.units) {
                case 'G' :
                    this.totalWeight += value.weight;
                    break;
                case 'MG':
                    this.totalWeight += value.weight/1000;
                    break;
                case 'UG':
                    this.totalWeight += value.weight/1000000
                    break;
                default :
                    break;
            }
        }

        for (const [key,value] of Object.entries(this.vitamins)) {
            switch (value.units) {
                case 'G' :
                    this.totalWeight += value.weight;
                    break;
                case 'MG':
                    this.totalWeight += value.weight/1000;
                    break;
                case 'UG':
                    this.totalWeight += value.weight/1000000
                    break;
                default :
                    break;
            }
        }

        console.log(this.totalWeight);
    }

    formatUnits() {
        for(const [nutrientName,nutrient] of Object.entries(this.vitamins)) {
            if (!nutrient.units) {
    
            } else {
              switch (nutrient.units) {
                    case 'G':
                        nutrient.units = nutrient.units.toLowerCase();
                        break;
                    case 'MG':
                        nutrient.units = nutrient.units.toLowerCase();
                        break;
                    case 'UG':
                        nutrient.units = "\u00B5g" ;
                        break;
                    default:
                        break;
              }
            }
        }
        for(const [nutrientName,nutrient] of Object.entries(this.minerals)) {
            if (!nutrient.units) {
    
            } else {
              switch (nutrient.units) {
                    case 'G':
                        nutrient.units = nutrient.units.toLowerCase();
                        break;
                    case 'MG':
                        nutrient.units = nutrient.units.toLowerCase();
                        break;
                    case 'UG':
                        nutrient.units = "\u00B5g" ;
                        break;
                    default:
                        break;
              }
            }
          

        }
        for(const [nutrientName,nutrient] of Object.entries(this.major)) {
            if (!nutrient.units) {
    
            } else {
              switch (nutrient.units) {
                    case 'G':
                        nutrient.units = nutrient.units.toLowerCase();
                        break;
                    case 'MG':
                        nutrient.units = nutrient.units.toLowerCase();
                        break;
                    case 'UG':
                        nutrient.units = "\u00B5g" ;
                        break;
                    default:
                        break;
              }
            }
          

        }
    }

    concatValueUnits(nutrient) {
        let result = nutrient.weight + ": " + nutrient.units;

        return result
        
    }
}