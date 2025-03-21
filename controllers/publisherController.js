const bookModel = require("../model/bookModel");
const bookView = require("../view/booksView");

const publisherController = {
  getPublisher: () => {
    const publisher = bookModel.read("publisher");
    return bookView.formatResponse.getData(publisher ,"publisher");
  },

  addPublisher: (newPublisher) => {
    const publisher = bookModel.read("publisher");
    publisher.push(newPublisher);
    bookModel.write(publisher , "publisher");
    return bookView.formatResponse.add(newPublisher , "publisher");
  },

  deletePublisher: (id) => {
    const publishers = bookModel.read("publisher");
    const deletePublisher = publishers.find(
      (Publisher) => Publisher.id === id
    );
    if (!deletePublisher) {
     return bookView.formatResponse.delete(null , publishers , "publisher");

    } else{
    const filterPublishers = publishers.filter((Publisher) => Publisher.id !== id);
    bookModel.write(filterPublishers , "publisher");
    return  bookView.formatResponse.delete(id , deletePublisher , "publisher");
  }
},
 searchPublisher: (title) => {
      const publishers = bookModel.read("publisher");
      const search = publishers.find((publisher) => publisher.name === title);
      if (!search) {
        return bookView.formatResponse.search(null, "publisher");
      } else {
        return bookView.formatResponse.search(search, "publisher");
      }
    },
    edithPublisher :( id , newPublisher)=>{
      const publishers= bookModel.read("publisher");
      const search = publishers.find((publisher) => publisher.id === id);
      if (!search) {
        return bookView.formatResponse.edit(null,search, "publisher");
      } else {
        search.name = newPublisher.name;
        search.country = newPublisher.country;
        search.foundedYear = newPublisher.foundedYear;
        bookModel.write(publishers, "publisher");
        return bookView.formatResponse.edit(id, search, "publisher");
      }
    }
};
module.exports = publisherController;
