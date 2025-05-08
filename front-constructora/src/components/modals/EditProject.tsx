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
  SelectChangeEvent,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Project as ProjectFull } from "../../interfaces/models/Models";
import { Customer, Employee } from "../../interfaces/ModelsTypes";
import {
  validateAddress,
  validateEndDate,
  validateFk,
  validateName,
  validateStartDate,
} from "../../utils/validations";
import { getProject, updateProject } from "../../request/Project";

interface EditProjectModalProps {
  open: boolean;
  projectId: number;
  handleClose: () => void;
  refresh: () => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
}

const EditProject = ({
  open,
  projectId,
  handleClose,
  refresh,
  handleSnackBar,
}: EditProjectModalProps) => {
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
        "http://localhost:8080/api/admin/v1/employees/getProjectSupervisors",
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

    if (projectId) {
      getProject({ projectId, setProjectData, handleSnackBar });
    }
    console.log(projectData);
  }, [projectId]);

  // Validación en tiempo real
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProjectData({
      ...projectData,
      [name]: value,
    });

    if (name === "name") {
      setErrors({
        ...errors,
        [name]: validateName(value),
      });
    } else if (name === "address") {
      setErrors({
        ...errors,
        [name]: validateAddress(value),
      });
    } else if (name === "startDate") {
      setErrors({
        ...errors,
        startDate: validateStartDate(value),
        endDate:
          projectData.endDate && validateEndDate(value, projectData.endDate),
      });
    } else if (name === "endDate") {
      setErrors({
        ...errors,
        [name]: validateEndDate(projectData.startDate, value),
      });
    }
  };

  // Validación en tiempo real
  const handleFkChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: Number(value),
    });

    if (name === "fkCustomer") {
      setErrors({
        ...errors,
        fkCustomer: validateFk(Number(value)),
      });
    } else if (name === "fkSupervisor") {
      setErrors({
        ...errors,
        fkSupervisor: validateFk(Number(value)),
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(projectData.name),
      fkCustomer: validateFk(projectData.fkCustomer),
      address: validateAddress(projectData.address),
      startDate: validateStartDate(projectData.startDate),
      endDate: validateEndDate(projectData.startDate, projectData.endDate),
      fkSupervisor: validateFk(projectData.fkSupervisor),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      handleSnackBar("Porfavor ingrese datos validos", "error");
      return;
    }

    updateProject({ refresh, projectId, handleSnackBar, projectData });
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
    <Modal
      open={open}
      onClose={() => {
        handleClearFields();
        handleClose();
      }}
    >
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
            Editar Proyecto
          </Typography>

          <FormControl fullWidth margin="normal" error={!!errors.fkCustomer}>
            <InputLabel>Cliente</InputLabel>
            <Select
              label="Cliente"
              variant="standard"
              value={String(projectData.fkCustomer)}
              onChange={handleFkChange}
              name="fkCustomer"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
              disabled
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
            {errors.fkCustomer && (
              <Typography variant="caption" color="error">
                {errors.fkCustomer}
              </Typography>
            )}
          </FormControl>

          <TextField
            label="Nombre de proyecto"
            variant="standard"
            fullWidth
            name="name"
            value={projectData.name}
            onChange={handleChange}
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />

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

          <FormControl fullWidth margin="normal" error={!!errors.fkSupervisor}>
            <InputLabel>Supervisor</InputLabel>
            <Select
              label="Supervisor"
              variant="standard"
              value={String(projectData.fkSupervisor)}
              onChange={handleFkChange}
              name="fkSupervisor"
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
            {errors.fkSupervisor && (
              <Typography variant="caption" color="error">
                {errors.fkSupervisor}
              </Typography>
            )}
          </FormControl>

          <Box display="flex" justifyContent="right" mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                handleClearFields();
                handleClose();
              }}
              sx={{ marginRight: 2 }}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Guardar Cambios
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProject;
