import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskTitle, setTaskTitle] = useState("");


  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    const taskToEdit = savedTasks?.find((task) => task.id === parseInt(id));
    if (taskToEdit) {
      setTaskTitle(taskToEdit.title);
    }
  }, [id]);

  const handleUpdateTask = () => {
    if (taskTitle.trim()) {
      const savedTasks = JSON.parse(localStorage.getItem("tasks"));
      const updatedTasks = savedTasks.map((task) =>
        task.id === parseInt(id) ? { ...task, title: taskTitle } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      navigate("/"); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-10 flex flex-col items-center p-2 sm:px-4">
      <div className="flex flex-col w-[90%] sm:w-[35%] justify-center gap-4 p-2">
        <h1 className="text-center text-4xl font-bold">Edit Task</h1>
        <div className="flex flex-col gap-4 w-full">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Update task title"
            className="bg-transparent border-[1px] border-gray-400 py-3 px-4 rounded-md w-full outline-none mb-4"
          />
          <button
            onClick={handleUpdateTask}
            className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 transition"
          >
            Save change
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
