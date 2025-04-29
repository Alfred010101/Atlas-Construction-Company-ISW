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

const Projects = () => {
  const { navItems } = useMenuConfig();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const { isAuthenticated } = useAuth();

  const fetchProjects = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token no disponible.");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/v1/admin/projects/allProjects",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener proyectos.");
      }

      const data = await response.json();

      const projectsData = data.data.map((project: any) => ({
        id: project.id,
        name: project.name,
        customerName: project.customerName,
        address: project.address,
        startDate: project.startDate,
        endDate: project.endDate,
        supervisorName: project.supervisorName,
      }));

      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error; // Important to propagate to handle in refresh
    }
  }, []);

  const refreshFetchProjects = async (
    text: string,
    type: "success" | "error"
  ) => {
    try {
      await fetchProjects();
      setSnackbarMessage(text);
      setSnackbarSeverity(type);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error al cargar proyectos");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    refreshFetchProjects("Proyectos cargados exitosamente!", "success");
  }, [fetchProjects]);

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
        <Typography variant="h4" mb={3} align="center">
          Gestión de Proyectos
        </Typography>

        <Toolbar sx={{ justifyContent: "space-between", p: 0, mb: 2 }}>
          <Box display="flex" gap={2}>
            <TextField
              variant="outlined"
              placeholder="Buscar proyecto..."
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
              onClick={() =>
                refreshFetchProjects(
                  "Proyectos recargados exitosamente!",
                  "success"
                )
              }
            >
              Recargar
            </Button>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Agregar proyecto
            </Button>
          </Stack>
        </Toolbar>

        <TableContainer component={Paper}>
          <Table>
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
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.customerName}</TableCell>
                  <TableCell>{project.address}</TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.endDate}</TableCell>
                  <TableCell>{project.supervisorName}</TableCell>
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

        <RegisterProjectModal
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          handleSubmit={() =>
            refreshFetchProjects("Proyecto agregado!", "success")
          }
        />

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
};

export default Projects;
