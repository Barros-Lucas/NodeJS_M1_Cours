let fs = require('fs');
const uuidv4 = require('uuid/v4')

let express = require('express');
let app = express();
const port = 3000;
app.use(express.static('public'));
app.use(express.json());

let fileName = process.argv[2];
app.get('/dataCSV',(req,res) =>{
if(fileName!=undefined){
    fs.readFile(fileName,'utf8',(err,data)=>{
        if(err){
            console.error(err)
            return
        }
            const http = require("http");
            const pug = require("pug");

            const compiledFunction = pug.compileFile('template.pug');


            var resultSplit = data.split("\n");
            const dataUserVille = {};
            var users = [];
            resultSplit.forEach(function (elt){
                if(elt!=""){
                    var UserVilleSplit = {};
                    var resultSplitUsers = elt.split(";")
                    UserVilleSplit.id = resultSplitUsers[0];
                    UserVilleSplit.ville = resultSplitUsers[1];
                    users.push(UserVilleSplit);
                }

            })
            dataUserVille.users = users;


                const generatedTemplate = compiledFunction({
                    fileName, fileName,
                    dataP: dataUserVille
                });
        
                res.send(generatedTemplate);

    })
}else{
    console.log("Missing argument| Exemple : node ./script.js data.csv")
}

} );


app.get('/',(req,res) =>{
    res.send("index de la page");
});

app.get('/cities',(req,res) =>{
    const fileNameCities = 'cities.json'
    fs.readFile(fileNameCities,'utf8',(err,data)=>{
        if(err){
            if(err.code == 'ENOENT'){
                res.status(404).send(`${fileNameCities} Not found`);
                return
            }
            console.error(err)
            return
        }
        const pug = require("pug");

        const compiledFunction = pug.compileFile('templatejson.pug');

        const obj = JSON.parse(data);
        obj.users = obj.cities;

            const generatedTemplate = compiledFunction({
                fileNameCities,
                dataP: obj
            });
    
            res.send(generatedTemplate+data);


    });
});


app.post('/cities',(req,res) =>{

    const fileNameCities = 'cities.json';
    fs.access(fileNameCities,'utf8',(err,data)=>{
        let newfile = false;
        if(err){

            const city= {
                "id":uuidv4(),
                "name": req.body.name
            };
            const cityContent = JSON.stringify({"cities":[city]});

           
            //creation du fichier
            fs.writeFile(fileNameCities, cityContent, function (err) {
                if (err) res.status(500).send("Error write file");
                res.status(200).send(cityContent)
                });  
            
        }else{
            //check all if name exist
            fs.readFile(fileNameCities,'utf8',(err,data)=>{
                if(err){
                    res.status(500).send(`Error open file`);
                    return
                }
         
                let city_name=req.body.name;
                const cities = JSON.parse(data);

                let exist = false;
                cities.cities.forEach(function (elt){
                    if(elt.name === city_name){
                        //existe
                        exist = true;
                        return;
                    }
                })

                if(exist){
                    res.status(500).send("Name of city already exist");
                }else{
                    let newCity = {"id" : uuidv4(), "name": city_name}
                    cities.cities.push(newCity)

                    fs.writeFile(fileNameCities, JSON.stringify(cities), function (err) {
                        if (err) res.status(500).send("Error write file");
                        res.status(200).send(cities)
                      });  
                }
            });
        }
    });
});


app.put('/city/:id', function (req, res) {

    const fileNameCities = 'cities.json';
    fs.access(fileNameCities,'utf8',(err,data)=>{
        
        if(err){

            const city= {
                "id":req.body.id,
                "name": req.body.name
            };
            const cityContent = JSON.stringify({"cities":[city]});

           
            //creation du fichier
            fs.writeFile(fileNameCities, cityContent, function (err) {
                if (err) res.status(500).send("Error write file");
                res.status(200).send(cityContent)
                });  
            
        }else{
            //check all if id exist, if exist -> update row name with body.name
            fs.readFile(fileNameCities,'utf8',(err,data)=>{
                if(err){
                    res.status(500).send(`Error open file`);
                    return
                }
         
                let city_name=req.body.name;
                let city_id=req.body.id;
                const cities = JSON.parse(data);

                let exist = false;
                cities.cities.forEach(function (elt){
                    if(elt.id === city_id){
                        //existe -> change name
                        elt.name = city_name
                        exist = true;
                        return;
                    }
                })

                if(exist){
                    //nothing else for the moment
                    // let newCity = {"id" : city_id, "name": city_name}
                    // cities.cities.push(newCity)

                    fs.writeFile(fileNameCities, JSON.stringify(cities), function (err) {
                        if (err) res.status(500).send("Error write file");
                        res.status(200).send(cities)
                      });  
                }else{

                    res.status(500).send("Id not found maybe not exist");
                    return;
                }
            });
        }
    });

});



app.listen(port, () => console.log(`Server running at port ${port}`));