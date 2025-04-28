import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";

interface RegisterCustomerModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (text: string, type: "success" | "error") => void;
}

export default function RegisterCustomer({
  open,
  handleClose,
  handleSubmit,
}: RegisterCustomerModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setAddress("");
    setPhone("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token no disponible.");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/v1/admin/customers/registerCustomer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            address,
            phone,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al registrar el cliente.");
      }

      resetForm();
      handleSubmit("Cliente registrado exitosamente!", "success");
      handleClose();
    } catch (error) {
      console.error("Error al registrar cliente:", error);
      handleSubmit("Error al registrar el cliente.", "error");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Registrar Cliente</DialogTitle>

      <DialogContent>
        <form onSubmit={onSubmit} autoComplete="off">
          <Stack spacing={2} mt={1}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="off"
            />

            <TextField
              label="Apellido"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="off"
            />

            <TextField
              label="Dirección"
              variant="outlined"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              autoComplete="off"
            />

            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="off"
            />
          </Stack>

          <DialogActions sx={{ mt: 2 }}>
            <Button onClick={resetForm} color="secondary" type="button">
              Limpiar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Registrar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
