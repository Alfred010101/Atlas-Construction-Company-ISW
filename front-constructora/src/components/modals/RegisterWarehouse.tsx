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
import { Warehouse as WarehouseFull } from "../../interfaces/models/Models";
import { Employee } from "../../interfaces/ModelsTypes";
import {
  validateAddress,
  validateFk,
  validateName,
} from "../../utils/validations";
import { saveWarehouse } from "../../request/Warehouse";

interface RegisterWarehouseModalProps {
  open: boolean;
  handleClose: () => void;
  refresh: () => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
}

const RegisterWarehouse = ({
  open,
  handleClose,
  refresh,
  handleSnackBar,
}: RegisterWarehouseModalProps) => {
  const [warehouseData, setWarehouseData] = useState<WarehouseFull>({
    name: "",
    fkSupervisor: 0,
    address: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    fkSupervisor: "",
    address: "",
  });

  const [supervisors, setSupervisors] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchSupervisors = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:8080/api/admin/v1/employees/getWarehouseSupervisors",
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
      fetchSupervisors();
    }
  }, [open]);

  // Validación en tiempo real
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setWarehouseData({
      ...warehouseData,
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
    }
  };

  // Validación en tiempo real
  const handleFkChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setWarehouseData({
      ...warehouseData,
      [name]: Number(value),
    });

    if (name === "fkSupervisor") {
      setErrors({
        ...errors,
        fkSupervisor: validateFk(Number(value)),
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(warehouseData.name),
      address: validateAddress(warehouseData.address),
      fkSupervisor: validateFk(warehouseData.fkSupervisor),
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

    saveWarehouse({
      refresh,
      handleClearFields,
      handleSnackBar,
      warehouseData,
    });
    handleClose();
  };

  const handleClearFields = () => {
    setWarehouseData({
      name: "",
      address: "",
      fkSupervisor: 0,
    });
    setErrors({
      name: "",
      address: "",
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
            Registrar Almacen
          </Typography>

          <TextField
            label="Nombre de proyecto"
            variant="standard"
            fullWidth
            name="name"
            value={warehouseData.name}
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
            value={warehouseData.address}
            onChange={handleChange}
            margin="normal"
            error={!!errors.address}
            helperText={errors.address}
          />

          <FormControl fullWidth margin="normal" error={!!errors.fkSupervisor}>
            <InputLabel>Supervisor</InputLabel>
            <Select
              label="Supervisor"
              variant="standard"
              value={String(warehouseData.fkSupervisor)}
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
};

export default RegisterWarehouse;
