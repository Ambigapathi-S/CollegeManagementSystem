import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button, Card, Container } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { isAdminUser } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import {
  getAllBorrowBookList,
  getAllBorrowBookListByStatus,
} from "../../services/BorrowedBookService";

const BorrowListComponent = () => {
  const [BorrowList, setBorrowList] = useState<any[]>([]);
  const navigate = useNavigate();
  const isAdmin = isAdminUser();
  const [status, setStatus] = useState("");
  useEffect(() => {
    callBorrowListApi();
  }, []);

  const callBorrowListApi = async () => {
    try {
      const response = await getAllBorrowBookList();
      setBorrowList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  function updateBorrow(id: number) {
    navigate(`/borrow/update/${id}`);
  }

  function returnBook(id: number) {
    navigate(`/borrow/update/${id}`);
  }

  const handleChange = (event: any) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    getList(newStatus);
  };

  const getList = async (status: string) => {
    try {
      if (status === "") {
        const response = await getAllBorrowBookList();
        setBorrowList(response.data);
      } else {
        const response = await getAllBorrowBookListByStatus(status);
        setBorrowList(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        <div className="ListUI">
          <div className="head d-flex justify-content-between align-items-center">
            <h3 className="title-h3">Borrow/Return Book's List</h3>
          </div>
          <div className="searchDiv">
            <div className="row">
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 mb-3">
                <label>Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="returned">Returned</option>
                </select>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book ID and Title</th>
                  <th>Member Name and ID</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {BorrowList.map((Borrow: any, index) => (
                  <tr key={Borrow.id}>
                    <td>{index + 1}</td>
                    <td>
                      {Borrow.book.title} (#{Borrow.book.id})
                    </td>
                    <td>
                      {Borrow.member.name} (#{Borrow.member.id})
                    </td>
                    <td>{Borrow.issueDate}</td>
                    <td>{Borrow.dueDate}</td>
                    <td>{Borrow.returnDate}</td>
                    <td style={{"textTransform":"capitalize"}}>{Borrow.status}</td>
                    <td className="action-icons text-center">
                      {isAdmin && (
                        <span className="edit tooltip">
                          <button onClick={() => updateBorrow(Borrow.id)}>
                            <span className="icon">
                              <FaRegEdit />
                            </span>
                            <span className="tooltiptext">Update</span>
                          </button>
                        </span>
                      )}
                      {!isAdmin &&
                        Borrow.status.toLowerCase() == "approved" && (
                          <span className="view tooltip">
                            <button onClick={() => returnBook(Borrow.id)}>
                              <span className="icon">
                                <CiViewList />
                              </span>
                              <span className="tooltiptext">Return Book</span>
                            </button>
                          </span>
                        )}
                    </td>
                  </tr>
                ))}
                {!BorrowList.length && (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No Borrow/Return book's Found
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

export default BorrowListComponent;
