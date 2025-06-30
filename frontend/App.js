import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('/api/tasks').then((res) => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios.post('/api/tasks', { description }).then((res) => {
      setTasks([...tasks, res.data]);
      setDescription('');
    });
  };

  const deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>To-do List</h1>
      <input value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={addTask}>Adicionar</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.description} <button onClick={() => deleteTask(task.id)}>X</button></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
