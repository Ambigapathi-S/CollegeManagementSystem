import React, { useEffect, useState } from "react";
import { Container, ToastContainer } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getMemberById, saveMember, updateMember } from "../../services/MemberService";
import { toast } from "react-toastify";
import { logout } from "../../services/AuthService";

const MemberSchema = yup
  .object({
    name: yup.string().required("Name is Required!"),
    email: yup.string().email().required("Email Address is Required!"),
    phoneNumber: yup.string().required("Phone Number is Required!"),
  })
  .required();

const AddEditMember = () => {
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
    resolver: yupResolver(MemberSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let ids = Number(id);
          const response = await getMemberById(ids);
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
    setValue("name", data.name);
    setValue("email", data.email);
    setValue("phoneNumber", data.phoneNumber);
  }
  const onSubmit = async (register: {}) => {
    try {
      if (isAdd) {
        const response = await saveMember(register);
        let resMsg = response.data.message;
        if (response.status === 200 || response.status === 201) {
          toast("Member Added Successfully!", { type: "success" });
          navigate("/members-list");
        } else if (response.status === 403) {
          logout();
          navigate("/login");
        } else {
          toast(resMsg);
        }
      } else {
        let ids = Number(id);
        const response = await updateMember(ids, register);
        let resMsg = response.data.message;
        if (response.status === 200 || response.status === 201) {
          toast("Member Details Updated Successfully!", { type: "success" });
          navigate("/members-list");
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
          <h3 className="title-h3">{isAdd ? "Add" : "Update"} Member</h3>
          <a href="/members-list" className="btn btn-back mb-3">
            Back to List
          </a>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              {...register("name")}
              placeholder="Name"
              className={`form-control ${errors.name ? "error" : ""} `}
            />
            <p className="error">{errors.name?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("email")}
              placeholder="Email"
              className={`form-control ${errors.email ? "error" : ""} `}
            />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("phoneNumber")}
              placeholder="Phone Number"
              className={`form-control ${errors.phoneNumber ? "error" : ""} `}
            />
            <p className="error">{errors.phoneNumber?.message}</p>
          </div>
          <div className="text-center">
            <input type="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AddEditMember;
