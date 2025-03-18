const fs = require("fs");
const path = require("path");

const autor = path.join(__dirname, "../data/authors.json");
const books = path.join(__dirname, "../data/books.json");
const publisher = path.join(__dirname, "../data/publishers.json");

const read = (file) => {
  if (file === "autor") {
    const data = fs.readFileSync(autor, "utf-8");
    return JSON.parse(data);
  } else if (file === "book") {
    const data = fs.readFileSync(books, "utf-8");
    return JSON.parse(data);
  } else if (file === "publisher") {
    const data = fs.readFileSync(publisher, "utf-8");
 
    
    return JSON.parse(data);
  }
};



const write = (data, path) => {
  if (path === "autor") {
    const dataJson = JSON.stringify(data, null, 2);
    fs.writeFileSync(autor, dataJson, "utf-8");
  } else if (path === "book") {
    const dataJson = JSON.stringify(data, null, 2);
    fs.writeFileSync(books, dataJson, "utf-8");
  } else if (path === "publisher") {
    const dataJson = JSON.stringify(data, null, 2);
    fs.writeFileSync(publisher, dataJson, "utf-8");
  }
};


module.exports = {
  read,
  write,
};
