import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button, Card, Container } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { isAdminUser } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { deleteMember, getAllMembers, search } from "../../services/MemberService";

const ListMember = () => {
  const [MemberList, setMemberList] = useState<any[]>([]);
  const navigate = useNavigate();
  const isAdmin = isAdminUser();

  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhoneNumber, setSearchPhoneNumber] = useState("");

  useEffect(() => {
    callMemberListApi();
  }, []);

  const callMemberListApi = async () => {
    try {
      const response = await getAllMembers();
      setMemberList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  function updateMember(id: number) {
    navigate(`/member/update/${id}`);
  }

  function viewMember(id: number) {
    navigate(`/member/view/${id}`);
  }

  const removeMember = async (id: number) => {
    try {
      const response = await deleteMember(id);
      callMemberListApi();
    } catch (error) {
      console.error(error);
    }
  };

  function addMember() {
    navigate(`/Member/add`);
  }

  const searchList = async (
    name: string,
    email: string,
    phoneNumber: string,
    
  ) => {
    try {
      if (name === "" || name === null) {
        name = "%";
      }
      if (email === "" || email === null) {
        email = "%";
      }
      if (phoneNumber === "" || phoneNumber === null) {
        phoneNumber = "%";
      }
      
      const response = await search(
        name,
        email,
        phoneNumber
      );
      setMemberList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const reset = async () => {
    setSearchName(""); setSearchEmail(""); setSearchPhoneNumber("");
    callMemberListApi();
  }
  return (
    <>
      <Container>
        <div className="ListUI">
          <div className="head d-flex justify-content-between align-items-center">
            <h3 className="title-h3">Member's List</h3>
            {isAdmin && (
              <button className="btn btn-primary" onClick={() => addMember()}>
                Add Member
              </button>
            )}
          </div>
          <div className="searchDiv">
            <div className="row">
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={searchName}
                  name="searchName"
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={searchEmail}
                  name="searchEmail"
                  onChange={(e) => setSearchEmail(e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  value={searchPhoneNumber}
                  name="searchPhoneNumber"
                  onChange={(e) => setSearchPhoneNumber(e.target.value)}
                />
              </div>
              <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3 mb-3">
                <button
                  type="button"
                  className="btn btn-back"
                  onClick={() =>
                    searchList(
                      searchName,
                      searchEmail,
                      searchPhoneNumber
                    )
                  }
                >
                  Search
                </button>
                <button type="button" className="btn btn-reset" onClick={() => reset()}>Reset</button>
              </div>
            </div>
          </div>
          {isAdmin && (
            <div className="table-responsive">
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MemberList.map((Member: any, index) => (
                    <tr key={Member.id}>
                      <td>{index + 1}</td>
                      <td>{Member.name}</td>
                      <td>{Member.email}</td>
                      <td>{Member.phoneNumber}</td>
                      <td className="action-icons text-center">
                        {isAdmin && (
                          <span className="edit tooltip">
                            <button onClick={() => updateMember(Member.id)}>
                              <span className="icon">
                                <FaRegEdit />
                              </span>
                              <span className="tooltiptext">Update</span>
                            </button>
                          </span>
                        )}
                        {isAdmin && (
                          <span className="delete tooltip">
                            <button onClick={() => removeMember(Member.id)}>
                              <span className="icon">
                                <MdDeleteOutline />
                              </span>
                              <span className="tooltiptext">Delete</span>
                            </button>
                          </span>
                        )}
                        <span className="view tooltip">
                          <button onClick={() => viewMember(Member.id)}>
                            <span className="icon">
                              <CiViewList />
                            </span>
                            <span className="tooltiptext">View</span>
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!MemberList.length && (
                    <tr>
                      <td colSpan={8} className="text-center">
                        No Member Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default ListMember;
