import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { isUserLoggedIn, logout } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const isAuth = isUserLoggedIn();

  function handlLogout() {
    logout();
    navigate("/login");
  }
  return (
    <>
      {isAuth && (
        <Navbar bg="primary">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/books-list">Book</Nav.Link>
            <Nav.Link href="/members-list">Members</Nav.Link>
            <Nav.Link onClick={() => handlLogout()}>Logout</Nav.Link>
          </Nav>
        </Navbar>
      )}
    </>
  );
};

export default NavbarComponent;
