import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import {
  formatDateTime,
  getTodayDate,
  isBeforeToday,
} from "../utils/dateUtils";

const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [newTask, setNewTask] = useState("");
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [newDetail, setNewDetail] = useState("");
  const [newAssignee, setNewAssignee] = useState("");
  const [lastCheckedDate, setLastCheckedDate] = useLocalStorage(
    "lastCheckedDate",
    null
  );

  // 날짜가 변경되었을 때 미완료 작업 이동
  useEffect(() => {
    const todayDate = getTodayDate();

    // 마지막 체크 날짜가 없거나 오늘과 다른 경우
    if (lastCheckedDate !== todayDate) {
      const updatedTasks = tasks.map((task) => {
        // 이전 날짜의 미완료 작업만 처리
        if (isBeforeToday(task.date) && task.status !== "completed") {
          return {
            ...task,
            date: todayDate,
            updateHistory: [
              ...task.updateHistory,
              {
                timestamp: new Date().toISOString(),
                type: "autoForward",
                content: `미완료로 인해 ${task.date}에서 ${todayDate}로 자동 이동되었습니다.`,
              },
            ],
          };
        }
        return task;
      });

      setTasks(updatedTasks);
      setLastCheckedDate(todayDate);
    }
  }, [tasks, lastCheckedDate, setLastCheckedDate, setTasks]);

  // 미완료 작업 수 계산
  const getUncompletedTasksCount = (date) => {
    const todayDate = getTodayDate();

    // 선택된 날짜가 오늘이 아니면 0 반환
    if (date !== todayDate) {
      return 0;
    }

    // 오늘 날짜인 경우에만 이전 날짜들의 미완료 작업 수를 계산
    return tasks.filter(
      (task) =>
        isBeforeToday(task.date) && // 오늘 이전의 날짜인지 확인
        task.status !== "completed" // 완료되지 않은 작업
    ).length;
  };

  // 날짜 선택 핸들러
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // 할일 확장/축소 핸들러
  const handleExpandClick = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
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

  // 필터링된 task 목록 가져오기
  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      if (task.status === "completed") {
        // 완료된 작업은 모든 날짜에 표시
        return true;
      }
      // 미완료 작업은 해당 날짜에만 표시
      return task.date === selectedDate;
    });
  };

  return {
    tasks: getFilteredTasks(),
    allTasks: tasks,
    selectedDate,
    setSelectedDate: handleDateChange,
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
    getUncompletedTasksCount,
  };
};

export default useTasks;
