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
import Dashboard from "./../../components/Dashboard";
import { useMenuConfig } from "./menuConfig";
import { useAuth } from "../../context/AuthContext";
import RegisterCustomerModal from "../../components/modals/RegisterCustomer"; // <- este lo haremos ahorita

interface Customer {
  id: number;
  name: string;
  address: string;
  phone: string;
}

const Customers = () => {
  const { navItems } = useMenuConfig();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const { isAuthenticated } = useAuth();

  const fetchCustomers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token no disponible.");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/v1/admin/customers/allCustomers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los clientes.");
      }

      const data = await response.json();

      const customersData = data.data.map((customer: any) => ({
        id: customer.id,
        name: `${customer.firstName} ${customer.lastName}`,
        address: customer.address,
        phone: customer.phone,
      }));

      setCustomers(customersData);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
    refreshFetchCustomers("Clientes cargados exitosamente!", "success");
  }, [fetchCustomers]);

  const refreshFetchCustomers = (text: string, type: "success" | "error") => {
    fetchCustomers();
    setSnackbarMessage(text);
    setSnackbarSeverity(type);
  };

  const filteredCustomers = customers.filter((cust) => {
    return cust.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!isAuthenticated) {
    return <Typography>No autorizado. Por favor, inicie sesión.</Typography>;
  }

  return (
    <Dashboard navItems={navItems}>
      <Box p={3}>
        <Typography variant="h4" mb={3} align="center">
          Gestión de Clientes
        </Typography>

        <Toolbar sx={{ justifyContent: "space-between", p: 0, mb: 2 }}>
          <Box display="flex" gap={2}>
            <TextField
              variant="outlined"
              placeholder="Buscar cliente..."
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
                refreshFetchCustomers(
                  "Clientes recargados exitosamente!",
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
              Agregar cliente
            </Button>
          </Stack>
        </Toolbar>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredCustomers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
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

        <RegisterCustomerModal
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          handleSubmit={refreshFetchCustomers}
        />

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
};

export default Customers;
