import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById } from "../../services/BookService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../../services/AuthService";
import { Button } from "react-bootstrap";

const ViewComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [BookDetails, setBookDetails] = useState({
    id: "",
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publication_date: "",
    copies_available: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let ids = Number(id);
          const response = await getBookById(ids);
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
  

  return (
    <Container>
      <ToastContainer />
      <div className="ListUI">
        <div className="head d-flex justify-content-between align-items-center">
          <h3 className="title-h3">Book Details #{BookDetails.id}</h3>
            <a href="/books-list" className="btn btn-back">
              Back to List
            </a>
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
        <Row>
          <Button type="button" className="btn btn-primary">Request Book</Button>
          <Button type="button" className="btn btn-secondary">Return Book</Button>
        </Row>
      </div>
    </Container>
  );
};

export default ViewComponent;
