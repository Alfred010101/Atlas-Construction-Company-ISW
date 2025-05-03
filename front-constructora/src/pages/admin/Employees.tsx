import { useState, useEffect } from "react";
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
import { roles } from "../../utils/varConst";
import {
  getEmployees,
  deleteEmployee,
  refreshEmployees,
} from "../../request/Employee";
import { Employee } from "../../interfaces/ModelsTypes";

export default function Employees() {
  const { navItems } = useMenuConfig();
  const { isAuthenticated } = useAuth();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [usernameToEdit, setUsernameToEdit] = useState<string | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [usernameToDelete, setUsernameToDelete] = useState<string | null>(null);

  const handleSnackBar = (text: string, type: "success" | "error") => {
    setSnackbarMessage(text);
    setSnackbarSeverity(type);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    getEmployees({ setEmployees, handleSnackBar });
  }, []);

  const refreshFetchEmployees = () => {
    refreshEmployees({ setEmployees });
  };

  const filteredEmployees = employees.filter((emp) => {
    return (
      (emp.employeeFullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterDepartment
        ? emp.role?.toLowerCase() === filterDepartment.toLowerCase()
        : true)
    );
  });

  if (!isAuthenticated) {
    return <Typography>No autorizado. Por favor, inicie sesión.</Typography>;
  }

  const getRoleLabel = (roleValue: string) => {
    const role = roles.find((item) => item.value === roleValue);
    return role ? role.label : roleValue;
  };

  return (
    <Dashboard navItems={navItems}>
      <Box p={3}>
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
                getEmployees({ setEmployees, handleSnackBar });
              }}
            >
              Recargar
            </Button>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenCreateModal(true)}
            >
              Agregar empleado
            </Button>
          </Stack>
        </Toolbar>

        <TableContainer component={Paper}>
          <Table
            sx={{
              "& .MuiTableCell-head": {
                backgroundColor: "#45b39d",
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "17px",
              },
              "& .MuiTableCell-body": {
                fontSize: "16px",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredEmployees.map((employee, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#ecf0f1",
                  }}
                >
                  <TableCell>{employee.employeeFullName}</TableCell>
                  <TableCell>{employee.username}</TableCell>
                  <TableCell>{employee.employeePhone}</TableCell>
                  <TableCell>{getRoleLabel(employee.role || "")}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setUsernameToEdit(employee.username || "");
                        setOpenEditModal(true);
                      }}
                      sx={{
                        "&:hover": { backgroundColor: "#d4e6f1" },
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setUsernameToDelete(employee.username || "");
                        setOpenDeleteDialog(true);
                      }}
                      sx={{
                        "&:hover": { backgroundColor: "#f2d7d5" },
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
          open={openCreateModal}
          handleClose={() => setOpenCreateModal(false)}
          refresh={refreshFetchEmployees}
          handleSnackBar={handleSnackBar}
        />

        <EditEmployeeModal
          open={openEditModal}
          handleClose={() => {
            setOpenEditModal(false);
            setUsernameToEdit("");
          }}
          handleSubmit={refreshFetchEmployees}
          usernameToEdit={usernameToEdit}
        />

        {/* Dialog para eliminar */}
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
            <Button
              color="error"
              onClick={() => {
                deleteEmployee({
                  usernameToDelete,
                  setOpenDeleteDialog,
                  setSnackbarOpen,
                  refreshFetchEmployees,
                });
              }}
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar de log */}
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
