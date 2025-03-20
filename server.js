const net = require("net");
const bookController = require("./controllers/booksController");
const authorController = require("./controllers/authorController");
const publisherController = require("./controllers/publisherController");

const port = 8080; // puerto en el que se va a escuchar
const server = net.createServer((socket) => { // se crea el servidor
  console.log("cliente conectado");

  socket.on("data", (data) => { // se escucha el evento data
    try {
      const datosParseados = JSON.parse(data.toString().trim());  // se parsea los datos en  que llegan del cliente
      let response; // se crea una variable para la respuesta

      if (datosParseados.command === "EXIT") { // si el comando es EXIT
        console.log("Cliente ha cerrado la conexión.");
        socket.end(); // se cierra la conexión
          return//  Cierra la conexión desde el servidor también
       
      }

      switch (datosParseados.command) { // se crea un switch para los comandos
        case "GET BOOK": // si el comando es GET BOOK
          response = bookController.getBooks(); // se llama a la funcion getBooks del controlador de libros
          break; //  hace un break para salir del switch
        case "GET AUTHOR": // si el comando es GET AUTHOR
          response = authorController.getAuthor(); // se llama a la funcion getAuthor del controlador de autores
          break;
        case "GET PUBLISHER": // si el comando es GET PUBLISHER
          response = publisherController.getPublisher(); // se llama a la funcion getPublisher del controlador de editoriales
          break;
        case "ADD BOOK": // si el comando es ADD BOOK
          response = bookController.addBooks(datosParseados.newBook); // se llama a la funcion addBooks del controlador de libros
          break;
        case "ADD AUTHOR": // si el comando es ADD AUTHOR
          response = authorController.addAuthors(datosParseados.newAuthor); // se llama a la funcion addAuthors del controlador de autores
          break;
        case "ADD PUBLISHER": // si el comando es ADD PUBLISHER
          response = publisherController.addPublisher( // se llama a la funcion addPublisher del controlador de editoriales
            datosParseados.newPublisher // se le pasa el nuevo autor
          );
          break;
        case "DELETE BOOK": // si el comando es DELETE BOOK
          response = bookController.deleteBooks(datosParseados.id);// se llama a la funcion deleteBooks del controlador de libros Y se le pasa el id del libro que se quiere eliminar
          break;
        case "DELETE AUTHOR":
          response = authorController.delteAuthor(datosParseados.idAutor); // se llama a la funcion delteAuthor del controlador de autores Y se le pasa el id del autor que se quiere eliminar
          break;
        case "DELETE PUBLISHER":
          response = publisherController.deletePublisher(
            datosParseados.idPublisher
          );
          break;
        case "SEARCH BOOK":
          response = bookController.searchBook(datosParseados.title); // se llama a la funcion searchBook del controlador de libros Y se le pasa el titulo del libro que se quiere buscar
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
          response = bookController.editBoock( // se llama a la funcion editBoock del controlador de libros
            datosParseados.id, // se le pasa el id del libro que se quiere editar
            datosParseados.newDate // se le pasa los nuevos datos del libro
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

      socket.write(response); // se envia la respuesta al cliente
    } catch (error) {
      socket.write(JSON.stringify({ status: "error", message: error.message }));// se envia un mensaje de error al cliente
    }
  });

  socket.on("error", (err) => { // se escucha el evento error
    console.log("error: ", err.message); // se imprime el mensaje de error
  });

  socket.on("close", () => { // se escucha el evento close
    console.log("el servidor se ha cerrado"); // se imprime un mensaje
  });
});

server.listen(port, () => { // se escucha el puerto 8080
  console.log("Servidor escuchando en el puerto ", port); // se imprime un mensaje
});
