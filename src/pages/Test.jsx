import { Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment"; // Import moment.js

const EditTask = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const navigate = useNavigate();

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Update localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: tasks.length + 1, // Generate unique id based on the length
        title: newTask,
        createdAt: moment().toISOString(), // Save the current timestamp
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask(""); // Clear input
    }
  };

  const handleEditTask = (id) => {
    navigate(`/update-task/${id}`); // Navigate to UpdateTask page with id in URL
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex items-center justify-center bg-slate-100 mt-10">
      <div className="flex flex-col w-[40%] justify-center gap-4 p-2">
        <div>
          <h1 className="text-center text-gray-600 text-4xl font-bold">Task Tracker</h1>
        </div>

        {/* Add task section */}
        <div className="flex gap-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Write a task"
            className="border border-gray-400 w-[70%] px-3 py-1 bg-gray-100 focus:bg-white outline-none transition-all p-3 rounded-lg"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-700 w-[30%] p-1 text-white text-2xl hover:bg-blue-800 transition-all font-serif justify-center flex items-center rounded-sm gap-2 focus:ring-blue-600"
          >
            <Plus size={20} color="white" />
            Add
          </button>
        </div>

        {/* Display list of tasks */}
        <div className="mt-4">
          {tasks.length === 0 ? (
            <div className="border border-gray-400 h-12 flex items-center justify-center mt-5">
              <h1>No tasks available</h1>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="border border-gray-400 h-16 flex items-center justify-between mt-5"
              >
                <div className="ml-4">
                  <h1>{task.title}</h1>
                  {/* Display formatted timestamp using Moment.js */}
                  <p className="text-gray-500 text-sm">{moment(task.createdAt).fromNow()}</p>
                </div>
                <div className="flex mr-4 gap-4">
                  <div
                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                    onClick={() => handleEditTask(task.id)}
                  >
                    Edit
                  </div>
                  <Trash2
                    className="cursor-pointer text-red-700 hover:text-red-900"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTask;
