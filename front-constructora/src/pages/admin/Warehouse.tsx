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
import { getProjects } from "../../request/Project";
import { Project } from "../../interfaces/ModelsTypes";
import EditProjectModal from "../../components/modals/EditProject";
import RegisterWarehouseModel from "../../components/modals/RegisterWarehouse";

export default function Warehouse() {
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

  const [openEditModal, setOpenEditModal] = useState(false);
  const [idToEdit, setIdToEdit] = useState<number>(0);

  const handleSnackBar = (text: string, type: "success" | "error") => {
    setSnackbarMessage(text);
    setSnackbarSeverity(type);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    getProjects({ setProjects, handleSnackBar });
  }, []);

  const refreshFetchProjects = () => {
    getProjects({ setProjects });
  };

  const filteredProjects = projects.filter((proj) => {
    return (
      proj.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.projectAddress?.toLowerCase().includes(searchTerm.toLowerCase())
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
                getProjects({ setProjects, handleSnackBar });
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
                <TableCell>Supervisor</TableCell>
                <TableCell>Dirección</TableCell>
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
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell>{project.employeeFullName}</TableCell>
                  <TableCell>{project.projectAddress}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setIdToEdit(project.projectId || 0);
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

        <RegisterWarehouseModel
          open={openCreateModal}
          handleClose={() => setOpenCreateModal(false)}
          refresh={refreshFetchProjects}
          handleSnackBar={handleSnackBar}
        />

        <EditProjectModal
          open={openEditModal}
          handleClose={() => {
            setOpenEditModal(false);
            setIdToEdit(0);
          }}
          refresh={refreshFetchProjects}
          handleSnackBar={handleSnackBar}
          projectId={idToEdit}
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
