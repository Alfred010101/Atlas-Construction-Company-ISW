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
import EmployeesPage from "./components/admin/Employees";
import ProjectsPage from "./components/admin/Projects";
import WarehousePage from "./components/admin/Warehouse";
import SuppliersPage from "./components/admin/Suppliers";
import StockPage from "./components/admin/Stock";

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
              <Route path="/admin/employees" element={<EmployeesPage />} />
              <Route path="/admin/projects" element={<ProjectsPage />} />
              <Route path="/admin/warehouses" element={<WarehousePage />} />
              <Route path="/admin/suppliers" element={<SuppliersPage />} />
              <Route path="/admin/stock" element={<StockPage />} />
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
