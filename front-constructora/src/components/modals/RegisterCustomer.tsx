import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Customer as CustomerFull } from "../../interfaces/models/Models";
import {
  validateAddress,
  validateName,
  validatePhoneMX,
} from "../../utils/validations";
import { saveCustomer } from "../../request/Customer";

interface RegisterCustomerModalProps {
  open: boolean;
  handleClose: () => void;
  refresh: () => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
}

export default function RegisterCustomer({
  open,
  handleClose,
  refresh,
  handleSnackBar,
}: RegisterCustomerModalProps) {
  const [customerData, setCustomerData] = useState<CustomerFull>({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });

  // Validación en tiempo real
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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
    }
  };

  const validateForm = () => {
    const newErrors = {
      firstName: validateName(customerData.firstName),
      lastName: validateName(customerData.lastName),
      address: validateAddress(customerData.address),
      phone: validatePhoneMX(customerData.phone),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    saveCustomer({ refresh, handleClearFields, handleSnackBar, customerData });

    handleClose();
  };

  const handleClearFields = () => {
    setCustomerData({
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
    });
    setErrors({
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
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
          width: 650,
        }}
      >
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <Typography variant="h6" mb={2} textAlign="center">
            Registrar Cliente
          </Typography>

          <TextField
            label="Nombre(s)"
            variant="standard"
            fullWidth
            name="firstName"
            value={customerData.firstName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName}
          />

          <TextField
            label="Apellido(s)"
            variant="standard"
            fullWidth
            name="lastName"
            value={customerData.lastName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName}
          />

          <TextField
            label="Dirección"
            variant="standard"
            fullWidth
            name="address"
            value={customerData.address}
            onChange={handleChange}
            margin="normal"
            error={!!errors.address}
            helperText={errors.address}
          />

          <TextField
            label="Teléfono (México)"
            variant="standard"
            fullWidth
            name="phone"
            value={customerData.phone}
            onChange={handleChange}
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone}
            placeholder="Ej. 5512345678"
          />

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
