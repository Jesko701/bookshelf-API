const {
  addBookHandler,
  getBookByIdHandler,
  updateBookWithIdHandler,
  deleteBookHandler,
  getAllBookByQueryParams,
} = require("./controller/bukuController");
const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBookByQueryParams,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBookWithIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookHandler,
  },
];

module.exports = routes;
