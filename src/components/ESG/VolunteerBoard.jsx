/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  PendingActions as PendingIcon,
} from "@mui/icons-material";
import { VOLUNTEER_STATUS } from "../../utils/volunteerConstants";

const VolunteerBoard = ({
  volunteers,
  categories,
  onStatusChange,
  onUpdate,
  onDelete,
  dateFilter,
  categoryFilter,
  statusFilter,
  onDateFilterChange,
  onCategoryFilterChange,
  onStatusFilterChange,
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [completionDialogOpen, setCompletionDialogOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [actualAttendees, setActualAttendees] = useState("");

  const handleEditClick = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setEditForm({ ...volunteer });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = () => {
    onUpdate(selectedVolunteer.id, editForm);
    setEditDialogOpen(false);
  };

  const handleStatusChange = (volunteer, newStatus) => {
    if (newStatus === VOLUNTEER_STATUS.COMPLETED) {
      setSelectedVolunteer(volunteer);
      setCompletionDialogOpen(true);
    } else {
      onStatusChange(volunteer.id, newStatus);
    }
  };

  const handleCompletionSubmit = () => {
    onStatusChange(
      selectedVolunteer.id,
      VOLUNTEER_STATUS.COMPLETED,
      Number(actualAttendees)
    );
    setCompletionDialogOpen(false);
    setActualAttendees("");
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case VOLUNTEER_STATUS.PENDING:
        return "warning";
      case VOLUNTEER_STATUS.CONFIRMED:
        return "info";
      case VOLUNTEER_STATUS.COMPLETED:
        return "success";
      default:
        return "default";
    }
  };

  const getStatusChipText = (status) => {
    switch (status) {
      case VOLUNTEER_STATUS.PENDING:
        return "예정";
      case VOLUNTEER_STATUS.CONFIRMED:
        return "확정";
      case VOLUNTEER_STATUS.COMPLETED:
        return "완료";
      default:
        return "";
    }
  };

  // 필터 컴포넌트
  const FilterControls = () => (
    <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
      <TextField
        type="date"
        label="날짜 필터"
        value={dateFilter}
        onChange={(e) => onDateFilterChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>카테고리 필터</InputLabel>
        <Select
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          label="카테고리 필터"
        >
          <MenuItem value="">전체</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>상태 필터</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          label="상태 필터"
        >
          <MenuItem value="">전체</MenuItem>
          <MenuItem value={VOLUNTEER_STATUS.PENDING}>예정</MenuItem>
          <MenuItem value={VOLUNTEER_STATUS.CONFIRMED}>확정</MenuItem>
          <MenuItem value={VOLUNTEER_STATUS.COMPLETED}>완료</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={() => {
          onDateFilterChange("");
          onCategoryFilterChange("");
          onStatusFilterChange("");
        }}
        variant="outlined"
      >
        필터 초기화
      </Button>
    </Box>
  );

  const columns = [
    {
      status: VOLUNTEER_STATUS.PENDING,
      title: "예정",
      icon: <PendingIcon />,
      color: "#ffa726", // orange
    },
    {
      status: VOLUNTEER_STATUS.CONFIRMED,
      title: "확정",
      icon: <ScheduleIcon />,
      color: "#42a5f5", // blue
    },
    {
      status: VOLUNTEER_STATUS.COMPLETED,
      title: "완료",
      icon: <CheckCircleIcon />,
      color: "#66bb6a", // green
    },
  ];

  return (
    <Box>
      <FilterControls />
      <Box sx={{ display: "flex", gap: 2, height: "calc(100vh - 300px)" }}>
        {columns.map(({ status, title, icon, color }) => (
          <Paper
            key={status}
            elevation={3}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              minWidth: 350,
            }}
          >
            <Box sx={{ p: 2, bgcolor: color, color: "white" }}>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {icon} {title}
              </Typography>
            </Box>

            <List sx={{ flex: 1, overflow: "auto", p: 2 }}>
              {volunteers
                .filter((v) => v.status === status)
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((volunteer) => (
                  <ListItem
                    key={volunteer.id}
                    sx={{
                      display: "block",
                      p: 0,
                      mb: 2,
                    }}
                  >
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight="bold">
                          {volunteer.organization}
                        </Typography>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => handleEditClick(volunteer)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => onDelete(volunteer.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mb: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Chip
                          label={`${new Date(
                            volunteer.date
                          ).toLocaleDateString()}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={volunteer.category}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                        <Chip
                          label={getStatusChipText(volunteer.status)}
                          size="small"
                          color={getStatusChipColor(volunteer.status)}
                        />
                        <Chip
                          label={`예상 ${volunteer.expectedAttendees}명`}
                          size="small"
                          color="default"
                          variant="outlined"
                        />
                        {volunteer.actualAttendees && (
                          <Chip
                            label={`실제 ${volunteer.actualAttendees}명`}
                            size="small"
                            color="success"
                            variant="outlined"
                          />
                        )}
                      </Box>

                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {volunteer.activity}
                      </Typography>

                      {volunteer.notes && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          메모: {volunteer.notes}
                        </Typography>
                      )}

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          담당자: {volunteer.manager}
                        </Typography>
                        <Box>
                          {Object.values(VOLUNTEER_STATUS)
                            .filter((s) => s !== status)
                            .map((s) => (
                              <Button
                                key={s}
                                size="small"
                                onClick={() => handleStatusChange(volunteer, s)}
                                sx={{ ml: 1 }}
                              >
                                {getStatusChipText(s)}
                              </Button>
                            ))}
                        </Box>
                      </Box>
                    </Paper>
                  </ListItem>
                ))}
            </List>
          </Paper>
        ))}

        {/* 수정 다이얼로그 */}
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>봉사활동 정보 수정</DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}
            >
              <TextField
                label="날짜"
                type="date"
                value={editForm.date || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, date: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                label="기업/단체명"
                value={editForm.organization || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, organization: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="예상 인원"
                type="number"
                value={editForm.expectedAttendees || ""}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    expectedAttendees: Number(e.target.value),
                  })
                }
                fullWidth
              />
              <TextField
                label="활동 내용"
                value={editForm.activity || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, activity: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="담당자"
                value={editForm.manager || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, manager: e.target.value })
                }
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>카테고리</InputLabel>
                <Select
                  value={editForm.category || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  label="카테고리"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="기타 메모"
                value={editForm.notes || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, notes: e.target.value })
                }
                multiline
                rows={2}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>취소</Button>
            <Button onClick={handleEditSubmit} variant="contained">
              수정
            </Button>
          </DialogActions>
        </Dialog>

        {/* 완료 처리 다이얼로그 */}
        <Dialog
          open={completionDialogOpen}
          onClose={() => setCompletionDialogOpen(false)}
        >
          <DialogTitle>실제 참석 인원</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="실제 참석 인원"
              type="number"
              fullWidth
              value={actualAttendees}
              onChange={(e) => setActualAttendees(e.target.value)}
              helperText={
                selectedVolunteer
                  ? `예상 인원: ${selectedVolunteer.expectedAttendees}명`
                  : ""
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCompletionDialogOpen(false)}>취소</Button>
            <Button onClick={handleCompletionSubmit} variant="contained">
              완료
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default VolunteerBoard;
