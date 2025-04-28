import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
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
} from "@mui/material";
import { Add, Edit, Delete, Search } from "@mui/icons-material";
import Dashboard from "./../../components/Dashboard";
import { useMenuConfig } from "./menuConfig";

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Juan Pérez",
    position: "Ingeniero Civil",
    department: "Obras",
  },
  {
    id: 2,
    name: "Ana Gómez",
    position: "Contadora",
    department: "Administración",
  },
  {
    id: 1,
    name: "Juan Pérez Diaz",
    position: "Ingeniero Civil",
    department: "S",
  },
];

export default function Employees() {
  const { navItems } = useMenuConfig();
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const filteredEmployees = employees.filter((emp) => {
    return (
      (emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterDepartment ? emp.department === filterDepartment : true)
    );
  });

  return (
    <Dashboard navItems={navItems}>
      <Box p={3}>
        <Typography variant="h4" mb={3}>
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
              <MenuItem value="Obras">Obras</MenuItem>
              <MenuItem value="Administración">Administración</MenuItem>
            </Select>
          </Box>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Agregar empleado
          </Button>
        </Toolbar>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Puesto</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal para agregar empleados */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Agregar Nuevo Empleado</DialogTitle>
          <DialogContent>
            {/* Aquí luego pondrías los campos de formulario */}
            <Typography>Formulario de registro aquí...</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button variant="contained" onClick={() => setOpenDialog(false)}>
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Dashboard>
  );
}
