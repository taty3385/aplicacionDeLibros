const net = require("net");
const bookController = require("./controllers/booksController");
const authorController = require("./controllers/authorController");
const publisherController = require("./controllers/publisherController");

const port = 8080;
const server = net.createServer((socket) => {
  console.log("cliente conectado");

  socket.on("data", (data) => {
    try {
      const datosParseados = JSON.parse(data.toString("utf-8").trim());
      let response;

      if (datosParseados.command === "EXIT") {
        console.log("Cliente ha cerrado la conexión.");
        socket.end();
          return// 🔥 Cierra la conexión desde el servidor también
       
      }

      switch (datosParseados.command) {
        case "GET BOOK":
          response = bookController.getBooks();
          break;
        case "GET AUTHOR":
          response = authorController.getAuthor();
          break;
        case "GET PUBLISHER":
          response = publisherController.getPublisher();
          break;
        case "ADD BOOK":
          response = bookController.addBooks(datosParseados.newBook);
          break;
        case "ADD AUTHOR":
          response = authorController.addAuthors(datosParseados.newAuthor);
          break;
        case "ADD PUBLISHER":
          response = publisherController.addPublisher(
            datosParseados.newPublisher
          );
          break;
        case "DELETE BOOK":
          response = bookController.deleteBooks(datosParseados.id);
          break;
        case "DELETE AUTHOR":
          response = authorController.delteAuthor(datosParseados.idAutor);
          break;
        case "DELETE PUBLISHER":
          response = publisherController.deletePublisher(
            datosParseados.idPublisher
          );
          break;
        case "SEARCH BOOK":
          response = bookController.searchBook(datosParseados.title);
          break;
        case "SEARCH AUTHOR":
          response = authorController.searchAutor(datosParseados.titleAutor);
          break;
        case "SEARCH PUBLISHER":
          response = publisherController.searchPublisher(
            datosParseados.titlePublisher
          );
          break;
        case "EDITH BOOK":
          response = bookController.editBoock(
            datosParseados.id,
            datosParseados.newDate
          );

          break;
        case "EDITH AUTHOR":
          response = authorController.editAuthor(
            datosParseados.id,
            datosParseados.newAuthor
          );
          break;
        case "EDITH PUBLISHER":
          response = publisherController.edithPublisher(
            datosParseados.id,
            datosParseados.newPublisher
          );
          break;
           default:
          response = "Comando no válido";
          break;
      }

      socket.write(response);
    } catch (error) {
      socket.write(JSON.stringify({ status: "error", message: error.message }));
    }
  });

  socket.on("error", (err) => {
    console.log("error: ", err.message);
  });

  socket.on("close", () => {
    console.log("el servidor se ha cerrado");
  });
});

server.listen(port, () => {
  console.log("Servidor escuchando en el puerto ", port);
});
