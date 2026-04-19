import React, { useState, useEffect, createContext, useContext } from 'react';

const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [draggedTaskId, setDraggedTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: Date.now()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id, updatedFields) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updatedFields } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, addTask, updateTask, deleteTask, moveTask,
      draggedTaskId, setDraggedTaskId
    }}>
      {children}
    </TaskContext.Provider>
  );
};