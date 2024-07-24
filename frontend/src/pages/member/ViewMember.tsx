import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMemberById } from "../../services/MemberService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import { logout } from "../../services/AuthService";

const ViewMember = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [MemberDetails, setMemberDetails] = useState({
    id: "",
    name: "",
    email: "",
    phoneNumber: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let ids = Number(id);
          const response = await getMemberById(ids);
          setMemberDetails(response.data);
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
          <h3 className="title-h3">Member Details #{MemberDetails.id}</h3>
          <a href="/members-list" className="btn btn-back">
            Back to List
          </a>
        </div>

        <Row>
          <Col xs={12} md={12} sm={12} lg={12}>
            <p>
              <label>Name: </label>
              <span>&nbsp;{MemberDetails.name}</span>
            </p>
            <p>
              <label>Email: </label>
              <span>&nbsp;{MemberDetails.email}</span>
            </p>
            <p>
              <label>Phone Number: </label>
              <span>&nbsp;{MemberDetails.phoneNumber}</span>
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ViewMember;
