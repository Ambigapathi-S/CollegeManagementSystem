import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";
import { getAllBooks } from "../../services/BookService";
import { getAllMembers } from "../../services/MemberService";
import { getAllBorrowBookListByStatus } from "../../services/BorrowedBookService";

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
      <div className="dashboard">
        <div className="head">
          <h1>Dashboard</h1>
        </div>
        <ul className="dashboardUI">
          <li>
            <p>Total Books Count</p>
            <p>{BookCount}</p>
          </li>
          <li>
            <p>Total Members Count</p>
            <p>{MemberCount}</p>
          </li>
          <li>
            <p>Borrowed Book Count</p>
            <p>{BorrowedCount}</p>
          </li>
          <li>
            <p>Returned Book Count</p>
            <p>{ReturnedCount}</p>
          </li>
          <li>
            <p>Pending Book Count</p>
            <p>{PendingCount}</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HomeComponent;
