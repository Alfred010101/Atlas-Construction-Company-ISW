import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";

interface EditCustomerModalProps {
  open: boolean;
  customerId: number | null;
  onClose: () => void;
  onSave: () => void;
}

export default function EditCustomer({
  open,
  customerId,
  onClose,
  onSave,
}: EditCustomerModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (customerId == null) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:8080/api/v1/admin/customers/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del cliente.");
        }

        const data = await response.json();

        console.log(data);
        setFirstName(data.data.firstName);
        setLastName(data.data.lastName);
        setAddress(data.data.address);
        setPhone(data.data.phone);
      } catch (error) {
        console.error("Error al obtener cliente:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchCustomer();
    }
  }, [customerId, open]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (customerId == null) return;

    try {
      const token = localStorage.getItem("token");

      const id = customerId;
      const response = await fetch(
        `http://localhost:8080/api/v1/admin/customers/updateCustomer`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            address,
            phone,
            id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el cliente.");
      }

      onSave(); // Para recargar tabla
      onClose();
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Cliente</DialogTitle>

      <DialogContent>
        {loading ? (
          <Stack alignItems="center" mt={4}>
            <CircularProgress />
          </Stack>
        ) : (
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
              <Button
                variant="outlined"
                color="secondary"
                onClick={onClose}
                sx={{ marginLeft: 2 }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Guardar cambios
              </Button>
            </DialogActions>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
