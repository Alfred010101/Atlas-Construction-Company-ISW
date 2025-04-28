import { Typography } from "@mui/material";
import Dashboard from "./../../components/Dashboard";
import { useMenuConfig } from "./menuConfig";

const Warehouse = () => {
  const { navItems } = useMenuConfig();
  return (
    <Dashboard navItems={navItems}>
      <Typography variant="h4">Warehouse</Typography>
    </Dashboard>
  );
};

export default Warehouse;
