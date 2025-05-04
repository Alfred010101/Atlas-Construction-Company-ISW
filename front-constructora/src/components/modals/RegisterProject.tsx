import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  SelectChangeEvent,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Project as ProjectFull } from "../../interfaces/models/Models";
import { Customer, Employee } from "../../interfaces/ModelsTypes";

interface RegisterProjectModalProps {
  open: boolean;
  handleClose: () => void;
  refresh: () => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
}

export default function RegisterProjectModal({
  open,
  handleClose,
  refresh,
  handleSnackBar,
}: RegisterProjectModalProps) {
  const [projectData, setProjectData] = useState<ProjectFull>({
    name: "",
    fkCustomer: 0,
    address: "",
    startDate: "",
    endDate: "",
    fkSupervisor: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    fkCustomer: "",
    address: "",
    startDate: "",
    endDate: "",
    fkSupervisor: "",
  });

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [supervisors, setSupervisors] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:8080/api/admin/v1/customers/getCustomers",
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
        "http://localhost:8080/api/admin/v1/employees/getSupervisors",
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

  // Validación en tiempo real
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* const { name, value } = e.target;
  
      setCustomerData({
        ...customerData,
        [name]: value,
      });
  
      if (name === "firstName" || name === "lastName") {
        setErrors({
          ...errors,
          [name]: validateName(value),
        });
      } else if (name === "address") {
        setErrors({
          ...errors,
          [name]: validateAddress(value),
        });
      } else if (name === "phone") {
        setErrors({
          ...errors,
          [name]: validatePhoneMX(value),
        });
      }*/
  };

  // Validación en tiempo real
  const handleCustomerChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });

    setErrors({
      ...errors,
      // fkCustomer: validateRole(value),
    });
  };

  // Validación en tiempo real
  const handleSupervisorChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });

    setErrors({
      ...errors,
      // fkCustomer: validateRole(value),
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /*if (!validateForm()) {
      return;
    }

    saveCustomer({ refresh, handleClearFields, handleSnackBar, customerData });
*/
    handleClose();
  };

  const handleClearFields = () => {
    setProjectData({
      name: "",
      fkCustomer: 0,
      address: "",
      startDate: "",
      endDate: "",
      fkSupervisor: 0,
    });
    setErrors({
      name: "",
      fkCustomer: "",
      address: "",
      startDate: "",
      endDate: "",
      fkSupervisor: "",
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 5,
          width: 400,
        }}
      >
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <Typography variant="h6" mb={2} textAlign="center">
            Registrar Proyecto
          </Typography>

          <FormControl fullWidth margin="normal" error={!!errors.fkCustomer}>
            <InputLabel>Cliente</InputLabel>
            <Select
              label="Cliente"
              variant="standard"
              value={String(projectData.fkCustomer)}
              onChange={handleCustomerChange}
              name="fkCustomer"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              {customers.map((cust) => (
                <MenuItem
                  key={cust.customerId}
                  value={cust.customerId}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#CCC",
                    },
                  }}
                >
                  {cust.customerFullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Dirección"
            variant="standard"
            fullWidth
            name="address"
            value={projectData.address}
            onChange={handleChange}
            margin="normal"
            error={!!errors.address}
            helperText={errors.address}
          />

          <TextField
            label="Fecha de Inicio"
            type="date"
            variant="standard"
            fullWidth
            name="startDate"
            value={projectData.startDate}
            onChange={handleChange}
            margin="normal"
            error={!!errors.startDate}
            helperText={errors.startDate}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Fecha de Finalización"
            type="date"
            variant="standard"
            fullWidth
            name="endDate"
            value={projectData.endDate}
            onChange={handleChange}
            margin="normal"
            error={!!errors.endDate}
            helperText={errors.endDate}
            InputLabelProps={{ shrink: true }}
          />

          <FormControl fullWidth>
            <InputLabel>Supervisor</InputLabel>
            <Select
              label="Supervisor"
              variant="standard"
              value={String(projectData.fkSupervisor)}
              onChange={handleSupervisorChange}
              name="fkEmployee"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              {supervisors.map((sup) => (
                <MenuItem key={sup.employeeId} value={sup.employeeId}>
                  {sup.employeeFullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box display="flex" justifyContent="right" mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearFields}
              sx={{ marginRight: 2 }}
            >
              Limpiar Campos
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Registrar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
