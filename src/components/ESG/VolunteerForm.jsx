/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const VolunteerForm = ({ categories, onSubmit, onAddCategory }) => {
  const [formData, setFormData] = useState({
    date: "",
    organization: "",
    expectedAttendees: "",
    activity: "",
    manager: "",
    notes: "",
    category: "",
  });
  const [isNewCategoryDialogOpen, setIsNewCategoryDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      date: "",
      organization: "",
      expectedAttendees: "",
      activity: "",
      manager: "",
      notes: "",
      category: "",
    });
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory("");
      setIsNewCategoryDialogOpen(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="날짜"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          InputLabelProps={{ shrink: true }}
          required
          sx={{ flex: 1 }}
        />
        <TextField
          label="기업/단체명"
          value={formData.organization}
          onChange={(e) =>
            setFormData({ ...formData, organization: e.target.value })
          }
          required
          sx={{ flex: 2 }}
        />
        <TextField
          label="예상 인원"
          type="number"
          value={formData.expectedAttendees}
          onChange={(e) =>
            setFormData({
              ...formData,
              expectedAttendees: Number(e.target.value),
            })
          }
          required
          sx={{ flex: 1 }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="활동 내용"
          value={formData.activity}
          onChange={(e) =>
            setFormData({ ...formData, activity: e.target.value })
          }
          required
          sx={{ flex: 2 }}
        />
        <TextField
          label="담당자"
          value={formData.manager}
          onChange={(e) =>
            setFormData({ ...formData, manager: e.target.value })
          }
          required
          sx={{ flex: 1 }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel>카테고리</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
            label="카테고리"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton
          onClick={() => setIsNewCategoryDialogOpen(true)}
          sx={{ mt: 1 }}
        >
          <AddIcon />
        </IconButton>
        <TextField
          label="기타 메모"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          multiline
          rows={2}
          sx={{ flex: 2 }}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        sx={{ alignSelf: "flex-end", mt: 2 }}
      >
        일정 등록
      </Button>

      <Dialog
        open={isNewCategoryDialogOpen}
        onClose={() => setIsNewCategoryDialogOpen(false)}
      >
        <DialogTitle>새 카테고리 추가</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="카테고리명"
            fullWidth
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsNewCategoryDialogOpen(false)}>
            취소
          </Button>
          <Button onClick={handleAddCategory}>추가</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VolunteerForm;
