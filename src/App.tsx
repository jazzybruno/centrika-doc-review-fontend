import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import DashboardIndex from "./pages/dashboard"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashboardIndex />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
