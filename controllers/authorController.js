const bookModel = require("../model/bookModel");
const bookView = require("../view/booksView");

const authorController = { // se crea un objeto con las funciones que se van a exportar
  getAuthor: () => { // funcion para obtener los autores
    const author = bookModel.read("autor");  // se llama a la funcion read del modelo y se le pasa el tipo de dato que se quiere leer 
    return bookView.formatResponse.getData(author, "autor"); // se llama a la funcion getData de la vista y se le pasa los datos y el tipo de dato
  },

  addAuthors: (newAuthor) => { // funcion para agregar un autor
    const author = bookModel.read("autor"); // se llama a la funcion read del modelo y se le pasa el tipo de dato que se quiere leer
    author.push(newAuthor);// se agrega el nuevo autor al array de autores
    bookModel.write(author, "autor"); // se llama a la funcion write del modelo y se le pasa el array de autores con el nuevo autor agregado y el tipo de dato
    return bookView.formatResponse.add(newAuthor, "autor"); // se llama a la funcion add de la vista y se le pasa el nuevo autor y el tipo de dato
  },

  delteAuthor: (id) => {  // funcion para eliminar un autor
    const author = bookModel.read("autor"); // se llama a la funcion read del modelo y se le pasa el tipo de dato que se quiere leer
    const delteAuthor = author.find((author) => author.id === id);  // se busca el autor por id que se quiere eliminar
    if (!delteAuthor) { // si no se encuentra el autor se retorna un mensaje de error
      return bookView.formatResponse.delete(null, author, "autor"); // se llama a la funcion delete de la vista y se le pasa el mensaje de error, el array de autores y el tipo de dato
    } else {
      const filterAuthor = author.filter((author) => author.id !== id); //si el id del autor se encuentra se filtra el array de autores y se elimina el autor
      bookModel.write(filterAuthor, "autor"); // se llama a la funcion write del modelo y se le pasa el array de autores filtrado y el tipo de dato
      return bookView.formatResponse.delete(id, delteAuthor, "autor"); // se llama a la funcion delete de la vista y se le pasa el id del autor eliminado, el autor eliminado y el tipo de dato
    }
  },
  searchAutor: (title) => { // funcion para buscar un autor
    const autores = bookModel.read("autor"); // se llama a la funcion read del modelo y se le pasa el tipo de dato que se quiere leer
    const search = autores.find((autor) => autor.name === title); // se busca el autor por nombre
    if (!search) { // si no se encuentra el autor se retorna un mensaje de error
      return bookView.formatResponse.search(null, "autor"); // se llama a la funcion search de la vista y se le pasa el mensaje de error y el tipo de dato
    } else {
      return bookView.formatResponse.search(search, "autor"); // si se encuentra el autor se llama a la funcion search de la vista y se le pasa el autor encontrado y el tipo de dato
    }
  },

  editAuthor: (id, newAuthor) => { // funcion para editar un autor
    const authors = bookModel.read("autor"); // se llama a la funcion read del modelo y se le pasa el tipo de dato que se quiere leer
    const search = authors.find((author) => author.id === id); // se busca el autor por id
    if (!search) {// si no se encuentra el autor se retorna un mensaje de error
      return bookView.formatResponse.edit(null,search, "autor"); //  se llama a la funcion edit de la vista y se le pasa el mensaje de error, el autor y el tipo de dato
    } else {
      search.name = newAuthor.name; // si se encuentra el autor se actualizan los datos del autor
      search.nationality = newAuthor.nationality; // se actualiza la nacionalidad del autor
      search.birthYear = newAuthor.birthYear; // se actualiza el año de nacimiento del autor
      bookModel.write(authors, "autor"); // se llama a la funcion write del modelo y se le pasa el array de autores actualizado y el tipo de dato

      return bookView.formatResponse.edit(id, search, "autor"); // se llama a la funcion edit de la vista y se le pasa el id del autor editado, el autor editado y el tipo de dato
    }
  },
};

module.exports = authorController;
