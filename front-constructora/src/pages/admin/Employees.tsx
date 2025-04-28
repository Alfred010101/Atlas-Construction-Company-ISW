import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { Add, Edit, Delete, Search, Refresh } from "@mui/icons-material";
import Dashboard from "./../../components/Dashboard";
import { useMenuConfig } from "./menuConfig";
import { useAuth } from "../../context/AuthContext";
import RegisterEmployeeModal from "../../components/modals/RegisterEmployee";
import EditEmployeeModal from "../../components/modals/EditEmployee";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

interface Employee {
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function Employees() {
  const { navItems } = useMenuConfig();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [emailToEdit, setEmailToEdit] = useState<string | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();

  const handleDeleteEmployee = async () => {
    try {
      if (!emailToDelete) return;

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/api/v1/admin/deleteUser/${emailToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el empleado.");
      }

      setSnackbarOpen(true);
      setOpenDeleteDialog(false);
      refreshFetchEmployees("Empleado eliminado exitosamente!", "success");
    } catch (error) {
      console.error(error);
      setSnackbarMessage("Error al eliminar el empleado.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const fetchEmployees = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token no disponible.");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/v1/admin/allUsers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los empleados.");
      }

      const data = await response.json();

      const employeesData = data.data.map((user: any) => ({
        name: `${user.firstName} ${user.lastName}`,
        email: user.username,
        phone: user.phone,
        role: user.role,
      }));

      setEmployees(employeesData);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
    refreshFetchEmployees("Empleados cargados exitosamente!", "success");
  }, [fetchEmployees]);

  const refreshFetchEmployees = (text: string, type: "success" | "error") => {
    fetchEmployees();
    setSnackbarMessage(text);
    setSnackbarSeverity(type);
  };

  const filteredEmployees = employees.filter((emp) => {
    return (
      (emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterDepartment
        ? emp.role.toLowerCase() === filterDepartment.toLowerCase()
        : true)
    );
  });

  if (!isAuthenticated) {
    return <Typography>No autorizado. Por favor, inicie sesión.</Typography>;
  }

  return (
    <Dashboard navItems={navItems}>
      <Box p={3}>
        <Typography variant="h4" mb={3} align="center">
          Gestión de Empleados
        </Typography>

        <Toolbar sx={{ justifyContent: "space-between", p: 0, mb: 2 }}>
          <Box display="flex" gap={2}>
            <TextField
              variant="outlined"
              placeholder="Buscar empleado..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            <Select
              displayEmpty
              size="small"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">Todos los departamentos</MenuItem>
              <MenuItem value="CEO">CEO</MenuItem>
              <MenuItem value="SYS_ADMIN">Admin</MenuItem>
              <MenuItem value="RESOURCE_MANAGER">
                Administrador de recursos
              </MenuItem>
              <MenuItem value="CONSTRUCTION_SUPERVISOR">
                Supervisor de obra
              </MenuItem>
              <MenuItem value="WAREHOUSE_SUPERVISOR">
                Supervisor de almacen
              </MenuItem>
            </Select>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => {
                refreshFetchEmployees(
                  "Empleados recargados exitosamente!",
                  "success"
                );
              }}
            >
              Recargar
            </Button>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Agregar empleado
            </Button>
          </Stack>
        </Toolbar>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredEmployees.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setEmailToEdit(employee.email);
                        setOpenEditDialog(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setEmailToDelete(employee.email);
                        setOpenDeleteDialog(true);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <RegisterEmployeeModal
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          handleSubmit={refreshFetchEmployees}
        />

        <EditEmployeeModal
          open={openEditDialog}
          emailToEdit={emailToEdit}
          onClose={() => setOpenEditDialog(false)}
          onSave={() => {
            refreshFetchEmployees(
              "Empleado actualizado exitosamente!",
              "success"
            );
            setOpenEditDialog(false);
          }}
        />

        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro que deseas eliminar este empleado?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
            <Button color="error" onClick={handleDeleteEmployee}>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar de confirmación */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Dashboard>
  );
}
