import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  phone: string;
  role: string;
}

interface EditUserModalProps {
  open: boolean;
  emailToEdit: string | null;
  onClose: () => void;
  onSave: () => void;
}

const roles = [
  "SYS_ADMIN",
  "RESOURCE_MANAGER",
  "CONSTRUCTION_SUPERVISOR",
  "WAREHOUSE_SUPERVISOR",
  "CEO",
];

export default function EditUserModal({
  open,
  emailToEdit,
  onClose,
  onSave,
}: EditUserModalProps) {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    if (emailToEdit) {
      const token = localStorage.getItem("token");
      fetch(
        `http://localhost:8080/api/v1/admin/findUser/${encodeURIComponent(
          emailToEdit
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setUser({
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            username: data.data.username,
            phone: data.data.phone,
            role: data.data.role,
            password: "", // vacío para que no aparezca nada
          });
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }
  }, [emailToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    setUser((prev) => ({ ...prev, role: e.target.value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const payload: Partial<User> = {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
    };

    if (user.password && user.password.trim() !== "") {
      payload.password = user.password;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/admin/updateUser/${encodeURIComponent(
          user.username
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating user");
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          width: 650,
        }}
      >
        <Typography variant="h6" mb={2} textAlign="center">
          Editar Usuario
        </Typography>

        <TextField
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          name="username"
          value={user.username}
          margin="normal"
          disabled
        />

        <TextField
          label="Nombre(s)"
          variant="outlined"
          fullWidth
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          label="Apellido(s)"
          variant="outlined"
          fullWidth
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          label="Teléfono"
          variant="outlined"
          fullWidth
          name="phone"
          value={user.phone}
          onChange={handleChange}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Rol</InputLabel>
          <Select
            label="Rol"
            value={user.role}
            onChange={handleRoleChange}
            name="role"
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Contraseña"
          variant="outlined"
          fullWidth
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          margin="normal"
          helperText="Deja vacío si no deseas cambiarla"
        />

        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
            sx={{ marginLeft: 2 }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
