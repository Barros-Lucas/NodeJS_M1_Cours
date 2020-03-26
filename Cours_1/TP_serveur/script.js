let fs = require('fs');
let fileName = process.argv[2];
if(fileName!=undefined){
    fs.readFile(fileName,'utf8',(err,data)=>{
        if(err){
            console.error(err)
            return
        }
        console.log(data)
    })
}else{
    console.log("Missing argument| Exemple : node ./script.js data.csv")
}
