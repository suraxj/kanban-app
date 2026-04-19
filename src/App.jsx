import React from 'react';
import { TaskProvider } from './context/TaskContext';
import KanbanBoard from './layout/KanbanBoard';

export default function App() {
  return (
    <TaskProvider>
      <KanbanBoard />
    </TaskProvider>
  );
}