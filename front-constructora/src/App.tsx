import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/admin/Dashboard";
import DashboardConstruction from "./pages/construction/Dashboard";
import DashboardManager from "./pages/manager/Dashboard";
import DashboardWarehose from "./pages/warehouse/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute allowedRoles={["CEO"]} />}>
              <Route path="/ceo" element={<DashboardConstruction />} />
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["SYS_ADMIN"]} />}>
              <Route path="/admin" element={<DashboardAdmin />} />
            </Route>
            <Route
              element={<ProtectedRoute allowedRoles={["RESOURCE_MANAGER"]} />}
            >
              <Route path="/resource" element={<DashboardManager />} />
            </Route>
            <Route
              element={
                <ProtectedRoute allowedRoles={["CONSTRUCTION_SUPERVISOR"]} />
              }
            >
              <Route path="/construction" element={<DashboardConstruction />} />
            </Route>
            <Route
              element={
                <ProtectedRoute allowedRoles={["WAREHOUSE_SUPERVISOR"]} />
              }
            >
              <Route path="/warehouse" element={<DashboardWarehose />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
