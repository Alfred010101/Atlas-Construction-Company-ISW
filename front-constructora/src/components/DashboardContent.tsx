import { Box } from "@mui/material";
import { ReactNode } from "react";

interface DashboardContentProps {
  children: ReactNode;
}

const DashboardContent = ({ children }: DashboardContentProps) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        marginLeft: 0,
        transition: "margin 0.7s",
      }}
    >
      {children}
    </Box>
  );
};

export default DashboardContent;
