import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import {
  isAdminUser,
  isUserLoggedIn,
  logout,
} from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { PiBooksLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { IoIosGitPullRequest } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const isAuth = isUserLoggedIn();
  const isAdmin = isAdminUser();

  function handlLogout() {
    logout();
    navigate("/login");
  }
  return (
    <>
      {isAuth && (
        <nav className="navbar-expand bg-primary">
          <div className="navbar-nav">
            <NavLink
              to="/dashboard"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending nav-link"
                  : isActive
                  ? "active nav-link"
                  : "nav-link"
              }
            >
              <RxDashboard />
              Dashboard
            </NavLink>
            <NavLink
              to="/books-list"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending nav-link"
                  : isActive
                  ? "active nav-link"
                  : "nav-link"
              }
            >
              <PiBooksLight />
              Books
            </NavLink>

            {isAdmin && (
              <NavLink
                to="/members-list"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending nav-link"
                    : isActive
                    ? "active nav-link"
                    : "nav-link"
                }
              >
                <FaRegUser />
                Members
              </NavLink>
            )}
            <NavLink
              to="/borrow-list"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending nav-link"
                  : isActive
                  ? "active nav-link"
                  : "nav-link"
              }
            >
              <IoIosGitPullRequest />
              Borrow Book List
            </NavLink>
            <Nav.Link onClick={() => handlLogout()}>
              {" "}
              <IoIosLogOut />
              Logout
            </Nav.Link>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavbarComponent;
