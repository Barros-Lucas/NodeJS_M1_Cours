let fs = require('fs');
let fileName = process.argv[2];
if(fileName!=undefined){
    fs.readFile(fileName,'utf8',(err,data)=>{
        if(err){
            console.error(err)
            return
        }
            const http = require("http");
            const pug = require("pug");

            const compiledFunction = pug.compileFile('template.pug');
            const port = 3000;

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

            const server = http.createServer((req, res) =>{

                const generatedTemplate = compiledFunction({
                    fileName, fileName,
                    dataP: dataUserVille
                });

                res.statusCode = 200;
                res.setHeader("Content-Type", "text/html");
                res.end(generatedTemplate);
            });

            server.listen(port, () =>{
                console.log(`Server running at port ${port}`);
            })
    })
}else{
    console.log("Missing argument| Exemple : node ./script.js data.csv")
}