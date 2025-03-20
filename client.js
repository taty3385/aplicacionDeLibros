const net = require("net");
const { v4: uuidv4 } = require("uuid");
const readlineSync = require("readline-sync");

const client = net.createConnection({ port: 8080, host: "localhost" });
console.log("Conectado al servidor");
mostrarMenu();

function mostrarMenu() {
  console.log(`1. Ver libros  
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

  const opcion = readlineSync.question("Seleccione una opcion: ");

  switch (opcion) {
    case "1":
      client.write(JSON.stringify({ command: "GET BOOK" }));
      break;
    case "2":
      client.write(JSON.stringify({ command: "GET AUTHOR" }));
      break;
    case "3":
      client.write(JSON.stringify({ command: "GET PUBLISHER" }));
      break;
    case "4":
      const newBook = prompAddBoock();
      client.write(JSON.stringify({ command: "ADD BOOK", newBook }));
      break;
    case "5":
      const newAuthor = prompAddAuthor();
      client.write(JSON.stringify({ command: "ADD AUTHOR", newAuthor }));
      break;
    case "6":
      const newPublisher = prompAddPublisher();
      client.write(JSON.stringify({ command: "ADD PUBLISHER", newPublisher }));
      break;
    case "7":
      const id = promptDeleteBook();
      client.write(JSON.stringify({ command: "DELETE BOOK", id }));
      break;
    case "8":
      const idAutor = promptDeletAutor();
      client.write(JSON.stringify({ command: "DELETE AUTHOR", idAutor }));
      break;
    case "9":
      const idPublisher = promptDeletePublisher();
      client.write(
        JSON.stringify({ command: "DELETE PUBLISHER", idPublisher })
      );
      break;
    case "10":
      const title = readlineSync.question(
        "Ingrese el titulo del libro a buscar: "
      );
      client.write(JSON.stringify({ command: "SEARCH BOOK", title }));
      break;
    case "11":
      const titleAutor = readlineSync.question(
        "Ingrese el nombre del autor a buscar: "
      );
      client.write(JSON.stringify({ command: "SEARCH AUTHOR", titleAutor }));
      break;
    case "12":
      const titlePublisher = readlineSync.question(
        "Ingrese el titulo de la editorial a buscar: "
      );
      client.write(
        JSON.stringify({ command: "SEARCH PUBLISHER", titlePublisher })
      );
      break;
    case "13":
      const idBook = readlineSync
        .question("ingrese el id para editar su libro :")
        .trim();
      const newDate = editBook();
      client.write(
        JSON.stringify({ command: "EDITH BOOK", id: idBook, newDate })
      );
      break;
    case "14":
      const idAuthor = readlineSync
        .question("ingrese el id para editar su autor :")
        .trim();
      client.write(
        JSON.stringify({
          command: "EDITH AUTHOR",
          id: idAuthor,
          newAuthor: editAuthor(),
        })
      );
      break;
    case "15":
      const publisherId = readlineSync
        .question("ingrese el id para editar su editorial :")
        .trim();
      client.write(
        JSON.stringify({
          command: "EDITH PUBLISHER",
          id: publisherId,
          newPublisher: editPublisher(),
        })
      );
      break;
    case "16":
      console.log("Cerrando conexión...");
      client.write(JSON.stringify({ command: "EXIT" })); // 🔥 Notifica al servidor
      setTimeout(() => {
        client.end(); //
      }, 500);
      return;
    default:
      console.log("⚠️ Opción no válida. Por favor, intenta de nuevo. ❌");

      mostrarMenu();
      break;
  }
}

client.on("data", (data) => {
  console.log(" ---------------Respuesta del servidor-----------------");

  const datos = data.toString();
  console.log(datos);
  mostrarMenu();
});

client.on("close", () => {
  console.log("Conexión cerrada");
});

client.on("error", (err) => {
  console.log("Error: ", err.message);
});

function prompAddBoock() {
  const id = uuidv4();
  const name = readlineSync.question("Ingrese el titulo del libro: ");
  const country = readlineSync.question("Ingrese el pais del libro: ");
  const foundedYear = readlineSync.question("Ingrese el ańo del libro: ");
  const newBook = { id, name, country, foundedYear };
  return newBook;
}

const prompAddPublisher = () => {
  const id = uuidv4();
  const name = readlineSync.question("Ingrese el nombre de la editorial: ");
  const country = readlineSync.question("Ingrese el pais de la editorial: ");
  const foundedYear = readlineSync.question("Ingrese el ańo de la editorial: ");
  const newPublisher = { id, name, country, foundedYear };
  return newPublisher;
};

const prompAddAuthor = () => {
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

function promptDeleteBook() {
  const id = readlineSync.question("Ingrese el id del libro a eliminar: ");
  return id;
}

function promptDeletAutor() {
  const id = readlineSync.question("Ingrese el id del autor a eliminar: ");
  return id;
}

function promptDeletePublisher() {
  const id = readlineSync.question(
    "Ingrese el id de la editorial a eliminar: "
  );
  return id;
}

function editBook() {
  const name = readlineSync.question("ingrese el nuevo nombre : ");
  const country = readlineSync.question("ingrese la nueva ciudad : ");
  const foundedYear = readlineSync.question(
    "ingrese el nuevo año del libro : "
  );
  return { name, country, foundedYear };
}

function editAuthor() {
  const name = readlineSync.question("ingrese el nuevo nombre del autor : ");
  const nationality = readlineSync.question(
    "ingrese la nueva nacionalidad del autor : "
  );
  const birthYear = readlineSync.question(
    "ingrese el nuevo año de nacimiento del autor : "
  );
  return { name, nationality, birthYear };
}

function editPublisher() {
  const name = readlineSync.question(
    "ingrese el nuevo nombre de la editorial : "
  );
  const country = readlineSync.question(
    "ingrese el nuevo pais de la editorial : "
  );
  const foundedYear = readlineSync.question(
    "ingrese el nuevo año de la editorial : "
  );
  return { name, country, foundedYear };
}
