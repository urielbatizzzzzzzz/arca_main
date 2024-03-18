import express from "express";
import bodyParser from "body-parser";
import { port } from "./src/config.js"
import {db} from "./src/mysqldb.js"

const app = express();
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) =>{
    db.query("select * from libros;", (error, table)=>{
        if (error){
            console.log(error)
        }else{
            res.render("../public/index.ejs", {table:table})
        }
    })
});

app.get("/add", (req, res) =>{
    res.render("../public/create.ejs",{var:"hola"})
});

app.get("/validate.js", (req, rea) =>{
    res.redirect("..//public/validate.js")
})

app.post("/edit", (req, res) =>{
    res.render("../public/edit.ejs",{data:req})
});

app.post("/delete", (req, res) =>{
    const libros = req.body.name;
    console.log(`delete from libros where libro_recomendado="${libros}"`)
    db.query(`delete from libros where libro_recomendado="${libros}"`,(error, table)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect("/")
            console.log("Sin errores para eliminar")
        }
    })
});

app.post("/savedata", (req,res)=>{
    
    const persona = req.body.persona;
    const edad = req.body.edad;
    const libros_leidos = req.body.franchise;
    const libros = req.body.name;
    const genero = req.body.year;
    db.query(`insert into libros (nombre_persona, edad, libros_leidos, libro_recomendado, genero_recomendado) values("${persona}","${edad}","${libros_leidos}","${libros}","${genero}");`,(error, table)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect("/")
        }
    })
})

app.post("/editdata", (req,res)=>{
    const oldname = req.body.oldname
    const persona = req.body.persona;
    const edad = req.body.edad;
    const libros_leidos = req.body.franchise;
    const libros = req.body.name;
    const genero = req.body.year;
    db.query(`update libros set nombre_persona="${persona}", edad=${edad}, libros_leidos=${libros_leidos}, libro_recomendado="${libros}", genero_recomendado="${genero}" where libro_recomendado="${libros}";`,(error, table)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect("/")
        }
    })
})

app.post("/deletedata", (req,res)=>{
    const libros = req.body.name;
    db.query(`insert into characters values("${libros}","${franchise}","${year}");`,(error, table)=>{
        if(error){
            console.log(error)
        }else{
            res.redirect("/")
        }
    })
})

app.listen(port, ()=>{
    console.log(`Escuchando desde el puerto: ${port}`)
})
