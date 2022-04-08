// class to manage endpoint of the "nutrientData" structure
class nutrientElement extends Object {
    constructor() {
        super();
        this.weight = 0;
        this.units = "";
        this.rdv = 1;
        this.rdvPercent = 0;
    }

    // populate data
    fill(weight,units,rdv) {
        this.weight = weight;
        this.units = units;
        this.rdv = rdv;
    }

    calculateRdvPercent() {
        let res = this.weight/this.rdv*100*10;
        let ref = parseInt(res);
        this.rdvPercent = ref/10;
        
    }
}

// structure to organize food nutrient data (model class)
class nutrientData {
    constructor() {

        // setting serving size
        //this.servingSize = serving;

        // total weight of nutrients
        this.totalWeight = 0;

        // major nutrients
        this.major = {
            'protein' : new nutrientElement(),
            'fat' : new nutrientElement(),
            'carb' : new nutrientElement(),
            'water' : new nutrientElement()
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
            'selenium' : new nutrientElement()
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
            'alcohol' : new nutrientElement(),
            'fiber' : new nutrientElement()
        }

        this.energy = new nutrientElement();

        // fats
        this.fats = {
            'sat' : {
                'SFA_4x0' : new nutrientElement(),
                'SFA_6x0' : new nutrientElement(),
                'SFA_10x0' : new nutrientElement(),
                'SFA_12x0' : new nutrientElement(),
                'SFA_14x0' : new nutrientElement(),
                'SFA_16x0' : new nutrientElement(),
                'SFA_18x0' : new nutrientElement(),
                'SFA_20x0' : new nutrientElement()
            },
    
            'monoUnsat' : {
                'MUFA_15x1' : new nutrientElement(),
                'MUFA_16x1' : new nutrientElement(),
                'MUFA_18x1' : new nutrientElement(),
                'MUFA_20x1' : new nutrientElement(),
                'MUFA_22x1' : new nutrientElement()
            },
    
            'polyUnsat' : {
                'PUFA_18x2' : new nutrientElement(),
                'PUFA_18x3' : new nutrientElement(),
                'PUFA_18x4' : new nutrientElement(),
                'PUFA_20x4' : new nutrientElement(),
                'PUFA_22x5' : new nutrientElement(),
                'PUFA_22x6' : new nutrientElement(),
                'PUFA_2x5' : new nutrientElement(),
            },

            'fatTotals' : {
                'saturated_Fat' : new nutrientElement(),
                'mono_unsaturated_Fat' : new nutrientElement(),
                'poly_unsaturated_Fat' : new nutrientElement()
            }
        }

        // aminoAcids
        this.aminoAcids = {
            'tryptophan' : new nutrientElement(),
            'threonine' : new nutrientElement(),
            'methionine' : new nutrientElement(),
            'phenylalanine' : new nutrientElement(),
            'tyrosine' : new nutrientElement(),
            'alanine' : new nutrientElement(),
            'glutamic_acid' : new nutrientElement(),
            'glycine' : new nutrientElement(),
            'proline' : new nutrientElement(),
            'isoleucine' : new nutrientElement(),
            'leucine' : new nutrientElement(),
            'lysine' : new nutrientElement(),
            'valine' : new nutrientElement(),
            'arginine' : new nutrientElement(),
            'aspartic_acid' : new nutrientElement(),
            'serine' : new nutrientElement(),
            'histidine' : new nutrientElement(),
            'cystine' : new nutrientElement()
        }


        // sugars
        this.sugars = {
            'sucrose' : new nutrientElement(),
            'glucose' : new nutrientElement(),
            'maltose' : new nutrientElement(),
            'total' : new nutrientElement()
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
        const nutrientId = nutrient.nutrientId;
        switch (nutrientId) {
            // Protein 
            case 1003:
                this.major.protein.fill(nutrient.value,nutrient.unitName,50);
                this.major.protein.calculateRdvPercent();
                break;
            // Lipid 
            case 1004:
                this.major.fat.fill(nutrient.value,nutrient.unitName,78);
                this.major.fat.calculateRdvPercent();
                break; 
            // Carbohydrate
            case 1005:
                this.major.carb.fill(nutrient.value,nutrient.unitName,275);
                this.major.carb.calculateRdvPercent();
                break;    
            case 1051:
                this.major.water.fill(nutrient.value,nutrient.unitName);
                break;
            // Fiber
            case 1079:
                this.misc.fiber.fill(nutrient.value,nutrient.unitName,28);
                this.misc.fiber.calculateRdvPercent();
                break;

            // Ethyl Alcohol
            case 1018:
                this.misc.alcohol.fill(nutrient.value,nutrient.unitName);
                break;


            // Vitamin A
            case 1106:
                this.vitamins.vitamin_A.fill(nutrient.value,nutrient.unitName,900);
                this.vitamins.vitamin_A.calculateRdvPercent();
                break;
            // Vitamin A Alternative
            case 1104:
                this.vitamins.vitamin_A.fill(nutrient.value,nutrient.unitName,900);
                this.vitamins.vitamin_A.calculateRdvPercent();
                break;
            // Niacin (B3)
            case 1167:
                this.vitamins.niacin.fill(nutrient.value,nutrient.unitName,16);
                this.vitamins.niacin.calculateRdvPercent();
                break;
            // Thiamin (B1)
            case 1165:
                this.vitamins.thiamin.fill(nutrient.value,nutrient.unitName,1.2);
                this.vitamins.thiamin.calculateRdvPercent();
                break;
            // Riboflavin
            case 1166:
                this.vitamins.riboflavin.fill(nutrient.value,nutrient.unitName,1.3);
                this.vitamins.riboflavin.calculateRdvPercent();
                break;
            // Vitamin B6
            case 1175:
                this.vitamins.vitamin_B6.fill(nutrient.value,nutrient.unitName,1.7);
                this.vitamins.vitamin_B6.calculateRdvPercent();
                break;
            // Vitamin B12
            case 1178:
                this.vitamins.vitamin_B12.fill(nutrient.value,nutrient.unitName,2.4);
                this.vitamins.vitamin_B12.calculateRdvPercent();
                break; 
            // Vitamin Folate (B)
            case 1177:
                this.vitamins.folic_acid.fill(nutrient.value,nutrient.unitName,400);
                this.vitamins.folic_acid.calculateRdvPercent();
                break;
            // Vitamin C
            case 1162:
                this.vitamins.vitamin_C.fill(nutrient.value,nutrient.unitName,90);
                this.vitamins.vitamin_C.calculateRdvPercent();
                break;    
            // Vitamin D
            case 1114:
                this.vitamins.vitamin_D.fill(nutrient.value,nutrient.unitName,20);
                this.vitamins.vitamin_D.calculateRdvPercent();
                break;
            // Vitamin K
            case 1185:
                this.vitamins.vitamin_K.fill(nutrient.value,nutrient.unitName,120);
                this.vitamins.vitamin_K.calculateRdvPercent();
                break; 
            // Vitamin E
            case 1242:
                this.vitamins.vitamin_E.fill(nutrient.value,nutrient.unitName,15);
                this.vitamins.vitamin_E.calculateRdvPercent();
                break;


            // Calcium
            case 1087:
                this.minerals.calcium.fill(nutrient.value,nutrient.unitName,1300);
                this.minerals.calcium.calculateRdvPercent();
                break;
            // Iron
            case 1089:
                this.minerals.iron.fill(nutrient.value,nutrient.unitName,18);
                this.minerals.iron.calculateRdvPercent();
                break;
            // Magnesium
            case 1090:
                this.minerals.magnesium.fill(nutrient.value,nutrient.unitName,420);
                this.minerals.magnesium.calculateRdvPercent();
                break;
            // Phosphorous
            case 1091:
                this.minerals.phosphorous.fill(nutrient.value,nutrient.unitName,1250);
                this.minerals.phosphorous.calculateRdvPercent();
                break;
            // Sodium
            case 1093:
                this.minerals.sodium.fill(nutrient.value,nutrient.unitName,2300);
                this.minerals.sodium.calculateRdvPercent();
                break;
            // Potassium
            case 1092:
                this.minerals.potassium.fill(nutrient.value,nutrient.unitName,4700);
                this.minerals.potassium.calculateRdvPercent();
                break; 
            // Zinc
            case 1095:
               this.minerals.zinc.fill(nutrient.value,nutrient.unitName,11);
               this.minerals.zinc.calculateRdvPercent();
                break;
            // Selenium
            case 1103:
               this.minerals.selenium.fill(nutrient.value,nutrient.unitName,55);
               this.minerals.selenium.calculateRdvPercent();
                break;    
            // Copper
            case 1098:
                this.minerals.copper.fill(nutrient.value,nutrient.unitName,0.9);
                this.minerals.copper.calculateRdvPercent();
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


            // SFA Total
            case 1258:
                this.fats.fatTotals.saturated_Fat.fill(nutrient.value,nutrient.unitName);
                break;
            
            // SFA 4:0
            case 1259:
                this.fats.sat.SFA_4x0.fill(nutrient.value,nutrient.unitName);
                break;

            // SFA 6:0
            case 1260:
                this.fats.sat.SFA_6x0.fill(nutrient.value,nutrient.unitName);
                break; 

            // SFA 10:0
            case 1262:
                this.fats.sat.SFA_10x0.fill(nutrient.value,nutrient.unitName);
                break;

            // SFA 12:0
            case 1263:
                this.fats.sat.SFA_12x0.fill(nutrient.value,nutrient.unitName);
                break; 

            // SFA 14:0
            case 1264:
                this.fats.sat.SFA_14x0.fill(nutrient.value,nutrient.unitName);
                break;

            // SFA 16:0
            case 1265:
                this.fats.sat.SFA_16x0.fill(nutrient.value,nutrient.unitName);
                break;

            // SFA 18:0
            case 1266:
                this.fats.sat.SFA_18x0.fill(nutrient.value,nutrient.unitName);
                break;

            // SFA 20:0
            case 1267:
                this.fats.sat.SFA_20x0.fill(nutrient.value,nutrient.unitName);
                break;

            // MUFA 18:1
            case 1268:
                this.fats.monoUnsat.MUFA_18x1.fill(nutrient.value,nutrient.unitName);
                break;

            // PUFA 18:2
            case 1269:
                this.fats.polyUnsat.PUFA_18x2.fill(nutrient.value,nutrient.unitName);
                break;

            // PUFA 18:3
            case 1270:
                this.fats.polyUnsat.PUFA_18x3.fill(nutrient.value,nutrient.unitName);
                break;
             
            // PUFA 20:4
            case 1271:
                this.fats.polyUnsat.PUFA_20x4.fill(nutrient.value,nutrient.unitName);
                break;
            
            // PUFA 22:6
            case 1272:
                this.fats.polyUnsat.PUFA_22x6.fill(nutrient.value,nutrient.unitName);
                break;

            // MUFA 16:1
            case 1275:
                this.fats.monoUnsat.MUFA_16x1.fill(nutrient.value,nutrient.unitName);
                break;

            // PUFA 18:4
            case 1276:
                this.fats.polyUnsat.PUFA_18x4.fill(nutrient.value,nutrient.unitName);
                break;
            
            // MUFA 20:1
            case 1277:
                this.fats.monoUnsat.MUFA_20x1.fill(nutrient.value,nutrient.unitName);
                break;

            // PUFA 2:5
            case 1278:
                this.fats.polyUnsat.PUFA_2x5.fill(nutrient.value,nutrient.unitName);
                break; 

            // MUFA 22:1
            case 1279:
                this.fats.monoUnsat.MUFA_22x1.fill(nutrient.value,nutrient.unitName);
                break;

            // PUFA 22:5
            case 1280:
                this.fats.polyUnsat.PUFA_22x5.fill(nutrient.value,nutrient.unitName);
                break;

            // MUFA Total
            case 1292:
                this.fats.fatTotals.mono_unsaturated_Fat.fill(nutrient.value,nutrient.unitName)
                break;

            // PUFA Total
            case 1293:
                this.fats.fatTotals.poly_unsaturated_Fat.fill(nutrient.value,nutrient.unitName);
                break;
            
            
            // MUFA 18:1
            case 1315:
                this.fats.monoUnsat.MUFA_18x1.fill(nutrient.value,nutrient.unitName);
                break;

            case 1333:
                this.fats.monoUnsat.MUFA_15x1.fill(nutrient.value,nutrient.unitName);
                break;

            // Tryptophan
            case 1210:
                this.aminoAcids.tryptophan.fill(nutrient.value,nutrient.unitName);
                break;
            // Threonine
            case 1211:
                this.aminoAcids.threonine.fill(nutrient.value,nutrient.unitName);
                break;
            // Methionine
            case 1215:
                this.aminoAcids.methionine.fill(nutrient.value,nutrient.unitName);
                break;
            // Phenylalanine
            case 1217:
                this.aminoAcids.phenylalanine.fill(nutrient.value,nutrient.unitName);
                break;
            // Tyrosine
            case 1218:
                this.aminoAcids.tyrosine.fill(nutrient.value,nutrient.unitName);
                break;
            // Alanine
            case 1222:
                this.aminoAcids.alanine.fill(nutrient.value,nutrient.unitName);
                break;
            // Glutamic Acid
            case 1224:
                this.aminoAcids.glutamic_acid.fill(nutrient.value,nutrient.unitName);
                break; 
            // Glycine
            case 1225:
                this.aminoAcids.glycine.fill(nutrient.value,nutrient.unitName);
                break;
            // Proline
            case 1226:
                this.aminoAcids.proline.fill(nutrient.value,nutrient.unitName);
                break;    
            // Isoleucine
            case 1212:
                this.aminoAcids.isoleucine.fill(nutrient.value,nutrient.unitName);
                break;
            // Leucine
            case 1213:
                this.aminoAcids.leucine.fill(nutrient.value,nutrient.unitName);
                break; 
            // Lysine
            case 1214:
                this.aminoAcids.lysine.fill(nutrient.value,nutrient.unitName);
                break;
            // Cystine
            case 1216:
                this.aminoAcids.cystine.fill(nutrient.value,nutrient.unitName);
                break; 
            // Valine
            case 1219:
                this.aminoAcids.valine.fill(nutrient.value,nutrient.unitName);
                break;
            // Arginine
            case 1220:
                this.aminoAcids.arginine.fill(nutrient.value,nutrient.unitName);
                break;    
            // Histidine
            case 1221:
                this.aminoAcids.histidine.fill(nutrient.value,nutrient.unitName);
                break;
            // Aspartic Acid
            case 1223:
                this.aminoAcids.aspartic_acid.fill(nutrient.value,nutrient.unitName);
                break; 
            // Serine
            case 1227:
                this.aminoAcids.serine.fill(nutrient.value,nutrient.unitName);
                break;

            // Energy
            case 1008:
                this.energy.fill(nutrient.value,nutrient.unitName,2000);
                this.energy.calculateRdvPercent();
                break;

            // Alternative Energy
            case 2047:
                this.energy.fill(nutrient.value,nutrient.unitName,2000);
                this.energy.calculateRdvPercent();
                break;

            // Alternative Energy
            case 2048:
                this.energy.fill(nutrient.value,nutrient.unitName,2000);
                this.energy.calculateRdvPercent();
                break;
        }


    }

    // clear the nutrient profile
    clear() {

        // setting serving size
        //this.servingSize = serving;

        // total weight of nutrients
        this.totalWeight = 0;

        // major nutrients
        this.major = {
            'protein' : new nutrientElement(),
            'fat' : new nutrientElement(),
            'carb' : new nutrientElement(),
            'water' : new nutrientElement()
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
            'selenium' : new nutrientElement()
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
            'alcohol' : new nutrientElement(),
            'fiber' : new nutrientElement()
        }

        this.energy = new nutrientElement();


        // fats
        this.fats = {
            'sat' : {
                'SFA_4x0' : new nutrientElement(),
                'SFA_6x0' : new nutrientElement(),
                'SFA_10x0' : new nutrientElement(),
                'SFA_12x0' : new nutrientElement(),
                'SFA_14x0' : new nutrientElement(),
                'SFA_16x0' : new nutrientElement(),
                'SFA_18x0' : new nutrientElement(),
                'SFA_20x0' : new nutrientElement()
            },
    
            'monoUnsat' : {
                'MUFA_15x1' : new nutrientElement(),
                'MUFA_16x1' : new nutrientElement(),
                'MUFA_18x1' : new nutrientElement(),
                'MUFA_20x1' : new nutrientElement(),
                'MUFA_22x1' : new nutrientElement()
            },
    
            'polyUnsat' : {
                'PUFA_18x2' : new nutrientElement(),
                'PUFA_18x3' : new nutrientElement(),
                'PUFA_18x4' : new nutrientElement(),
                'PUFA_20x4' : new nutrientElement(),
                'PUFA_22x5' : new nutrientElement(),
                'PUFA_22x6' : new nutrientElement(),
                'PUFA_2x5' : new nutrientElement(),
            },

            'fatTotals' : {
                'saturated_Fat' : new nutrientElement(),
                'mono_unsaturated_Fat' : new nutrientElement(),
                'poly_unsaturated_Fat' : new nutrientElement()
            }
        }

        // aminoAcids
        this.aminoAcids = {
            'tryptophan' : new nutrientElement(),
            'threonine' : new nutrientElement(),
            'methionine' : new nutrientElement(),
            'phenylalanine' : new nutrientElement(),
            'tyrosine' : new nutrientElement(),
            'alanine' : new nutrientElement(),
            'glutamic_acid' : new nutrientElement(),
            'glycine' : new nutrientElement(),
            'proline' : new nutrientElement(),
            'isoleucine' : new nutrientElement(),
            'leucine' : new nutrientElement(),
            'lysine' : new nutrientElement(),
            'valine' : new nutrientElement(),
            'arginine' : new nutrientElement(),
            'aspartic_acid' : new nutrientElement(),
            'serine' : new nutrientElement(),
            'histidine' : new nutrientElement(),
            'cystine' : new nutrientElement()
        }


        // sugars
        this.sugars = {
            'sucrose' : new nutrientElement(),
            'glucose' : new nutrientElement(),
            'maltose' : new nutrientElement(),
            'total' : new nutrientElement()
        }



    }

    // calculate weight of nutrients while avoiding duplicate nutrient entries, i.e. total fat versus individual fats
    calcTotalWeight() {
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
    }

    // convert unit text from capital to lowercase and substitute in micro gram symbol
    formatUnits(data) {
        for(const [nutrientName,nutrient] of Object.entries(data)) {
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

    

}

// overriding class which manages models, cached data, and contacts the FoodCentral API
class AppData {
    constructor() {

        // caching past searches; "full" stores the full response with 50 food entries; "all" stores single food entries
        this.cache = {
            "all" : [],
            "full" : []
        };
        this.nutrients = new nutrientData;
        this.api = new FoodDataConnect;
    }


    // fetch data from Survey branch of API; add 0 entry to cache; load top of cache into nutrient object
    async searchSurvey(userText) {
        await this.api.searchSurvey(userText)
        .then(surveyData => 
            {
                // add 0 entry to cache
                this.cache.full.push(surveyData.response);
                this.cache.all.push(surveyData.response.foods[0]);


                this.nutrients.loadAll(surveyData.response.foods[0].foodNutrients);
                this.nutrients.calcTotalWeight(this.nutrients);
            })
    }

    async searchBranded(userText) {
        await this.api.searchBrand(userText)
        .then(brandData => {
            this.cache.full.push(brandData.response);
            this.cache.all.push(brandData.response.foods[0]);

            this.nutrients.loadAll(brandData.response.foods[0].foodNutrients);
            this.nutrients.calcTotalWeight(this.nutrients);
        })
    }

    async searchAll(userText) {
        await this.api.searchAll(userText)
        .then(allData => {
            
            this.cache.full.push(allData.response);
            this.cache.all.push(allData.response.foods[0]);

            this.nutrients.loadAll(allData.response.foods[0].foodNutrients);
            this.nutrients.calcTotalWeight(this.nutrients);

        })
        
    }

    async searchFoundation(userText) {
        await this.api.searchFoundational(userText)
        .then(foundationData => {

            this.cache.full.push(foundationData.response);
            this.cache.all.push(foundationData.response.foods[0]);

            this.nutrients.loadAll(foundationData.response.foods[0].foodNutrients);
            this.nutrients.calcTotalWeight(this.nutrients);

        })
    }
    
  formatUnits() {
    this.nutrients.formatUnits(this.nutrients.major);
    this.nutrients.formatUnits(this.nutrients.fats.sat);
    this.nutrients.formatUnits(this.nutrients.fats.monoUnsat);
    this.nutrients.formatUnits(this.nutrients.fats.polyUnsat);
    this.nutrients.formatUnits(this.nutrients.vitamins);
    this.nutrients.formatUnits(this.nutrients.minerals);
    this.nutrients.formatUnits(this.nutrients.misc);
    this.nutrients.formatUnits(this.nutrients.aminoAcids);
  }

    clear() {
        this.cache = {
            "all" : [],
            "full" : []
        };
    }
}


class compareData extends AppData {
    constructor() {
        super();
        this.queue = [];
        this.titlesQueue = [];
    }

    // add a cache.all entry to the queue (full food[0] entry)
    addItem(data) {
        this.queue.push(data);
    }

    addTitle(title) {
        this.titlesQueue.push(title);
    }

    addColumn(table) {
        this.column.push(table);
    }

    removeItem(index) {
        this.queue.splice(index,1);
        this.titlesQueue.splice(index,1);
    }
}