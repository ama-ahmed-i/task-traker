import { Box, Edit, Plus, Trash2 } from "lucide-react";
import moment from "moment";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditTask = () => {

  // const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")?localStorage.getItem("tasks"):[])||[]);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (e) {
        console.error("Error parsing tasks from localStorage", e);
        return [];
      }
    }
    return [];
  });
  const [newTask, setNewTask] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    if (tasks.length >= 0) {
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
      setTasks([newTaskObj, ...tasks]);
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
    <main className="min-h-screen pt-10 flex flex-col items-center w-full px-4 bg-gray-100">
      <div className="flex flex-col w-full justify-center gap-4 p-4 items-center">
        
          <h1 className="text-lg sm:text-4xl text-gray-800 font-bold py-10 text-center">Task Tracker</h1>
      

        {/* Add task section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full max-w-xl">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Write a task"
            className=" w-[80%] sm:w-full bg-transparent flex-1 border border-gray-400 py-2 px-4 rounded-md outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-300"
          />
          <button
            onClick={handleAddTask}
            className="flex items-center w-[80%] sm:w-[20%] justify-center bg-blue-700 px-4 py-2 text-white rounded-lg hover:bg-blue-800 transition focus:ring-1 focus:ring-offset-1 focus:ring-blue-300"
          >
            <Plus size={20} color="white" />
            Add
          </button>
        </div>

        {/* Display list of tasks */}
        <div className="mt-4 w-full sm:w-[36rem]">
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
                    className="cursor-pointer text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 100" width="250" height="100">
  <style>
    {`
      .letter {
        fill: none;
        stroke-width: 2;
        stroke-dasharray: 100;  /* Adjusted to match each letter's length */
        stroke-dashoffset: 100;
        animation: draw 1.5s forwards, colorChange 1.5s forwards, repeatAnimation 3s infinite;
      }

      .letter:nth-child(2) {
        stroke: #eb6207;
        animation-delay: 1.5s;
      }

      .letter:nth-child(3) {
        stroke: #0233d6;
        animation-delay: 3s;
      }

      .letter:nth-child(4) {
        stroke: #660366;
        animation-delay: 4.5s;
      }

      @keyframes draw {
        0% {
          stroke-dashoffset: 100;
        }
        100% {
          stroke-dashoffset: 0;
        }
      }

      /* Adding color change animation */
      @keyframes colorChange {
        0% {
          stroke: #eb6207; /* Start with black */
        }
        100% {
          stroke: currentColor; /* Use the initial stroke color */
        }
      }

      /* Repeat animation: To make the stroke-dash and color change loop */
      @keyframes repeatAnimation {
        0% {
          stroke-dashoffset: 100;
          stroke: #eb6207;
        }
        50% {
          stroke-dashoffset: 0;
          stroke: #0233d6;  /* Animated color */
        }
        100% {
          stroke-dashoffset: 100;
          stroke: #660366;  /* Reset to black */
        }
      }
    `}
  </style>

  {/* Letters adjusted without space between them */}
  <text x="10" y="40" className="letter" font-family="Arial" font-size="40">
    A
  </text>
  <text x="35" y="40" className="letter" font-family="Arial" font-size="40">
    S
  </text>
  <text x="60" y="40" className="letter" font-family="Arial" font-size="40">
    T
  </text>
</svg>


      </div>
    </main>
  );
};

export default EditTask;
