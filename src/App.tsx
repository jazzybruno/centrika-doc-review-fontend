import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import DashboardIndex from "./pages/admin/dashboard";
import Users from "./pages/admin/users";
import Departments from "./pages/admin/departments";
import Documents from "./pages/admin/documents";
import AccountIndex from "./pages/account";
import UserDocuments from "./pages/user/documents";

function App() {
  const AuthRoute = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return <Outlet />;
    }
    return <Navigate to="/"  />;
  };

  const AdminRoute = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (token && user?.roles[0].roleName === "ADMIN") {
      return <Outlet />;
    }
    return <Navigate to="/"  />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<DashboardIndex />} />
          <Route path="/users" element={<Users />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/documents" element={<Documents />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/account" element={<AccountIndex />} />
          <Route path="/user/documents" element={<UserDocuments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
