/* eslint-disable react/prop-types */
import { Box, TextField, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const TaskForm = ({
  selectedDate,
  onDateChange,
  newTask,
  onNewTaskChange,
  onTaskAdd,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onTaskAdd();
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          sx={{ width: 200 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 1 }}
      >
        <TextField
          fullWidth
          value={newTask}
          onChange={(e) => onNewTaskChange(e.target.value)}
          placeholder="새로운 할 일을 입력하세요"
          size="medium"
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ px: 3 }}
        >
          추가
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
