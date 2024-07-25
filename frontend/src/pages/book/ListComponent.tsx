import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button, Card, Container } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { isAdminUser } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { deleteBook, getAllBooks, search } from "../../services/BookService";

const ListComponent = () => {
  const [BookList, setBookList] = useState<any[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchIsbn, setSearchIsbn] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [searchPublicationDate, setSearchPublicationDate] = useState("");
  const [searchCopiesAvailable, setSearchCopiesAvailable] = useState(0);
  const navigate = useNavigate();
  const isAdmin = isAdminUser();

  useEffect(() => {
    callBookListApi();
  }, []);

  const callBookListApi = async () => {
    try {
      const response = await getAllBooks();
      setBookList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  function updateBook(id: number) {
    navigate(`/book/update/${id}`);
  }

  function viewBook(id: number) {
    navigate(`/book/view/${id}`);
  }

  const removeBook = async (id: number) => {
    try {
      const response = await deleteBook(id);
      callBookListApi();
    } catch (error) {
      console.error(error);
    }
  };

  function addBook() {
    navigate(`/Book/add`);
  }

  const searchList = async (
    title: string,
    author: string,
    isbn: string,
    genre: string,
    publication_date: string,
    copies_available: number
  ) => {
    try {
      const copies_count: number = Number(copies_available);
      if (title === "" || title === null) {
        title = "%";
      }
      if (author === "" || author === null) {
        author = "%";
      }
      if (isbn === "" || isbn === null) {
        isbn = "%";
      }
      if (genre === "" || genre === null) {
        genre = "%";
      }
      if (publication_date === "" || publication_date === null) {
        publication_date = "%";
      }
      const response = await search(
        title,
        author,
        isbn,
        genre,
        publication_date,
        copies_count
      );
      setBookList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const reset = async () => {
    setSearchTitle("");
    setSearchAuthor("");
    setSearchIsbn("");
    setSearchGenre("");
    setSearchPublicationDate("");
    setSearchCopiesAvailable(0);
    callBookListApi();
  };
  return (
    <>
      <Container>
        <div className="ListUI">
          <div className="head d-flex justify-content-between align-items-center">
            <h3 className="title-h3">Book's List</h3>
            {isAdmin && (
              <button className="btn btn-primary" onClick={() => addBook()}>
                Add Book
              </button>
            )}
          </div>
          <div className="searchDiv">
            <div className="row">
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={searchTitle}
                  name="searchTitle"
                  onChange={(e) => setSearchTitle(e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Author"
                  value={searchAuthor}
                  name="searchAuthor"
                  onChange={(e) => setSearchAuthor(e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ISBN"
                  value={searchIsbn}
                  name="searchIsbn"
                  onChange={(e) => setSearchIsbn(e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Genre"
                  value={searchGenre}
                  name="searchGenre"
                  onChange={(e) => setSearchGenre(e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 mb-3">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Publication Date"
                  value={searchPublicationDate}
                  name="searchPublicationDate"
                  onChange={(e) => setSearchPublicationDate(e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Copies Available"
                  value={searchCopiesAvailable}
                  name="searchCopiesAvailable"
                  onChange={(e) =>
                    setSearchCopiesAvailable(Number(e.target.value))
                  }
                />
              </div>
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 mb-3">
                <button
                  type="button"
                  className="btn btn-back"
                  onClick={() =>
                    searchList(
                      searchTitle,
                      searchAuthor,
                      searchIsbn,
                      searchGenre,
                      searchPublicationDate,
                      searchCopiesAvailable
                    )
                  }
                >
                  Search
                </button>
                <button
                  type="button"
                  className="btn btn-reset"
                  onClick={() => reset()}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Genre</th>
                  <th>Pulbication Date</th>
                  <th>Available Copies</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {BookList.map((Book: any, index) => (
                  <tr key={Book.id}>
                    <td>{index + 1}</td>
                    <td>{Book.title}</td>
                    <td>{Book.author}</td>
                    <td>{Book.isbn}</td>
                    <td>{Book.genre}</td>
                    <td>{Book.publication_date}</td>
                    <td>{Book.copies_available}</td>
                    <td className="action-icons text-center">
                      {isAdmin && (
                        <span className="edit tooltip">
                          <button onClick={() => updateBook(Book.id)}>
                            <span className="icon">
                              <FaRegEdit />
                            </span>
                            <span className="tooltiptext">Update</span>
                          </button>
                        </span>
                      )}
                      {isAdmin && (
                        <span className="delete tooltip">
                          <button onClick={() => removeBook(Book.id)}>
                            <span className="icon">
                              <MdDeleteOutline />
                            </span>
                            <span className="tooltiptext">Delete</span>
                          </button>
                        </span>
                      )}
                      <span className="view tooltip">
                        <button onClick={() => viewBook(Book.id)}>
                          <span className="icon">
                            <CiViewList />
                          </span>
                          <span className="tooltiptext">View</span>
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
                {!BookList.length && (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Book Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ListComponent;
