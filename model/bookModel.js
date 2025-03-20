const fs = require("fs");
const path = require("path");

const autor = path.join(__dirname, "../data/authors.json");  //con path join  y dirname se obtiene la ruta absoluta del archivo
const books = path.join(__dirname, "../data/books.json");
const publisher = path.join(__dirname, "../data/publishers.json");

const read = (file) => {   // fincion para leer los archivos x autor / book / publisher
  if (file === "autor") {
    const data = fs.readFileSync(autor, "utf-8"); // se lee el archivo y se guarda en data
    return JSON.parse(data); // se convierte el archivo a un objeto
  } else if (file === "book") {
    const data = fs.readFileSync(books, "utf-8");
    return JSON.parse(data);
  } else if (file === "publisher") {
    const data = fs.readFileSync(publisher, "utf-8");
 
    
    return JSON.parse(data);
  }
};



const write = (data, path) => { // funcion para escribir en los archivos x autor / book / publisher
  if (path === "autor") {
    const dataJson = JSON.stringify(data, null, 2); // se convierte el objeto a un archivo json
    fs.writeFileSync(autor, dataJson, "utf-8"); // utf-8 es el formato de codificacion que permite que leamos el archivo
  } else if (path === "book") {
    const dataJson = JSON.stringify(data, null, 2);
    fs.writeFileSync(books, dataJson, "utf-8");
  } else if (path === "publisher") {
    const dataJson = JSON.stringify(data, null, 2);
    fs.writeFileSync(publisher, dataJson, "utf-8");
  }
};


module.exports = {// se exportan las funciones para que puedan ser usadas en otros archivos
  read,
  write,
};
