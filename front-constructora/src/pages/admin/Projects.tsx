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
  Stack,
} from "@mui/material";
import { Add, Edit, Delete, Search, Refresh } from "@mui/icons-material";
import Dashboard from "../../components/Dashboard";
import { useMenuConfig } from "./menuConfig";
import { useAuth } from "../../context/AuthContext";
import RegisterProjectModal from "../../components/modals/RegisterProject";

interface Project {
  id: number;
  name: string;
  customerName: string;
  address: string;
  startDate: string;
  endDate: string;
  supervisorName: string;
}

export default function Projects() {
  const { navItems } = useMenuConfig();
  const { isAuthenticated } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const handleSnackBar = (text: string, type: "success" | "error") => {
    setSnackbarMessage(text);
    setSnackbarSeverity(type);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    //getProjects({ setProjects, handleSnackBar });
  }, []);

  const refreshFetchProjects = () => {
    //refreshProjects({ setProjects });
  };

  const filteredProjects = projects.filter((proj) => {
    return (
      proj.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.address?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (!isAuthenticated) {
    return <Typography>No autorizado. Por favor, inicie sesión.</Typography>;
  }

  return (
    <Dashboard navItems={navItems}>
      <Box p={3}>
        <Toolbar sx={{ justifyContent: "space-between", p: 0, mb: 2 }}>
          <Box display="flex" gap={2}>
            <TextField
              variant="outlined"
              placeholder="Buscar projecto..."
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
          </Box>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => {
                //getProjects({ setProjects, handleSnackBar });
              }}
            >
              Recargar
            </Button>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenCreateModal(true)}
            >
              Agregar proyecto
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
                <TableCell>Cliente</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Fecha Inicio</TableCell>
                <TableCell>Fecha Fin</TableCell>
                <TableCell>Supervisor</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredProjects.map((project, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#ecf0f1",
                  }}
                >
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.customerName}</TableCell>
                  <TableCell>{project.address}</TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.endDate}</TableCell>
                  <TableCell>{project.supervisorName}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        //setIDToEdit(customer.customerId || 0);
                        //setOpenEditModal(true);
                      }}
                      sx={{
                        "&:hover": { backgroundColor: "#d4e6f1" },
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
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

        <RegisterProjectModal
          open={openCreateModal}
          handleClose={() => setOpenCreateModal(false)}
          refresh={refreshFetchProjects}
          handleSnackBar={handleSnackBar}
        />

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
