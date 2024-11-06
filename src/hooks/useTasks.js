import { useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { formatDateTime } from "../utils/dateUtils";

const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [newTask, setNewTask] = useState("");
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [newDetail, setNewDetail] = useState("");
  const [newAssignee, setNewAssignee] = useState("");

  const handleExpandClick = (taskId) => {
    setExpandedTaskId(taskId);
  };

  // 새 할일 추가
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      text: newTask,
      status: "todo",
      date: selectedDate,
      createdAt: new Date().toISOString(),
      details: [],
      assignee: "",
      updateHistory: [
        {
          timestamp: new Date().toISOString(),
          type: "created",
          content: "할 일이 생성되었습니다.",
        },
      ],
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  // 할일 상태 변경
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const statusText =
            newStatus === "todo"
              ? "할 일로 변경되었습니다."
              : newStatus === "inProgress"
              ? "진행 중으로 변경되었습니다."
              : "완료됨으로 변경되었습니다.";

          return {
            ...task,
            status: newStatus,
            updateHistory: [
              ...task.updateHistory,
              {
                timestamp: new Date().toISOString(),
                type: "status",
                content: statusText,
              },
            ],
          };
        }
        return task;
      })
    );
  };

  // 할일 삭제
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // 세부사항 추가
  const handleAddDetail = (taskId) => {
    if (!newDetail.trim()) return;

    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            details: [...task.details, newDetail],
            updateHistory: [
              ...task.updateHistory,
              {
                timestamp: new Date().toISOString(),
                type: "detail",
                content: "새로운 세부사항이 추가되었습니다: " + newDetail,
              },
            ],
          };
        }
        return task;
      })
    );
    setNewDetail("");
  };

  // 담당자 업데이트
  const handleUpdateAssignee = (taskId) => {
    if (!newAssignee.trim()) return;

    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            assignee: newAssignee,
            updateHistory: [
              ...task.updateHistory,
              {
                timestamp: new Date().toISOString(),
                type: "assignee",
                content: "담당자가 변경되었습니다: " + newAssignee,
              },
            ],
          };
        }
        return task;
      })
    );
    setNewAssignee("");
  };

  // 선택된 날짜의 할일 필터링
  const filteredTasks = tasks.filter((task) => task.date === selectedDate);

  return {
    tasks: filteredTasks,
    selectedDate,
    setSelectedDate,
    newTask,
    setNewTask,
    expandedTaskId,
    handleExpandClick,
    newDetail,
    setNewDetail,
    newAssignee,
    setNewAssignee,
    handleAddTask,
    handleStatusChange,
    handleDeleteTask,
    handleAddDetail,
    handleUpdateAssignee,
    formatDateTime,
  };
};

export default useTasks;
