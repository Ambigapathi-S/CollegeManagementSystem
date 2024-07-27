import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";
import { getAllBooks } from "../../services/BookService";
import { getAllMembers } from "../../services/MemberService";
import { getAllBorrowBookListByStatus } from "../../services/BorrowedBookService";
import { IoBookSharp } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import { FaHandHolding } from "react-icons/fa";
import { Container } from "react-bootstrap";

const HomeComponent = () => {
  const [BookCount, setBookCount] = useState(0);
  const [MemberCount, setMemberCount] = useState(0);
  const [BorrowedCount, setBorrowedCount] = useState(0);
  const [ReturnedCount, setReturnedCount] = useState(0);
  const [PendingCount, setPendingCount] = useState(0);
  useEffect(() => {
    callBookListApi();
    callMemberListApi();
    callBorrowedBook();
    callReturnedBook();
    callPendingBook();
  }, []);

  const callBookListApi = async () => {
    try {
      const response = await getAllBooks();
      setBookCount(response.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const callMemberListApi = async () => {
    try {
      const response = await getAllMembers();
      setMemberCount(response.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const callBorrowedBook = async () => {
    try {
      const response = await getAllBorrowBookListByStatus("approved");
      setBorrowedCount(response.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const callReturnedBook = async () => {
    try {
      const response = await getAllBorrowBookListByStatus("returned");
      setReturnedCount(response.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const callPendingBook = async () => {
    try {
      const response = await getAllBorrowBookListByStatus("pending");
      setPendingCount(response.data.length);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        <div className="ListUI">
          <div className="head d-flex justify-content-between align-items-center">
            <h3 className="title-h3">Dashboard</h3>
          </div>
          <div className="dashboard">
            <ul className="dashboardUI">
              <li>
                <span>
                  <IoBookSharp />
                </span>
                <p>Total Books Count</p>
                <p>{BookCount}</p>
              </li>
              <li>
                <span>
                  <FaUserCheck />
                </span>
                <p>Total Members Count</p>
                <p>{MemberCount}</p>
              </li>
              <li>
                <span>
                  <FaHandHolding />
                </span>
                <p>Borrowed Book Count</p>
                <p>{BorrowedCount}</p>
              </li>
              <li>
                <span>
                  <GiReturnArrow />
                </span>
                <p>Returned Book Count</p>
                <p>{ReturnedCount}</p>
              </li>
              <li>
                <span>
                  <MdOutlinePendingActions />
                </span>
                <p>Pending Book Count</p>
                <p>{PendingCount}</p>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomeComponent;
