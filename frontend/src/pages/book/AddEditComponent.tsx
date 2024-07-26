import React, { useEffect, useState } from "react";
import { Col, Container, Row, ToastContainer } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getBookById, saveBook, updateBook } from "../../services/BookService";
import { toast } from "react-toastify";
import { logout } from "../../services/AuthService";

const BookSchema = yup
  .object({
    id:yup.number().notRequired(),
    title: yup.string().required("Title is Required!"),
    author: yup.string().required("Author is Required!"),
    isbn: yup.string().required("ISBN is Required!"),
    genre: yup.string().required("Genre is Required!"),
    publication_date: yup.string().required("Publication Date is Required!"),
    copies_available: yup
      .number()
      .typeError("Copies available must be a number")
      .integer("Copies available must be an integer")
      .positive("Copies available must be positive")
      .required("Available Copies are Required!"),
  })
  .required();

const AddEditComponent = () => {
  const navigate = useNavigate();
  const [isAdd, setAdd] = useState(true);
  const { id } = useParams();
  let ids = Number(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(BookSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let ids = Number(id);
          const response = await getBookById(ids);
          if (response.data) {
            setAdd(false);
            setValues(response.data);
          } else {
            setAdd(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  function setValues(data: any) {
    setValue("id", data.id);
    setValue("title", data.title);
    setValue("author", data.author);
    setValue("isbn", data.isbn);
    setValue("genre", data.genre);
    setValue("publication_date", data.publication_date);
    setValue("copies_available", data.copies_available);
  }
  const onSubmit = async (register: {}) => {
    try {
      if (isAdd) {
        const response = await saveBook(register);
        let resMsg = response.data.message;
        if (response.status === 200 || response.status === 201) {
          toast("Book Added Successfully!", { type: "success" });
          navigate("/books-list");
        } else if (response.status === 403) {
          logout();
          navigate("/login");
        } else {
          toast(resMsg);
        }
      } else {
        let ids = Number(id);
        const response = await updateBook(ids, register);
        let resMsg = response.data.message;
        if (response.status === 200 || response.status === 201) {
          toast("Book Details Updated Successfully!", { type: "success" });
          navigate("/books-list");
        } else if (response.status === 403) {
          logout();
          navigate("/login");
        } else {
          toast(resMsg);
        }
      }
    } catch (error: any) {
      let resMsg = error?.response?.data.message;
      toast(resMsg);
    }
  };

  return (
    <Container>
      <div className="ListUI">
        <ToastContainer />
        <div className="head d-flex justify-content-between align-items-center">
          <h3 className="title-h3">{isAdd ? "Add" : "Update"} Book</h3>
          <a href="/books-list" className="btn btn-back mb-3">
            Back to List
          </a>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={12} md={6} sm={6} lg={6}>
              <div className="form-group">
                <input
                  {...register("title")}
                  placeholder="Title"
                  className={`form-control ${errors.title ? "error" : ""} `}
                />
                <p className="error">{errors.title?.message}</p>
              </div>
              <div className="form-group">
                <input
                  {...register("author")}
                  placeholder="Author"
                  className={`form-control ${errors.author ? "error" : ""} `}
                />
                <p className="error">{errors.author?.message}</p>
              </div>
              <div className="form-group">
                <input
                  {...register("isbn")}
                  placeholder="ISBN"
                  className={`form-control ${errors.isbn ? "error" : ""} `}
                />
                <p className="error">{errors.isbn?.message}</p>
              </div>
            </Col>
            <Col xs={12} md={6} sm={6} lg={6}>
              <div className="form-group">
                <input
                  {...register("genre")}
                  placeholder="Genre"
                  className={`form-control ${errors.genre ? "error" : ""} `}
                />
                <p className="error">{errors.genre?.message}</p>
              </div>
              <div className="form-group">
                <input
                  {...register("publication_date")}
                  placeholder="publication_date"
                  type="date"
                  className={`form-control ${
                    errors.publication_date ? "error" : ""
                  } `}
                />
                <p className="error">{errors.publication_date?.message}</p>
              </div>
              <div className="form-group">
                <input
                  {...register("copies_available")}
                  placeholder="Copies Available"
                  type="number"
                  className={`form-control ${
                    errors.copies_available ? "error" : ""
                  } `}
                />
                <p className="error">{errors.copies_available?.message}</p>
              </div>
            </Col>
          </Row>
          <div className="text-center">
            <input type="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AddEditComponent;
