export const DRAWER_WIDTH = 300;

export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "inProgress",
  COMPLETED: "completed",
};

export const TASK_COLUMNS = [
  {
    title: "할 일",
    status: TASK_STATUS.TODO,
    color: "#1976d2",
  },
  {
    title: "진행 중",
    status: TASK_STATUS.IN_PROGRESS,
    color: "#ed6c02",
  },
  {
    title: "완료",
    status: TASK_STATUS.COMPLETED,
    color: "#2e7d32",
  },
];

export const UPDATE_TYPES = {
  CREATED: "created",
  STATUS: "status",
  DETAIL: "detail",
  ASSIGNEE: "assignee",
};

// src/utils/taskUtils.js
export const createTask = (text, date) => ({
  id: Date.now(),
  text,
  status: TASK_STATUS.TODO,
  date,
  createdAt: new Date().toISOString(),
  details: [],
  assignee: "",
  updateHistory: [
    {
      timestamp: new Date().toISOString(),
      type: UPDATE_TYPES.CREATED,
      content: "할 일이 생성되었습니다.",
    },
  ],
});

export const createUpdateEntry = (type, content) => ({
  timestamp: new Date().toISOString(),
  type,
  content,
});
