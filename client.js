const net = require("net");
const { v4: uuidv4 } = require("uuid");
const readlineSync = require("readline-sync");

const client = net.createConnection({ port: 8080, host: "localhost" });
console.log("Conectado al servidor");
mostrarMenu();

function mostrarMenu() { // funcion para mostrar el menu
  console.log(" ==============Menu================");
  
  console.log(`   
  1. Ver libros  
  2. Ver autores  
  3. Ver editoriales  
  4. Añadir libro  
  5. Añadir autor  
  6. Añadir editorial  
  7. Eliminar libro  
  8. Eliminar autor  
  9. Eliminar editorial  
  10. Buscar libro  
  11. Buscar autor  
  12. Buscar editorial  
  13. Editar libros  
  14. Editar autor  
  15. Editar editorial  
  16. Salir`);

  const opcion = readlineSync.question("Seleccione una opcion: "); // se le pide al usuario que seleccione una opcion

  switch (opcion) { // se crea un switch para las opciones
    case "1": // si la opcion es 1
      client.write(JSON.stringify({ command: "GET BOOK" })); // se llama al comando GET BOOK y se envia al servidor en formato JSON
      break;
    case "2":
      client.write(JSON.stringify({ command: "GET AUTHOR" })); // si la opcion es 2 se llama al comando GET AUTHOR y se envia al servidor en formato JSON
      break;
    case "3":
      client.write(JSON.stringify({ command: "GET PUBLISHER" })); // si la opcion es 3 se llama al comando GET PUBLISHER y se envia al servidor en formato JSON
      break;
    case "4":
      const newBook = prompAddBoock(); // si la opcion es 4 se llama a la funcion prompAddBoock
      client.write(JSON.stringify({ command: "ADD BOOK", newBook })); // se llama al comando ADD BOOK y newBook y se envia al servidor en formato JSON
      break;
    case "5":
      const newAuthor = prompAddAuthor(); // si la opcion es 5 se llama a la funcion prompAddAuthor
      client.write(JSON.stringify({ command: "ADD AUTHOR", newAuthor })); // se llama al comando ADD AUTHOR y newAuthor y se envia al servidor en formato JSON
      // se le pasa el titulo de la editorial que se quiere buscar
      break;
    case "6":
      const newPublisher = prompAddPublisher(); // si la opcion es 6 se llama a la funcion prompAddPublisher
      client.write(JSON.stringify({ command: "ADD PUBLISHER", newPublisher })); // se llama al comando ADD PUBLISHER y newPublisher y se envia al servidor en formato JSON
      break;
    case "7":
      const id = promptDeleteBook(); // si la opcion es 7 se llama a la funcion promptDeleteBook
      client.write(JSON.stringify({ command: "DELETE BOOK", id })); // se llama al comando DELETE BOOK y id y se envia al servidor en formato JSON
// se le pasa el id del autor que se quiere eliminar
      break;
    case "8":
      const idAutor = promptDeletAutor(); // si la opcion es 8 se llama a la funcion promptDeletAutor se le pasa el id de la editorial que se quiere eliminar
      client.write(JSON.stringify({ command: "DELETE AUTHOR", idAutor })); // se llama al comando DELETE AUTHOR y idAutor y se envia al servidor en formato JSON
      break;
    case "9":
      const idPublisher = promptDeletePublisher(); // si la opcion es 9 se llama a la funcion promptDeletePublisher guarda el id de la editorial que se quiere eliminar
      client.write(
        JSON.stringify({ command: "DELETE PUBLISHER", idPublisher }) // se llama al comando DELETE PUBLISHER y idPublisher y se envia al servidor en formato JSON
      );
      break;
    case "10":
      const title = readlineSync.question( // GUARDA EL TITULO DEL LIBRO QUE SE QUIERE BUSCAR
        "Ingrese el titulo del libro a buscar: "
      );
      client.write(JSON.stringify({ command: "SEARCH BOOK", title })); // se llama al comando SEARCH BOOK y title y se envia al servidor en formato JSON
      break;
    case "11":
      const titleAutor = readlineSync.question( // GUARDA EL NOMBRE DEL AUTOR QUE SE QUIERE BUSCAR
        "Ingrese el nombre del autor a buscar: "
      );
      client.write(JSON.stringify({ command: "SEARCH AUTHOR", titleAutor })); // se llama al comando SEARCH AUTHOR y titleAutor y se envia al servidor en formato JSON
      break;
    case "12":
      const titlePublisher = readlineSync.question(   // GUARDA EL NOMBRE DE LA EDITORIAL QUE SE QUIERE BUSCAR
        "Ingrese el titulo de la editorial a buscar: "
      );
      client.write(
        JSON.stringify({ command: "SEARCH PUBLISHER", titlePublisher }) // se llama al comando SEARCH PUBLISHER y titlePublisher y se envia al servidor en formato JSON
      );
      break;
    case "13":
      const idBook = readlineSync
        .question("ingrese el id para editar su libro :") // GUARDA EL ID DEL LIBRO QUE SE QUIERE EDITAR
        .trim();
      const newDate = editBook(); // GUARDA LOS NUEVOS DATOS DEL LIBRO
      client.write(
        JSON.stringify({ command: "EDITH BOOK", id: idBook, newDate }) // se llama al comando EDITH BOOK y se le pasa el id del libro y los nuevos datos del libro y se envia al servidor en formato JSON
      );
      break;
    case "14":
      const idAuthor = readlineSync
        .question("ingrese el id para editar su autor :") // GUARDA EL ID DEL AUTOR QUE SE QUIERE EDITAR
        .trim();
      client.write(
        JSON.stringify({  // se llama al comando EDITH AUTHOR y se le pasa el id del autor y los nuevos datos del autor y se envia al servidor en formato JSON
          command: "EDITH AUTHOR",
          id: idAuthor,
          newAuthor: editAuthor(),
        })
      );
      break;
    case "15":
      const publisherId = readlineSync
        .question("ingrese el id para editar su editorial :") // GUARDA EL ID DE LA EDITORIAL QUE SE QUIERE EDITAR
        .trim();
      client.write(
        JSON.stringify({ // se llama al comando EDITH PUBLISHER y se le pasa el id de la editorial y los nuevos datos de la editorial y se envia al servidor en formato JSON
          command: "EDITH PUBLISHER",
          id: publisherId,
          newPublisher: editPublisher(),
        })
      );
      break;
    case "16":
      console.log("Cerrando conexión..."); // si la opcion es 16 se cierra la conexion
      client.write(JSON.stringify({ command: "EXIT" })); // se llama al comando EXIT y se envia al servidor en formato JSON
      setTimeout(() => { // se espera 500 milisegundos
        client.end(); // se cierra la conexion
      }, 500); // se espera 500 milisegundos
      return;
    default:
      console.log("⚠️ Opción no válida. Por favor, intenta de nuevo. ❌"); // si la opcion no es valida se imprime un mensaje de error

      mostrarMenu(); //llama a la funcion mostrarMenu para mostrar el menu de nuevo
      break;
  }
}

