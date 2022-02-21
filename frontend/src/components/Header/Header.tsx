import React from "react";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

const Header: React.VFC = () => {
  return (
    <AppBar position="static" sx={{ mb: "1rem" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Kanji Visualizer
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
