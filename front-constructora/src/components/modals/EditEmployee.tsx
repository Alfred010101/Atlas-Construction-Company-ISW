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
import { roles } from "./../../utils/varConst";

interface User {
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  phone: string;
  role: string;
}

interface EditEmployeeModalProps {
  open: boolean;
  usernameToEdit: string | null;
  handleClose: () => void;
  handleSubmit: (
    text: string,
    type: "success" | "error",
    refresh: boolean,
    visble: boolean
  ) => void;
}

const EditEmployee = ({
  open,
  usernameToEdit,
  handleClose,
  handleSubmit,
}: EditEmployeeModalProps) => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    if (usernameToEdit) {
      const token = localStorage.getItem("token");
      fetch(
        `http://localhost:8080/api/v1/admin/findUser/${encodeURIComponent(
          usernameToEdit
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
            password: "",
          });
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    }
  }, [usernameToEdit]);

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
      handleSubmit("Empleado actualizado exitosamente!", "success", true, true);
      handleClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
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
        <form onSubmit={handleSave} autoComplete="off">
          <Typography variant="h6" mb={2} textAlign="center">
            Editar Usuario
          </Typography>

          <TextField
            label="Correo Electrónico"
            variant="standard"
            fullWidth
            name="username"
            value={user.username}
            margin="normal"
            disabled
          />

          <TextField
            label="Nombre(s)"
            variant="standard"
            fullWidth
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            label="Apellido(s)"
            variant="standard"
            fullWidth
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            label="Contraseña"
            variant="standard"
            fullWidth
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            margin="normal"
            helperText="Deja vacío si no deseas cambiarla"
          />

          <TextField
            label="Teléfono"
            variant="standard"
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
              variant="standard"
              onChange={handleRoleChange}
              name="role"
            >
              {roles.map((role) => (
                <MenuItem
                  key={role.value}
                  value={role.value}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#CCC",
                    },
                  }}
                >
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display="flex" justifyContent="right" mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              sx={{ marginRight: 2 }}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Guardar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditEmployee;
