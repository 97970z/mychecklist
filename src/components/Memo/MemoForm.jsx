/* eslint-disable react/prop-types */
import { Box, TextField, Button } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

const MemoForm = ({ newMemo, onNewMemoChange, onMemoAdd }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onMemoAdd();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, mb: 2 }}
    >
      <TextField
        fullWidth
        size="small"
        multiline
        rows={3}
        value={newMemo}
        onChange={(e) => onNewMemoChange(e.target.value)}
        placeholder="새로운 메모를 입력하세요"
      />
      <Button
        type="submit"
        variant="contained"
        startIcon={<SaveIcon />}
        sx={{ minWidth: "80px" }}
      >
        저장
      </Button>
    </Box>
  );
};

export default MemoForm;
