import { Typography } from "@mui/material";
import DashboardLayout from "./../../components/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Typography variant="h4">
        Bienvenido al sistema de gestion <br></br>de recursos de la constructora
        Atlas
      </Typography>
      <Typography>
        Este es un diseño base con Material UI y TypeScript.
      </Typography>
    </DashboardLayout>
  );
}
