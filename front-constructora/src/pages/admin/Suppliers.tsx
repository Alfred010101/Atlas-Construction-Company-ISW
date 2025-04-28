import { Typography } from "@mui/material";
import Dashboard from "./../../components/Dashboard";
import { useMenuConfig } from "./menuConfig";

const Suppliers = () => {
  const { navItems } = useMenuConfig();
  return (
    <Dashboard navItems={navItems}>
      <Typography variant="h4">Suppliers</Typography>
    </Dashboard>
  );
};

export default Suppliers;
