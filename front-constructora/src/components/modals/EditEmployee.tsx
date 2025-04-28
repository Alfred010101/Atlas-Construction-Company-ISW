// components/modals/EditEmployee.tsx
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

interface EditEmployeeProps {
  open: boolean;
  handleClose: () => void;
}

const EditEmployee = ({ open, handleClose }: EditEmployeeProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Editar Empleado</DialogTitle>
      <DialogContent>
        <TextField label="Nombre" fullWidth />
        <TextField label="Puesto" fullWidth sx={{ mt: 2 }} />
        <TextField label="Departamento" fullWidth sx={{ mt: 2 }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployee;
