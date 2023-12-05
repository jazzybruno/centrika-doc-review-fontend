import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import AccountIndex from "./pages/account";
import DashboardIndex from "./pages/admin/dashboard";
import Departments from "./pages/admin/departments";
import Documents from "./pages/admin/documents";
import Users from "./pages/admin/users";
import Login from "./pages/login";
import NotificationPage from "./pages/notifications";
import ReferenceNumbers from "./pages/reference";
import UserDocuments from "./pages/user/documents";
import ViewDocumentPdf from "./pages/view-document";

function App() {
  const AuthRoute = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      return <Outlet />;
    }
    return <Navigate to="/" />;
  };

  const AdminRoute = () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (token && user?.roles[0].roleName === "ADMIN") {
      return <Outlet />;
    }
    return <Navigate to="/" />;
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
          <Route path="/reference" element={<ReferenceNumbers />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/user/documents" element={<UserDocuments />} />
          <Route path="/document/:id" element={<ViewDocumentPdf />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
