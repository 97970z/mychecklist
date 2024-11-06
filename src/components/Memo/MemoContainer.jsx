/* eslint-disable react/prop-types */
import { Box, Typography, Divider } from "@mui/material";
import MemoForm from "./MemoForm";
import MemoList from "./MemoList";

const MemoContainer = ({
  memos,
  newMemo,
  onNewMemoChange,
  onMemoAdd,
  onMemoDelete,
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        메모장
      </Typography>
      <MemoForm
        newMemo={newMemo}
        onNewMemoChange={onNewMemoChange}
        onMemoAdd={onMemoAdd}
      />
      <Divider sx={{ my: 2 }} />
      <MemoList memos={memos} onMemoDelete={onMemoDelete} />
    </Box>
  );
};

export default MemoContainer;
