import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { isUserLoggedIn } from "./services/AuthService";
import LayoutComponent from "./pages/common/LayoutComponent";
import DashboardComponent from "./pages/dashboard/DashboardComponent";
import LoginComponent from "./pages/auth/LoginComponent";
import PageNotFound from "./pages/common/PageNotFound";
import FooterComponent from "./pages/common/FooterComponent";
import HeaderComponent from "./pages/common/HeaderComponent";
import NavbarComponent from "./pages/common/NavbarComponent";
import AddEditComponent from "./pages/book/AddEditComponent";
import ListComponent from "./pages/book/ListComponent";
import ViewComponent from "./pages/book/ViewComponent";
import AddEditMember from "./pages/member/AddEditMember";
import ListMember from "./pages/member/ListMember";
import ViewMember from "./pages/member/ViewMember";

function App() {
  function AuthenticatedRoute({ children }: any) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/" />;
  }
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <div className="content">
          <Routes>
            <Route element={<LayoutComponent />}>
              <Route path="/" element={<LoginComponent />}></Route>
              <Route path="/login" element={<LoginComponent />}></Route>
              <Route path="/dashboard" element={<DashboardComponent />}></Route>

              <Route
                path="/books-list"
                element={
                  <AuthenticatedRoute>
                    <ListComponent />
                  </AuthenticatedRoute>
                }
              ></Route>
              <Route
                path="/book/add"
                element={
                  <AuthenticatedRoute>
                    <AddEditComponent />
                  </AuthenticatedRoute>
                }
              ></Route>
              <Route
                path="/book/update/:id"
                element={
                  <AuthenticatedRoute>
                    <AddEditComponent />
                  </AuthenticatedRoute>
                }
              ></Route>
              <Route
                path="/book/view/:id"
                element={
                  <AuthenticatedRoute>
                    <ViewComponent />
                  </AuthenticatedRoute>
                }
              ></Route>

              <Route
                path="/members-list"
                element={
                  <AuthenticatedRoute>
                    <ListMember />
                  </AuthenticatedRoute>
                }
              ></Route>
              <Route
                path="/member/add"
                element={
                  <AuthenticatedRoute>
                    <AddEditMember />
                  </AuthenticatedRoute>
                }
              ></Route>
              <Route
                path="/member/update/:id"
                element={
                  <AuthenticatedRoute>
                    <AddEditMember />
                  </AuthenticatedRoute>
                }
              ></Route>
              <Route
                path="/member/view/:id"
                element={
                  <AuthenticatedRoute>
                    <ViewMember />
                  </AuthenticatedRoute>
                }
              ></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Route>
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
