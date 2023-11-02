import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import DashboardIndex from "./pages/dashboard";
import Users from "./pages/users";
import Departments from "./pages/departments";
import Documents from "./pages/documents";
import AccountIndex from "./pages/account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account" element={<AccountIndex />} />
        <Route path="/dashboard" element={<DashboardIndex />} />
        <Route path="/users" element={<Users />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
