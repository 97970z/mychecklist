/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import TaskColumn from "./TaskColumn";

const COLUMN_CONFIG = [
  { title: "할 일", status: "todo", color: "#1976d2" },
  { title: "진행 중", status: "inProgress", color: "#ed6c02" },
  { title: "완료", status: "completed", color: "#2e7d32" },
];

const TaskBoard = ({
  tasks,
  expandedTaskId,
  onExpandClick,
  onStatusChange,
  onDelete,
  taskDetailProps,
}) => {
  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  // 확장/축소 토글 핸들러 추가
  const handleExpandToggle = (taskId) => {
    if (expandedTaskId === taskId) {
      onExpandClick(null); // 같은 task를 클릭하면 축소
    } else {
      onExpandClick(taskId); // 다른 task를 클릭하면 확장
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        overflow: "auto",
        pb: 2,
        "&::-webkit-scrollbar": {
          height: 8,
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "background.paper",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "grey.400",
          borderRadius: 4,
        },
      }}
    >
      {COLUMN_CONFIG.map(({ title, status, color }) => (
        <TaskColumn
          key={status}
          title={title}
          tasks={getTasksByStatus(status)}
          status={status}
          color={color}
          expandedTaskId={expandedTaskId}
          onExpandClick={handleExpandToggle}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          taskDetailProps={taskDetailProps}
        />
      ))}
    </Box>
  );
};

export default TaskBoard;
