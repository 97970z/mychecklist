// /* eslint-disable react/prop-types */
// import React from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Chip,
//   Collapse,
//   ListItem,
//   Divider,
// } from "@mui/material";
// import {
//   ExpandMore as ExpandMoreIcon,
//   ExpandLess as ExpandLessIcon,
//   RadioButtonUnchecked as RadioButtonUncheckedIcon,
//   AccessTime as AccessTimeIcon,
//   CheckCircle as CheckCircleIcon,
//   Delete as DeleteIcon,
//   Person as PersonIcon,
// } from "@mui/icons-material";
// import TaskDetail from "./TaskDetail";

// const TaskItem = ({
//   task,
//   status,
//   isExpanded,
//   onExpandClick,
//   onStatusChange,
//   onDelete,
//   taskDetailProps,
// }) => {
//   // taskId를 이용한 핸들러 생성
//   const handleAssigneeUpdate = () => taskDetailProps.onAssigneeUpdate(task.id);
//   const handleDetailAdd = () => taskDetailProps.onDetailAdd(task.id);

//   return (
//     <React.Fragment>
//       <ListItem
//         sx={{
//           flexDirection: "column",
//           alignItems: "stretch",
//           "&:hover": {
//             bgcolor: "action.hover",
//           },
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//             mb: 1,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1, flex: 1 }}>
//             <Typography>{task.text}</Typography>
//             {task.assignee && (
//               <Chip
//                 icon={<PersonIcon />}
//                 label={task.assignee}
//                 size="small"
//                 variant="outlined"
//                 sx={{ ml: 1 }}
//               />
//             )}
//           </Box>
//           <Box>
//             <IconButton size="small" onClick={onExpandClick} sx={{ mr: 1 }}>
//               {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//             </IconButton>
//             {status !== "todo" && (
//               <IconButton
//                 size="small"
//                 onClick={() => onStatusChange("todo")}
//                 sx={{ mr: 1 }}
//               >
//                 <RadioButtonUncheckedIcon color="primary" />
//               </IconButton>
//             )}
//             {status !== "inProgress" && (
//               <IconButton
//                 size="small"
//                 onClick={() => onStatusChange("inProgress")}
//                 sx={{ mr: 1 }}
//               >
//                 <AccessTimeIcon color="warning" />
//               </IconButton>
//             )}
//             {status !== "completed" && (
//               <IconButton
//                 size="small"
//                 onClick={() => onStatusChange("completed")}
//                 sx={{ mr: 1 }}
//               >
//                 <CheckCircleIcon color="success" />
//               </IconButton>
//             )}
//             <IconButton size="small" onClick={onDelete} sx={{ mr: 1 }}>
//               <DeleteIcon color="error" />
//             </IconButton>
//           </Box>
//         </Box>

//         <Collapse in={isExpanded} timeout="auto" unmountOnExit>
//           <TaskDetail
//             task={task}
//             newAssignee={taskDetailProps.newAssignee}
//             onNewAssigneeChange={taskDetailProps.onNewAssigneeChange}
//             onAssigneeUpdate={handleAssigneeUpdate}
//             newDetail={taskDetailProps.newDetail}
//             onNewDetailChange={taskDetailProps.onNewDetailChange}
//             onDetailAdd={handleDetailAdd}
//             formatDateTime={taskDetailProps.formatDateTime}
//           />
//         </Collapse>
//       </ListItem>
//       <Divider />
//     </React.Fragment>
//   );
// };

// export default TaskItem;

/* eslint-disable react/prop-types */
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Collapse,
  ListItem,
  Divider,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import TaskDetail from "./TaskDetail";

const TaskItem = ({
  task,
  status,
  isExpanded,
  onExpandClick,
  onStatusChange,
  onDelete,
  taskDetailProps,
}) => {
  const handleAssigneeUpdate = () => taskDetailProps.onAssigneeUpdate(task.id);
  const handleDetailAdd = () => taskDetailProps.onDetailAdd(task.id);

  return (
    <React.Fragment>
      <ListItem
        sx={{
          flexDirection: "column",
          alignItems: "stretch",
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              flex: 1,
              flexDirection: "column",
            }}
          >
            <Typography>{task.text}</Typography>
            {task.status === "completed" && (
              <Typography variant="caption" color="text.secondary">
                생성일: {new Date(task.date).toLocaleDateString()}
              </Typography>
            )}
            {task.assignee && (
              <Chip
                icon={<PersonIcon />}
                label={task.assignee}
                size="small"
                variant="outlined"
                sx={{ mt: 0.5 }}
              />
            )}
          </Box>
          <Box>
            <IconButton size="small" onClick={onExpandClick} sx={{ mr: 1 }}>
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            {status !== "todo" && (
              <IconButton
                size="small"
                onClick={() => onStatusChange("todo")}
                sx={{ mr: 1 }}
              >
                <RadioButtonUncheckedIcon color="primary" />
              </IconButton>
            )}
            {status !== "inProgress" && (
              <IconButton
                size="small"
                onClick={() => onStatusChange("inProgress")}
                sx={{ mr: 1 }}
              >
                <AccessTimeIcon color="warning" />
              </IconButton>
            )}
            {status !== "completed" && (
              <IconButton
                size="small"
                onClick={() => onStatusChange("completed")}
                sx={{ mr: 1 }}
              >
                <CheckCircleIcon color="success" />
              </IconButton>
            )}
            <IconButton size="small" onClick={onDelete} sx={{ mr: 1 }}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        </Box>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <TaskDetail
            task={task}
            newAssignee={taskDetailProps.newAssignee}
            onNewAssigneeChange={taskDetailProps.onNewAssigneeChange}
            onAssigneeUpdate={handleAssigneeUpdate}
            newDetail={taskDetailProps.newDetail}
            onNewDetailChange={taskDetailProps.onNewDetailChange}
            onDetailAdd={handleDetailAdd}
            formatDateTime={taskDetailProps.formatDateTime}
          />
        </Collapse>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

export default TaskItem;
