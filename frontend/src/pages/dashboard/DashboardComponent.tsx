import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";
import { getAllBooks } from "../../services/BookService";
import { getAllMembers } from "../../services/MemberService";

const HomeComponent = () => {
  const [BookCount, setBookCount] = useState(0);
  const [MemberCount, setMemberCount] = useState(0);
  useEffect(() => {
    callBookListApi();
    callMemberListApi();
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

  return (
    <>
      <ul className="dashboardUI">
        <li>
          <p>Total Books</p>
          <p>{BookCount}</p>
        </li>
        <li>
          <p>Total Members</p>
          <p>{MemberCount}</p>
        </li>
      </ul>
    </>
  );
};

export default HomeComponent;
