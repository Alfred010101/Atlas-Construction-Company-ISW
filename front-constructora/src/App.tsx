import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import DashboardConstruction from "./pages/construction/Dashboard";
import DashboardManager from "./pages/manager/Dashboard";
import DashboardWarehose from "./pages/warehouse/Stock";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";
import EmployeesPage from "./pages/admin/Employees";
import CustomersPage from "./pages/admin/Customers";
import ProjectsPage from "./pages/admin/Projects";
import WarehousePage from "./pages/admin/Warehouses";
import SuppliersPage from "./pages/admin/Suppliers";
import StockPage from "./pages/admin/Stock";

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
              <Route path="/admin" element={<EmployeesPage />} />
              <Route path="/admin/employees" element={<EmployeesPage />} />
              <Route path="/admin/customers" element={<CustomersPage />} />
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
