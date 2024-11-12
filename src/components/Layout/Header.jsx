/* eslint-disable react/prop-types */
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const Header = ({ onMenuClick }) => {
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          할 일 관리
        </Typography>
        <Button component={RouterLink} to="/" color="inherit" sx={{ mr: 2 }}>
          할 일
        </Button>
        <Button component={RouterLink} to="/mychecklist/esg" color="inherit">
          ESG
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