client.on("data", (data) => { // se escucha el evento data
  console.log(" ---------------Respuesta del servidor-----------------");

  const datos = data.toString(); // se convierte los datos a string
  console.log(datos);
  mostrarMenu(); // se llama a la funcion mostrarMenu Cada vez que se recibe una respuesta del servidor
});

client.on("close", () => { // se escucha el evento close
  console.log("Conexión cerrada"); // se imprime un mensaje de que la conexion se cerro
});

client.on("error", (err) => { // se escucha el evento error
  console.log("Error: ", err.message);
});

function prompAddBoock() { // funcion para agregar un libro
  const id = uuidv4();
  const name = readlineSync.question("Ingrese el titulo del libro: ");
  const country = readlineSync.question("Ingrese el pais del libro: ");
  const foundedYear = readlineSync.question("Ingrese el ańo del libro: ");
  const newBook = { id, name, country, foundedYear };
  return newBook;
}

const prompAddPublisher = () => { // funcion para agregar una editorial
  const id = uuidv4();
  const name = readlineSync.question("Ingrese el nombre de la editorial: ");
  const country = readlineSync.question("Ingrese el pais de la editorial: ");
  const foundedYear = readlineSync.question("Ingrese el anio de la editorial: ");
  const newPublisher = { id, name, country, foundedYear };
  return newPublisher;
};

const prompAddAuthor = () => { // funcion para agregar un autor
  const id = uuidv4();
  const name = readlineSync.question("Ingrese el nombre del autor: ");
  const nationality = readlineSync.question(
    "Ingrese la nacionalidad del autor: "
  );
  const birthYear = readlineSync.question(
    "Ingrese el ańo de nacimiento del autor: "
  );
  const newAuthor = { id, name, nationality, birthYear };
  return newAuthor;
};

function promptDeleteBook() { // funcion para eliminar un libro
  const id = readlineSync.question("Ingrese el id del libro a eliminar: ");
  return id;
}

function promptDeletAutor() { // funcion para eliminar un autor
  const id = readlineSync.question("Ingrese el id del autor a eliminar: ");
  return id;
}

function promptDeletePublisher() { // funcion para eliminar una editorial
  const id = readlineSync.question(
    "Ingrese el id de la editorial a eliminar: "
  );
  return id;
}

function editBook() { // funcion para editar un libro
  const name = readlineSync.question("ingrese el nuevo nombre : ");
  const country = readlineSync.question("ingrese la nueva ciudad : ");
  const foundedYear = readlineSync.question(
    "ingrese el nuevo anio del libro : "
  );
  return { name, country, foundedYear }; // se retorna un objeto con los nuevos datos del libro
}

function editAuthor() { // funcion para editar un autor
  const name = readlineSync.question("ingrese el nuevo nombre del autor : ");
  const nationality = readlineSync.question(
    "ingrese la nueva nacionalidad del autor : "
  );
  const birthYear = readlineSync.question(
    "ingrese el nuevo anio de nacimiento del autor : "
  );
  return { name, nationality, birthYear }; // se retorna un objeto con los nuevos datos del autor
}

function editPublisher() { // funcion para editar una editorial
  const name = readlineSync.question(
    "ingrese el nuevo nombre de la editorial : "
  );
  const country = readlineSync.question(
    "ingrese el nuevo pais de la editorial : "
  );
  const foundedYear = readlineSync.question(
    "ingrese el nuevo anio de la editorial : "
  );
  return { name, country, foundedYear }; // se retorna un objeto con los nuevos datos de la editorial
}
