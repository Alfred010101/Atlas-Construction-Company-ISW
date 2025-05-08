import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Supplier as SupplierFull } from "../../interfaces/models/Models";
import {
  validateAddress,
  validateName,
  validatePhoneMX,
} from "../../utils/validations";

interface RegisterCustomerModalProps {
  open: boolean;
  handleClose: () => void;
  refresh: () => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
}

const RegisterSupplier = ({
  open,
  handleClose,
  refresh,
  handleSnackBar,
}: RegisterCustomerModalProps) => {
  const [supplierData, setSupplierData] = useState<SupplierFull>({
    name: "",
    address: "",
    phone: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phone: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  // Validación en tiempo real
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSupplierData({
      ...supplierData,
      [name]: value,
    });

    if (name === "name" || name === "contactName" || name === "contactEmail") {
      setErrors({
        ...errors,
        [name]: validateName(value),
      });
    } else if (name === "address") {
      setErrors({
        ...errors,
        [name]: validateAddress(value),
      });
    } else if (name === "phone" || name === "contactPhone") {
      setErrors({
        ...errors,
        [name]: validatePhoneMX(value),
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(supplierData.name),
      address: validateAddress(supplierData.address),
      phone: validatePhoneMX(supplierData.phone),
      contactName: validateName(supplierData.contactName),
      contactEmail: validateName(supplierData.contactEmail),
      contactPhone: validatePhoneMX(supplierData.contactPhone),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    //saveCustomer({ refresh, handleClearFields, handleSnackBar, customerData });

    handleClose();
  };

  const handleClearFields = () => {
    setSupplierData({
      name: "",
      address: "",
      phone: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
    });
    setErrors({
      name: "",
      address: "",
      phone: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
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
            label="Nombre del proveedor"
            variant="standard"
            fullWidth
            name="name"
            value={supplierData.name}
            onChange={handleChange}
            margin="normal"
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Dirección del provedor"
            variant="standard"
            fullWidth
            name="address"
            value={supplierData.address}
            onChange={handleChange}
            margin="normal"
            error={!!errors.address}
            helperText={errors.address}
          />

          <TextField
            label="Teléfono del proveedor(México)"
            variant="standard"
            fullWidth
            name="phone"
            value={supplierData.phone}
            onChange={handleChange}
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone}
            placeholder="Ej. 5512345678"
          />

          <TextField
            label="Nombre del contacto"
            variant="standard"
            fullWidth
            name="contactName"
            value={supplierData.contactName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.contactName}
            helperText={errors.contactName}
          />

          <TextField
            label="Email del contacto"
            variant="standard"
            fullWidth
            name="contactEmail"
            value={supplierData.contactEmail}
            onChange={handleChange}
            margin="normal"
            error={!!errors.contactEmail}
            helperText={errors.contactEmail}
          />

          <TextField
            label="Teléfono del contacto(México)"
            variant="standard"
            fullWidth
            name="contactPhone"
            value={supplierData.contactPhone}
            onChange={handleChange}
            margin="normal"
            error={!!errors.contactPhone}
            helperText={errors.contactPhone}
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
};

export default RegisterSupplier;
