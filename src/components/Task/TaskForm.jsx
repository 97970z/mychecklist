/* eslint-disable react/prop-types */
import { Box, TextField, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const TaskForm = ({
  selectedDate,
  onDateChange,
  newTask,
  onNewTaskChange,
  onTaskAdd,
  allTasks, // 전체 tasks 추가
}) => {
  // 현재 선택된 날짜의 미완료 작업 수 계산
  const getUncompletedTasksCount = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    return allTasks.filter(
      (task) =>
        task.date === selectedDate &&
        task.status !== "completed" &&
        selectedDate < currentDate
    ).length;
  };

  const uncompletedCount = getUncompletedTasksCount();

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
        {uncompletedCount > 0 && (
          <Typography color="warning.main">
            이전 날짜의 미완료 작업 {uncompletedCount}개가 있습니다.
          </Typography>
        )}
      </Box>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          onTaskAdd();
        }}
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
