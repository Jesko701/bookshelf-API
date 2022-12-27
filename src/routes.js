const {
  addBookHandler,
  getBookHandler,
  getBookByIdHandler,
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
    handler: getBookHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler,
  },
];

module.exports = routes;
