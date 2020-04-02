const uuidv4 = require('uuid/v4')

let express = require('express');
let app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded())

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
app.get('/cityAjout',(req,res) =>{
    


        const pug = require("pug");

        const compiledFunction = pug.compileFile('templateAjout.pug');

        

        const generatedTemplate = compiledFunction({
        });

        res.status(200).send(generatedTemplate);

  

});

// app.get('/AddVille',(req,res) =>{
    

// console.log(req.query.ville)

//     res.status(200).send("ok" + req);
//     res.send("/city/")



// });


app.post('/city',(req,res) =>{

    City.find(function(err, cities){
        if(err){
            res.status(500).send(`Get error on BD`);
            return console.error(err);
        } 
        let name = req.body.name;
            let exist = false;
                cities.forEach(function (elt){
                    if(elt.name === name){
                        //existe
                        exist = true;
                        return;
                    }
                })

                if(exist){
                    res.status(500).send("Name of city already exist");
                }else{
                    const newCity = new City({"name":name});
                    
                    newCity.save(function(err){
                        if(err){
                            res.status(500).send(`PUT error on BD`);
                            return console.error(err);
                        }
                        City.find(function(err, cities){
                            if(err){
                                res.status(500).send(`Problem when return value, post ok`);
                                return console.error(err)
                            }
                            res.status(200).send(cities);
                        })
                    })


                }

    });
});
    

app.put('/city/:id',(req, res)=>{

    City.find(function(err, cities){
        if(err){
            res.status(500).send(`Get error on BD`);
            return console.error(err);
        } 

        City.findByIdAndUpdate({_id: req.params.id},
            {
                name:req.body.name
            },
        (err, city)=>{
            if(!city){
            //ne pas faire de test en ajoutant des char aleatoire..
                if(err != null && err.name === 'CastError'){
                    res.status(400).send(`Id not correct : Argument passed in must be a single String of 12 bytes or a string of 24 hex characters`);
                    return ;
                }
                
                    res.status(404).send(`Id not found`);
                    return;
                
            }else{
                City.findById({_id: req.params.id},
                    (err,city)=>{
                        if(err){
                            res.status(500).send(`Put work, problem with show`);
                            return console.error(err);
                        }
                        res.status(200).send(city);
                    }
                    )
            }

            

            
        });
    
    });

});


app.delete('/city/:id', function (req, res) {

    City.find(function(err, cities){
        if(err){
            res.status(500).send(`Get error on BD`);
            return console.error(err);
        } 

        City.findByIdAndDelete({_id: req.params.id},
        (err, city)=>{
            if(!city){
            //ne pas faire de test en ajoutant des char aleatoire..
                if(err != null && err.name === 'CastError'){
                    res.status(400).send(`Id not correct : Argument passed in must be a single String of 12 bytes or a string of 24 hex characters`);
                    return ;
                }
                
                    res.status(404).send(`Id not found`);
                    return;
                
            }else{
                res.status(200).send('DELETE ok')
            }

            

            
        });
    
    });

});


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


app.listen(port, () => console.log(`Server running at port ${port}`));