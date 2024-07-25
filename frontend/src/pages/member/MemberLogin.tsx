import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import {
  saveLoggedInUser,
  logout,
} from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { MemberLoginApi } from "../../services/MemberService";

const MemberLoginSchema = yup
  .object({
    email: yup.string().email().required("Email Address is Required!"),
    phoneNumber: yup.string().required("Phone Number is Required!"),
  })
  .required();
const MemberLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(MemberLoginSchema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data: { email: string; phoneNumber: string }) => {
    try {
      const response = await MemberLoginApi(data.email, data.phoneNumber);
      if (response.status === 200) {
        toast("LoggedIn Successfully!", { type: "success" });
        const role: string = response.data.role;
        saveLoggedInUser(data.email, role);
        navigate("/dashboard");
      } else if (response.status === 403) {
        logout();
        navigate("/login");
      } else {
        toast("Error!");
      }
    } catch (error: any) {
      let resMsg = error?.response?.data.message;
      toast(resMsg);
    }
  };

  return (
    <Container>
      <div className="FormUI">
        <ToastContainer />
        <h3 className="title">Login as Member</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              {...register("email")}
              placeholder="Email Address"
              className={`form-control ${errors.email ? "error" : ""} `}
            />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div className="form-group">
            <input
              {...register("phoneNumber")}
              type="text"
              placeholder="phoneNumber"
              className={`form-control ${errors.phoneNumber ? "error" : ""} `}
            />
            <p className="error">{errors.phoneNumber?.message}</p>
          </div>
          <p className="clickHerePara">Are you an Admin? <a href="login" className="clickHere">Click here</a> to login</p>
          <div className="text-center">
            <input type="submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </Container>
  );
};

export default MemberLogin;
