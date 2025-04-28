import { Typography } from "@mui/material";
import DashboardLayout from "./../../components/DashboardLayout";
import { useMenuConfig } from "./../../pages/admin/menuConfig";

const Projects = () => {
  const { navItems } = useMenuConfig();
  return (
    <DashboardLayout navItems={navItems}>
      <Typography variant="h4">Projects</Typography>
    </DashboardLayout>
  );
};

export default Projects;
