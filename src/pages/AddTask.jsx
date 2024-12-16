import React, { useState } from 'react';

const AddTask = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) return;

    addTask({ id: Date.now(), text: task });
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        className="border p-2"
        placeholder="gghgghgh"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-600 text-white">添加</button>
    </form>
  );
};

export default AddTask;
