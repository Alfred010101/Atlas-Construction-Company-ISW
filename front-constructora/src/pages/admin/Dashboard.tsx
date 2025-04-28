import { Typography } from "@mui/material";
import DashboardLayout from "./../../components/DashboardLayout";
import { useMenuConfig } from "./menuConfig";
export default function Dashboard() {
  const { navItems } = useMenuConfig();
  return (
    <DashboardLayout navItems={navItems}>
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
