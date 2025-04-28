import { Typography } from "@mui/material";
import DashboardLayout from "./../../components/Dashboard";
import { useMenuConfig } from "./menuConfig";

const Projects = () => {
  const { navItems } = useMenuConfig();
  return (
    <DashboardLayout navItems={navItems}>
      <Typography variant="h4">Projects</Typography>
    </DashboardLayout>
  );
};

export default Projects;
