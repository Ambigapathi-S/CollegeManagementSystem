import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../../services/BookService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import {
  getLoggedInUser,
  isAdminUser,
  logout,
} from "../../services/AuthService";
import { Button } from "react-bootstrap";
import {
  getBorrowListByBookIDAndMemberID,
  saveBorrowedBook,
} from "../../services/BorrowedBookService";
import { search } from "../../services/MemberService";

const ViewComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAdmin = isAdminUser();
  const userName = getLoggedInUser();
  let isPendingBook = true;
  const [BookDetails, setBookDetails] = useState({
    id: "",
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publication_date: "",
    copies_available: "",
  });
  const [bookStatus, setBookStatus] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let ids = Number(id);
          const response = await getBookById(ids);
          if (!isAdmin) {
            const member = await search("%", userName ? userName : "", "%");
            const memberID = member.data[0].id;
            const bookStatus = await getBorrowListByBookIDAndMemberID(
              ids,
              memberID
            );
            if (bookStatus.data != null) {
              setBookStatus(bookStatus.data.status);
            } else {
              setBookStatus("");
            }
          }
          setBookDetails(response.data);
        }
      } catch (error: any) {
        if (error?.response?.status === 403) {
          logout();
          navigate("/login");
        } else {
          toast(error);
        }
      }
    };
    fetchData();
  }, [id]);

  const RequestForBook = async (id: string) => {
    try {
      const Book = BookDetails;
      const resp = await search("%", userName ? userName : "", "%");
      const Member = resp?.data[0];
      let BorrowedReq = {
        book: Book,
        member: Member,
        issueDate: "",
        dueDate: "",
        returnDate: "",
        status: "pending",
      };
      const response = await saveBorrowedBook(BorrowedReq);
      if (response.status === 200 || response.status === 201) {
        toast("Book Request has been sent to Admin!", { type: "success" });
        navigate("/borrow-list");
      } else if (response.status === 403) {
        logout();
        navigate("/login");
      } else {
        toast("Error");
      }
    } catch (error: any) {
      let resMsg = error?.response?.data.message;
      toast(resMsg);
    }
  };
  return (
    <Container>
      <ToastContainer />
      <div className="ListUI">
        <div className="head d-flex justify-content-between align-items-center">
          <h3 className="title-h3">Book Details #{BookDetails.id}</h3>
          <div className="button-group">
            {!isAdmin && bookStatus !== "pending" && (
              <>
                <Button
                  type="button"
                  className="btn btn-success"
                  onClick={() => RequestForBook(BookDetails.id)}
                >
                  Request Book
                </Button>
              </>
            )}
            {!isAdmin && bookStatus === "pending" && (
              <span>*Already Book Requested Status : {bookStatus}</span>
            )}
            <a href="/books-list" className="btn btn-back">
              Back to List
            </a>
          </div>
        </div>

        <Row>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Title: </label>
              <span>&nbsp;{BookDetails.title}</span>
            </p>
            <p>
              <label>Author: </label>
              <span>&nbsp;{BookDetails.author}</span>
            </p>
            <p>
              <label>ISBN: </label>
              <span>&nbsp;{BookDetails.isbn}</span>
            </p>
          </Col>
          <Col xs={12} md={6} sm={6} lg={6}>
            <p>
              <label>Genre: </label>
              <span>&nbsp;{BookDetails.genre}</span>
            </p>
            <p>
              <label>Publication Date: </label>
              <span>&nbsp;Rs.{BookDetails.publication_date}</span>
            </p>
            <p>
              <label>Copies Available: </label>
              <span>&nbsp;{BookDetails.copies_available}</span>
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ViewComponent;
