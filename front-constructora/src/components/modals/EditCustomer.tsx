import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Customer } from "../../interfaces/ModelsTypes";
import { Customer as CustomerFull } from "../../interfaces/models/Models";
import { getCustomer, updateCustomer } from "../../request/Customer";
import {
  validateAddress,
  validateName,
  validatePhoneMX,
} from "../../utils/validations";

interface EditCustomerModalProps {
  open: boolean;
  customerId: number;
  handleClose: () => void;
  refresh: () => void;
  handleSnackBar: (text: string, type: "success" | "error") => void;
}

const EditCustomer = ({
  open,
  customerId,
  handleClose,
  refresh,
  handleSnackBar,
}: EditCustomerModalProps) => {
  const [customerData, setCustomerData] = useState<Customer>({
    customerFirstName: "",
    customerLastName: "",
    customerAddress: "",
    customerPhone: "",
  });

  const [errors, setErrors] = useState({
    customerFirstName: "",
    customerLastName: "",
    customerAddress: "",
    customerPhone: "",
  });

  useEffect(() => {
    if (customerId) {
      getCustomer({ customerId, setCustomerData, handleSnackBar });
    }
  }, [customerId]);

  // Validación en tiempo real
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCustomerData({
      ...customerData,
      [name]: value,
    });

    if (name === "customerFirstName" || name === "customerLastName") {
      setErrors({
        ...errors,
        [name]: validateName(value),
      });
    } else if (name === "customerAddress") {
      setErrors({
        ...errors,
        [name]: validateAddress(value),
      });
    } else if (name === "customerPhone") {
      setErrors({
        ...errors,
        [name]: validatePhoneMX(value),
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      customerFirstName: validateName(customerData.customerFirstName || ""),
      customerLastName: validateName(customerData.customerLastName || ""),
      customerAddress: validateAddress(customerData.customerAddress || ""),
      customerPhone: validatePhoneMX(customerData.customerPhone || ""),
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

    const payload: Partial<CustomerFull> = {
      firstName: customerData.customerFirstName,
      lastName: customerData.customerLastName,
      address: customerData.customerAddress,
      phone: customerData.customerPhone,
    };

    updateCustomer({ handleSnackBar, payload, customerId, refresh });
    handleClose();
  };

  const handleClearFields = () => {
    setCustomerData({
      customerFirstName: "",
      customerLastName: "",
      customerAddress: "",
      customerPhone: "",
    });
    setErrors({
      customerFirstName: "",
      customerLastName: "",
      customerAddress: "",
      customerPhone: "",
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
          width: 650,
        }}
      >
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <Typography variant="h6" mb={2} textAlign="center">
            Editar Cliente
          </Typography>

          <TextField
            label="Nombre(s)"
            variant="standard"
            fullWidth
            name="customerFirstName"
            value={customerData.customerFirstName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.customerFirstName}
            helperText={errors.customerFirstName}
          />

          <TextField
            label="Apellido(s)"
            variant="standard"
            fullWidth
            name="customerLastName"
            value={customerData.customerLastName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.customerLastName}
            helperText={errors.customerLastName}
          />

          <TextField
            label="Dirección"
            variant="standard"
            fullWidth
            name="customerAddress"
            value={customerData.customerAddress}
            onChange={handleChange}
            margin="normal"
            error={!!errors.customerAddress}
            helperText={errors.customerAddress}
          />

          <TextField
            label="Teléfono"
            variant="standard"
            fullWidth
            name="customerPhone"
            value={customerData.customerPhone}
            onChange={handleChange}
            margin="normal"
            error={!!errors.customerPhone}
            helperText={errors.customerPhone}
          />

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

export default EditCustomer;
