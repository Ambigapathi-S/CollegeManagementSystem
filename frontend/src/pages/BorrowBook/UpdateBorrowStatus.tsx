import React, { useEffect, useState } from "react";
import { Col, Container, Row, ToastContainer } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getBookById, saveBook, updateBook } from "../../services/BookService";
import { toast } from "react-toastify";
import { isAdminUser, logout } from "../../services/AuthService";
import {
  getBorrowBookListById,
  returnBorrowedBook,
} from "../../services/BorrowedBookService";

const BorrowSchema = yup
  .object()
  .shape({
    id: yup.string().notRequired(),
    issueDate: yup.date().required("Issue Date is Required!"),
    dueDate: yup
      .date()
      .min(yup.ref("issueDate"), "Due date must be after Issue Date")
      .required("Due Date is Required!"),
    returnDate: yup.string().notRequired(),
    status: yup.string().required("Status is Required!"),
    book: yup.object().notRequired(),
    member: yup.object().notRequired(),
  })
  .required();

const UpdateBorrowStatus = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  let ids = Number(id);
  const isAdmin = isAdminUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(BorrowSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let ids = Number(id);
          const response = await getBorrowBookListById(ids);
          if (response.data) {
            setValues(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  function setValues(data: any) {
    setValue("id", id);
    setValue("issueDate", data.issueDate);
    setValue("dueDate", data.dueDate);
    setValue("returnDate", data.returnDate);
    setValue("status", data.status);
    setValue("book", data.book);
    setValue("member", data.member);
  }
  const onSubmit = async (register: {}) => {
    try {
      let ids = Number(id);
      const response = await returnBorrowedBook(ids, register);
      if (response.status === 200 || response.status === 201) {
        toast("Book Borrow Status Updated Successfully!", { type: "success" });
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
      <div className="ListUI">
        <ToastContainer />
        <div className="head d-flex justify-content-between align-items-center">
          <h3 className="title-h3">Update Borrow Book Status</h3>
          <a href="/borrow-list" className="btn btn-back mb-3">
            Back to List
          </a>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xs={12} md={6} sm={6} lg={6}>
              <div className="form-group">
                <label htmlFor="issueDate">Issue Date</label>
                <input
                  {...register("issueDate")}
                  placeholder="Issue Date"
                  type="date"
                  className={`form-control ${errors.issueDate ? "error" : ""} `}
                  disabled={!isAdmin}
                />
                <p className="error">{errors.issueDate?.message}</p>
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  {...register("dueDate")}
                  type="date"
                  placeholder="Due Date"
                  className={`form-control ${errors.dueDate ? "error" : ""} `}
                  disabled={!isAdmin}
                />
                <p className="error">{errors.dueDate?.message}</p>
              </div>
            </Col>
            <Col xs={12} md={6} sm={6} lg={6}>
              <div className="form-group">
                <label htmlFor="returnDate">Return Date</label>
                <input
                  {...register("returnDate")}
                  type="date"
                  placeholder="Return Date"
                  className={`form-control ${
                    errors.returnDate ? "error" : ""
                  } `}
                />
                <p className="error">{errors.returnDate?.message}</p>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  {...register("status")}
                  className={`form-control ${errors.status ? "error" : ""} `}
                >
                  {isAdmin && <option value="pending">Pending</option>}
                  <option value="approved">Approved</option>
                  <option value="returned">Returned</option>
                </select>
                <p className="error">{errors.status?.message}</p>
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

export default UpdateBorrowStatus;
