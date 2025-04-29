import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
}

interface Supervisor {
  id: number;
  firstName: string;
  lastName: string;
}

interface RegisterProjectModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (text: string, type: "success" | "error") => void;
}

export default function RegisterProjectModal({
  open,
  handleClose,
  handleSubmit,
}: RegisterProjectModalProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [supervisorId, setSupervisorId] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:8080/api/v1/admin/customers/getCustomers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setCustomers(data.data);
    };

    const fetchSupervisors = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:8080/api/v1/admin/employees/getSupervisor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setSupervisors(data.data);
    };

    if (open) {
      fetchCustomers();
      fetchSupervisors();
    }
  }, [open]);

  const clearForm = () => {
    setName("");
    setAddress("");
    setStartDate("");
    setEndDate("");
    setCustomerId("");
    setSupervisorId("");
  };

  const submitProject = async () => {
    const token = localStorage.getItem("token");

    if (!address || !startDate || !endDate || !customerId || !supervisorId) {
      handleSubmit("Por favor completa todos los campos.", "error");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/admin/projects/registerProject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            address,
            startDate,
            endDate,
            fkCustomer: Number(customerId),
            fkSupervisor: Number(supervisorId),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al registrar el proyecto.");
      }

      handleSubmit("¡Proyecto registrado exitosamente!", "success");
      clearForm();
      handleClose();
    } catch (error) {
      console.error(error);
      handleSubmit("Error al registrar el proyecto.", "error");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Registrar Nuevo Proyecto</DialogTitle>

      <DialogContent>
        <form autoComplete="off">
          <Stack spacing={2} mt={1}>
            <FormControl fullWidth>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                label="Cliente"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {customers.map((cust) => (
                  <MenuItem key={cust.id} value={cust.id}>
                    {cust.firstName} {cust.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Nombre del Proyecto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              autoComplete="off"
            />

            <TextField
              label="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              autoComplete="off"
            />

            <TextField
              label="Fecha de Inicio"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              autoComplete="off"
            />

            <TextField
              label="Fecha de Finalización"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              autoComplete="off"
            />

            <FormControl fullWidth>
              <InputLabel>Supervisor</InputLabel>
              <Select
                value={supervisorId}
                onChange={(e) => setSupervisorId(e.target.value)}
                label="Supervisor"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {supervisors.map((sup) => (
                  <MenuItem key={sup.id} value={sup.id}>
                    {sup.firstName} {sup.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={clearForm} variant="outlined" color="secondary">
          Limpiar
        </Button>
        <Button onClick={submitProject} variant="contained" color="primary">
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
