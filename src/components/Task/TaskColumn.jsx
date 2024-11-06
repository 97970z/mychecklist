/* eslint-disable react/prop-types */
import { Box, Paper, Typography, List, Divider } from "@mui/material";
import TaskItem from "./TaskItem";

const TaskColumn = ({
  title,
  tasks,
  status,
  color,
  onStatusChange,
  onDelete,
  expandedTaskId,
  onExpandClick,
  taskDetailProps,
}) => {
  return (
    <Box flex={1} minWidth={350} mx={1}>
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          backgroundColor: "background.paper",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={{ bgcolor: color, p: 2, color: "white" }}>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              status={status}
              isExpanded={expandedTaskId === task.id}
              onExpandClick={() => onExpandClick(task.id)}
              onStatusChange={(newStatus) => onStatusChange(task.id, newStatus)}
              onDelete={() => onDelete(task.id)}
              taskDetailProps={taskDetailProps}
            />
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default TaskColumn;
