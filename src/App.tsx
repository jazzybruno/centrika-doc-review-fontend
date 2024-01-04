import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthProvider";
import AccountIndex from "./pages/account";
import DashboardIndex from "./pages/admin/dashboard";
import Departments from "./pages/admin/departments";
import Documents from "./pages/admin/documents";
import Users from "./pages/admin/users";
import AcceptInvitation from "./pages/auth/AcceptInvitation";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Login from "./pages/auth/login";
import ResetPassword from "./pages/auth/reset-password/ResetPassword";
import VerifyResetCode from "./pages/auth/reset-password/VerifyResetCode";
import NotificationPage from "./pages/notifications";
import FillProfile from "./pages/on-boarding/FillProfile";
import ReferenceNumbers from "./pages/reference";
import UserDocuments from "./pages/user/documents";
import ViewDocumentPdf from "./pages/view-document";

function App() {
  const { user } = useAuth();

  const AuthRoute = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      return <Outlet />;
    }
    return <Navigate to="/" />;
  };

  const AdminRoute = () => {
    const token = sessionStorage.getItem("token");
    if (
      token &&
      user?.roles.some(
        (role) =>
          role.roleName === "ADMIN" || role.roleName === "DEPARTMENT_HEAD"
      )
    ) {
      return <Outlet />;
    }
    return <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forgot-password" element={<ResetPassword />} />
        <Route
          path="/auth/reset-password/:code"
          element={<VerifyResetCode />}
        />
        <Route path="/auth/verify-email" element={<VerifyEmail />} />
        <Route path="/auth/accept-invitation" element={<AcceptInvitation />} />
        {/*<Route path="/on-boarding/set-up-password" element={<SetupPassword />} />*/}
        {/* <Route path="/on-boarding/set-up-profile" element={<SetupProfile />} /> */}
        <Route path="/on-boarding/fill-profile" element={<FillProfile />} />
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
