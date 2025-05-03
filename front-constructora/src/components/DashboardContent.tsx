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
        marginTop: 5,
        flexGrow: 1,
        marginLeft: 0,
        transition: "margin 0.7s",
      }}
    >
      {children}
    </Box>
  );
};

export default DashboardContent;
