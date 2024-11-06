/* eslint-disable react/prop-types */
// import {
//   Drawer,
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Divider,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
// } from "@mui/material";
// import {
//   Note as NoteIcon,
//   Save as SaveIcon,
//   Delete as DeleteIcon,
// } from "@mui/icons-material";

// const DRAWER_WIDTH = 300;

// const SideMenu = ({
//   isOpen,
//   onClose,
//   memos = [],
//   newMemo = "",
//   onNewMemoChange,
//   onMemoAdd,
//   onMemoDelete,
// }) => {
//   return (
//     <Drawer
//       anchor="left"
//       open={isOpen}
//       onClose={onClose}
//       sx={{
//         width: DRAWER_WIDTH,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: DRAWER_WIDTH,
//           boxSizing: "border-box",
//         },
//       }}
//     >
//       <Box sx={{ p: 2 }}>
//         <Typography variant="h6" sx={{ mb: 2 }}>
//           메모장
//         </Typography>
//         <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//           <TextField
//             fullWidth
//             size="small"
//             multiline
//             rows={3}
//             value={newMemo}
//             onChange={(e) => onNewMemoChange(e.target.value)}
//             placeholder="새로운 메모를 입력하세요"
//           />
//           <Button
//             variant="contained"
//             onClick={onMemoAdd}
//             startIcon={<SaveIcon />}
//             sx={{ minWidth: "80px" }}
//           >
//             저장
//           </Button>
//         </Box>
//         <Divider sx={{ my: 2 }} />
//         <List>
//           {memos.map((memo) => (
//             <ListItem
//               key={memo.id}
//               secondaryAction={
//                 <IconButton edge="end" onClick={() => onMemoDelete(memo.id)}>
//                   <DeleteIcon />
//                 </IconButton>
//               }
//               sx={{ bgcolor: "background.paper", mb: 1, borderRadius: 1 }}
//             >
//               <ListItemIcon>
//                 <NoteIcon />
//               </ListItemIcon>
//               <ListItemText
//                 primary={memo.text}
//                 secondary={new Date(memo.createdAt).toLocaleString()}
//               />
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Drawer>
//   );
// };

// export default SideMenu;

import { Drawer } from "@mui/material";
import MemoContainer from "../Memo/MemoContainer";

const DRAWER_WIDTH = 300;

const SideMenu = ({
  isOpen,
  onClose,
  memos,
  newMemo,
  onNewMemoChange,
  onMemoAdd,
  onMemoDelete,
}) => {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <MemoContainer
        memos={memos}
        newMemo={newMemo}
        onNewMemoChange={onNewMemoChange}
        onMemoAdd={onMemoAdd}
        onMemoDelete={onMemoDelete}
      />
    </Drawer>
  );
};

export default SideMenu;
