/* eslint-disable react/prop-types */
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const TaskDetail = ({
  task,
  newAssignee,
  onNewAssigneeChange,
  onAssigneeUpdate,
  newDetail,
  onNewDetailChange,
  onDetailAdd,
  formatDateTime,
}) => {
  return (
    <Box sx={{ p: 2, bgcolor: "action.hover", borderRadius: 1, mt: 1 }}>
      {/* 담당자 섹션 */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
        담당자
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          size="small"
          fullWidth
          value={newAssignee}
          onChange={(e) => onNewAssigneeChange(e.target.value)}
          placeholder="담당자 이름"
        />
        <Button variant="contained" onClick={onAssigneeUpdate} size="small">
          저장
        </Button>
      </Box>

      {/* 세부사항 섹션 */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
        세부사항
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          size="small"
          fullWidth
          value={newDetail}
          onChange={(e) => onNewDetailChange(e.target.value)}
          placeholder="새로운 세부사항"
        />
        <Button
          variant="contained"
          onClick={onDetailAdd}
          size="small"
          color="primary"
        >
          추가
        </Button>
      </Box>

      {/* 세부사항 목록 */}
      {task.details.length > 0 && (
        <List
          dense
          sx={{ bgcolor: "background.paper", borderRadius: 1, mb: 2 }}
        >
          {task.details.map((detail, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={detail}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "0.9rem",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* 업데이트 내역 */}
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
        업데이트 내역
      </Typography>
      <List dense sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
        {task.updateHistory.map((update, index) => (
          <ListItem key={index}>
            <ListItemText
              secondary={`${formatDateTime(update.timestamp)} - ${
                update.content
              }`}
              sx={{
                "& .MuiListItemText-secondary": {
                  fontSize: "0.8rem",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskDetail;
