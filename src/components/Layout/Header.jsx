/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Database } from "lucide-react";
import { Menu as MenuIcon } from "@mui/icons-material";
import StorageMonitor from "../StorageMonitor/StorageMonitor";

const Header = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
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
          <IconButton color="inherit" onClick={() => setOpen(true)}>
            <Database size={20} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            bgcolor: "background.default",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <StorageMonitor />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
