import { Typography } from "@mui/material";
import Dashboard from "./../../components/Dashboard";
import { useMenuConfig } from "./menuConfig";

const Stock = () => {
  const { navItems } = useMenuConfig();
  return (
    <Dashboard navItems={navItems}>
      <Typography variant="h4">Stock</Typography>
    </Dashboard>
  );
};

export default Stock;
