const bookModel = require("../model/bookModel");
const bookView = require("../view/booksView");

const authorController = {
  getAuthor: () => {
    const author = bookModel.read("autor");
    return bookView.formatResponse.getData(author, "autor");
  },

  addAuthors: (newAuthor) => {
    const author = bookModel.read("autor");
    author.push(newAuthor);
    bookModel.write(author, "autor");
    return bookView.formatResponse.add(newAuthor, "autor");
  },

  delteAuthor: (id) => {
    const author = bookModel.read("autor");
    const delteAuthor = author.find((author) => author.id === id);
    if (!delteAuthor) {
      return bookView.formatResponse.delete(null, author, "autor");
    } else {
      const filterAuthor = author.filter((author) => author.id !== id);
      bookModel.write(filterAuthor, "autor");
      return bookView.formatResponse.delete(id, delteAuthor, "autor");
    }
  },
  searchAutor: (title) => {
    const autores = bookModel.read("autor");
    const search = autores.find((autor) => autor.name === title);
    if (!search) {
      return bookView.formatResponse.search(null, "autor");
    } else {
      return bookView.formatResponse.search(search, "autor");
    }
  },

  editAuthor: (id, newAuthor) => {
    const authors = bookModel.read("autor");
    const search = authors.find((author) => author.id === id);
    if (!search) {
      return bookView.formatResponse.edit(null, "autor");
    } else {
      search.name = newAuthor.name;
      search.nationality = newAuthor.nationality;
      search.birthYear = newAuthor.birthYear;
      bookModel.write(authors, "autor");

      return bookView.formatResponse.edit(id, search, "autor");
    }
  },
};

module.exports = authorController;
