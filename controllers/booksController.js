const bookModel = require("../model/bookModel");
const bookView = require("../view/booksView");

const bookController = {
  getBooks: () => {
    const books = bookModel.read("book");
    return bookView.formatResponse.getData(books, "books");
  },

  addBooks: (newBook) => {
    const books = bookModel.read("book");
    books.push(newBook);
    bookModel.write(books, "book");
    return bookView.formatResponse.add(newBook, "book");
  },

  deleteBooks: (id) => {
    const books = bookModel.read("book");
    const deltetBook = books.find((book) => book.id === id);
    if (!deltetBook) {
      return bookView.formatResponse.delete(null, books, "book");
    } else {
      const filterBook = books.filter((book) => book.id !== id);
      bookModel.write(filterBook, "book");

      return bookView.formatResponse.delete(id, deltetBook, "book");
    }
  },
  searchBook: (title) => {
 
    
    const books = bookModel.read("book");
    const search = books.find((book) => book.name === title);
  
    if (!search) {
      return  bookView.formatResponse.search(null , "book");
    } else {
      return  bookView.formatResponse.search(search, "book");
    }
  },

  editBoock: (id, newDate) => {
    const books = bookModel.read("book");
    const search = books.find((book) => book.id === id);

    if (!search) {
      return bookView.formatResponse.edit(null,search, "book");
    } else {
      search.name = newDate.name;
      search.country = newDate.country;
      search.foundedYear = newDate.foundedYear;
      bookModel.write(books, "book");
      return bookView.formatResponse.edit(id, search, "book");
    }
  },
};

module.exports = bookController;
