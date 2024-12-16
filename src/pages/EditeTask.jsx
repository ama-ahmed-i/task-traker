import { Box, Edit, Plus, Trash2 } from "lucide-react";
import moment from "moment";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditTask = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: tasks.length + 1, 
        title: newTask,
          createdAt: moment().toISOString(),
      };
      setTasks([newTaskObj,...tasks]);
      setNewTask(""); 
    }
  };

  const handleEditTask = (id) => {
    navigate(`/update-task/${id}`);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen pt-10 flex flex-col items-center w-full px-4 bg-gray-100">
      <div className="flex flex-col w-full justify-center gap-4 p-2 items-center">
        <div>
          <h1 className="text-4xl text-gray-800 font-bold py-10 text-center">Task Tracker</h1>
        </div>

        {/* Add task section */}
        <div className="flex items-center gap-4 mb-6 w-full max-w-xl">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Write a task"
            className="bg-transparent flex-1 border border-gray-400 py-2 px-4 rounded-md outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-300"
          />
          <button
            onClick={handleAddTask}
            className="flex items-center bg-blue-700 px-4 py-2 text-white rounded-lg hover:bg-blue-800 transition focus:ring-1 focus:ring-offset-1 focus:ring-blue-300"
          >
            <Plus size={20} color="white" />
            Add
          </button>
        </div>

        {/* Display list of tasks */}
        <div className="mt-4 w-[36rem]">
          {tasks.length === 0 ? (
            <div className="  flex flex-col items-center justify-center mt-5 gap-6">
             <Box className="w-10 h-10 text-gray-600"/>

              <h1 >No Tasks Yet!</h1>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="border border-gray-300 rounded-lg  h-16 bg-white flex items-center justify-between mb-4"
              >
                <div>
                <h1 className="ml-4">{task.title}</h1>
                <p className="text-gray-500 text-sm ml-4">{moment(task.createdAt).format('Do MM YYYY')}</p>
                </div>

                <div className="flex mr-4 gap-4">
                  <div
                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                    onClick={() => handleEditTask(task.id)}
                  >
                    <Edit/>
                    
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
