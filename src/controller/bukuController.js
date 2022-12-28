const buku = require("../entity/buku");
const { nanoid } = require("nanoid");

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;
  const bukuBaru = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  if (name == undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  buku.push(bukuBaru);
  const isSuccess = buku.filter((myBook) => myBook.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const validBook = buku.filter((myBook) => myBook.id === bookId)[0];
  if (validBook) {
    const response = h.response({
      status: "success",
      data: {
        book: validBook,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const updateBookWithIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;

  const index = buku.findIndex((myBook) => myBook.id === bookId);

  if (name == undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    buku[index] = {
      ...buku[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      insertedAt: buku[index].insertedAt,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
      data: {
        book: buku[index],
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;
  const index = buku.findIndex((myBook) => myBook.id === bookId);
  if (index !== -1) {
    buku.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const getAllBookByQueryParams = (request, h) => {
  const { reading, finished, name } = request.query;
  let filteredBook = buku;

  if (buku.length > 0) {
    if (reading != undefined) {
      filteredBook = buku.filter((myBook) => myBook.reading == Number(reading));
    }
    if (finished != undefined) {
      filteredBook = buku.filter((myBook) => myBook.finished == Number(finished));
    }
    if (name != undefined) {
      filteredBook = buku.filter((myBook) =>
        myBook.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    
    const response = h.response({
      status: "success",
      data: {
        books: filteredBook.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "success",
    data: {
      books: [],
    },
  });
  response.code(200);
  return response;
};

module.exports = {
  addBookHandler,
  getBookByIdHandler,
  getAllBookByQueryParams,
  updateBookWithIdHandler,
  deleteBookHandler
};
