import Layout from "./components/Layout/Layout";
import TaskForm from "./components/Task/TaskForm";
import TaskBoard from "./components/Task/TaskBoard";
import useTasks from "./hooks/useTasks";
import useMemos from "./hooks/useMemos";
import useDrawer from "./hooks/useDrawer";

const App = () => {
  const {
    tasks,
    allTasks,
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
    getUncompletedTasksCount,
  } = useTasks();

  const { memos, newMemo, setNewMemo, handleAddMemo, handleDeleteMemo } =
    useMemos();

  const {
    isOpen: isDrawerOpen,
    handleToggle: handleDrawerToggle,
    handleClose: handleDrawerClose,
  } = useDrawer();

  const taskDetailProps = {
    newAssignee,
    onNewAssigneeChange: setNewAssignee,
    onAssigneeUpdate: handleUpdateAssignee,
    newDetail,
    onNewDetailChange: setNewDetail,
    onDetailAdd: handleAddDetail,
    formatDateTime,
  };

  return (
    <Layout
      isDrawerOpen={isDrawerOpen}
      onDrawerToggle={handleDrawerToggle}
      onDrawerClose={handleDrawerClose}
      memos={memos}
      newMemo={newMemo}
      onNewMemoChange={setNewMemo}
      onMemoAdd={handleAddMemo}
      onMemoDelete={handleDeleteMemo}
    >
      <TaskForm
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        newTask={newTask}
        onNewTaskChange={setNewTask}
        onTaskAdd={handleAddTask}
        allTasks={allTasks}
        getUncompletedTasksCount={getUncompletedTasksCount} // 함수 전달
      />
      <TaskBoard
        tasks={tasks}
        expandedTaskId={expandedTaskId}
        onExpandClick={handleExpandClick}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteTask}
        taskDetailProps={taskDetailProps}
      />
    </Layout>
  );
};

export default App;
