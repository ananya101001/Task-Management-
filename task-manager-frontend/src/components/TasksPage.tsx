import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TasksPage.css';

interface Task {
  id: number;
  title: string;
  description: string;
  is_complete: boolean;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
  
      const response = await axios.get('http://localhost:5001/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Tasks:', response.data);  // Check the response here
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  

  useEffect(() => {
    console.log('fetching task')
    fetchTasks();
  }, []);

  // Create or Update Task
  const handleSaveTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      if (editingTask) {
        // Update Task
        await axios.put(`${process.env.REACT_APP_API_URL}/api/tasks/${editingTask.id}`, {
          title: editingTask.title,
          description: editingTask.description,
          is_complete: editingTask.is_complete,
        }, { headers });
        setEditingTask(null);
      } else {
        // Create Task
        await axios.post(`${process.env.REACT_APP_API_URL}/api/tasks`, newTask, { headers });
      }

      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  // Delete Task
  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle Task Edit
  const handleEdit = (task: Task) => {
    console.log(task)
    setEditingTask(task);
  };

  return (
    <div className="tasks-container">
      <h1>Task Manager</h1>

      {/* Task Form */}
      <div className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={editingTask ? editingTask.title : newTask.title}
          onChange={(e) =>
            editingTask
              ? setEditingTask({ ...editingTask, title: e.target.value })
              : setNewTask({ ...newTask, title: e.target.value })
          }
        />
        <textarea
          placeholder="Task Description"
          value={editingTask ? editingTask.description : newTask.description}
          onChange={(e) =>
            editingTask
              ? setEditingTask({ ...editingTask, description: e.target.value })
              : setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <button onClick={handleSaveTask}>
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.is_complete ? 'completed' : ''}`}>
            <div className="task-info">
              <input
                type="checkbox"
                checked={task.is_complete}
                onChange={() =>
                  handleEdit({ ...task, is_complete: !task.is_complete })
                }
              />
              <div>
                <strong>{task.title}</strong>
                <p>{task.description}</p>
              </div>
            </div>
            <div className="task-actions">
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
