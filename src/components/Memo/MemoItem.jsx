/* eslint-disable react/prop-types */
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Note as NoteIcon, Delete as DeleteIcon } from "@mui/icons-material";

const MemoItem = ({ memo, onDelete }) => {
  return (
    <ListItem
      sx={{ bgcolor: "background.paper", mb: 1, borderRadius: 1 }}
      secondaryAction={
        <IconButton edge="end" onClick={() => onDelete(memo.id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemIcon>
        <NoteIcon />
      </ListItemIcon>
      <ListItemText
        primary={memo.text}
        secondary={new Date(memo.createdAt).toLocaleString()}
        sx={{
          "& .MuiListItemText-primary": {
            wordBreak: "break-all",
          },
        }}
      />
    </ListItem>
  );
};

export default MemoItem;
