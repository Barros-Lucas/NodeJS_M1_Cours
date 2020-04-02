const uuidv4 = require('uuid/v4')

let express = require('express');
let app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.json());


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/TP_Web",{useNewUrlParser: true});
const db = mongoose.connection;
const citySchema = new mongoose.Schema({
    name : String
});

const tableName = "cities";

const City = mongoose.model("cities", citySchema);

db.on("error",console.error.bind(console, "connection error:"));
db.once("open", function(){
    //connetion ok 
});

app.get('/',(req,res) =>{
    res.send("index de la page");
});

app.get('/cities',(req,res) =>{
    
    City.find(function(err, cities){
        if(err){
            res.status(500).send(`Get error on BD`);
            return console.error(err);
        } 

        const pug = require("pug");

        const compiledFunction = pug.compileFile('templateMdb.pug');

        

        const generatedTemplate = compiledFunction({
            tableName,
            dataP: cities
        });

        res.status(200).send(generatedTemplate);

    })

});


app.post('/city',(req,res) =>{

    City.find(function(err, cities){
        if(err){
            res.status(500).send(`Get error on BD`);
            return console.error(err);
        } 
            let exist = false;
                cities.forEach(function (elt){
                    if(elt.name === req.body.name){
                        //existe
                        exist = true;
                        return;
                    }
                })

                if(exist){
                    res.status(500).send("Name of city already exist");
                }else{
                    const newCity = new City({"name": req.body.name});
                    
                    newCity.save(function(err){
                        if(err){
                            res.status(500).send(`PUT error on BD`);
                            return console.error(err);
                        }
                        City.find(function(err, cities){
                            if(err){
                                res.status(500).send(`Problem when return value, put ok`);
                                return console.error(err)
                            }
                            res.status(200).send(cities);
                        })
                    })


                }

    });
});
    

// app.put('/city/:id', function (req, res) {

//     const fileNameCities = 'cities.json';
//     fs.access(fileNameCities,'utf8',(err,data)=>{
        
//         if(err){

//             const city= {
//                 "id":req.body.id,
//                 "name": req.body.name
//             };
//             const cityContent = JSON.stringify({"cities":[city]});

           
//             //creation du fichier
//             fs.writeFile(fileNameCities, cityContent, function (err) {
//                 if (err) res.status(500).send("Error write file");
//                 res.status(200).send(cityContent)
//                 });  
            
//         }else{
//             //check all if id exist, if exist -> update row name with body.name
//             fs.readFile(fileNameCities,'utf8',(err,data)=>{
//                 if(err){
//                     res.status(500).send(`Error open file`);
//                     return
//                 }
         
//                 let city_name=req.body.name;
//                 //Note : on pourrait utiliser l'id en parametre mais comme la spec indique que l'id est présent dans le body ... copier coller plus simple
//                 let city_id=req.body.id;
//                 const cities = JSON.parse(data);

//                 let exist = false;
//                 cities.cities.forEach(function (elt){
//                     if(elt.id === city_id){
//                         //existe -> change name
//                         elt.name = city_name
//                         exist = true;
//                         return;
//                     }
//                 })

//                 if(exist){
//                     fs.writeFile(fileNameCities, JSON.stringify(cities), function (err) {
//                         if (err) res.status(500).send("Error write file");
//                         res.status(200).send(cities)
//                       });  
//                 }else{

//                     res.status(500).send("Id not found maybe not exist");
//                     return;
//                 }
//             });
//         }
//     });

// });

// app.delete('/city/:id', function (req, res) {

//     const fileNameCities = 'cities.json';
//     fs.readFile(fileNameCities,'utf8',(err,data)=>{
//         if(err){
//             if(err.code == 'ENOENT'){
//                 res.status(404).send(`${fileNameCities} Not found`);
//                 return
//             }
//             console.error(err)
//             return
//         }

//         //search id on file
//         let city_id=req.params.id;
//         const cities = JSON.parse(data);

//         let exist = false;
//         cities.cities.forEach(function (item, index, object){
//             if(item.id === city_id){
//                 //existe
//                 exist = true;
//                 //remove from file
//                 delete cities.cities[index];
//                 return;
//             }

//             if(exist){
//                 //eliminate all the null values from the data
//                 cities.cities = cities.cities.filter(function(x) { return x !== null }); 
//                 fs.writeFile(fileNameCities, JSON.stringify(cities), function (err) {
//                     if (err) res.status(500).send("Error write file");
//                     res.status(200).send(cities)
//                   });  
//             }else{
//                 res.status(500).send("Id not found maybe not exist");
//                 return;
//             }

//         })


//     });

// });

// const path = require('path');
// app.get('/citiesMap',(req,res) =>{
//     const fileNameCities = 'JQueryMap/France/front/testMap.html'
//     fs.readFile(fileNameCities,'utf8',(err,data)=>{
//         if(err){
//             if(err.code == 'ENOENT'){
//                 res.status(404).send(`${fileNameCities} Not found`);
//                 return
//             }
//             console.error(err)
//             return
//         }
//             res.sendFile(path.join(__dirname+'/JQueryMap/France/front/testMap.html'));
    
           


//     });
// });

app.listen(port, () => console.log(`Server running at port ${port}`));