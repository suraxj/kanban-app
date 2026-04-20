import React, { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import BoardColumn from '../components/BoardColumn';
import TaskModel from '../components/TaskModel';
import { useTasks } from '../context/TaskContext';
import { STATUSES } from '../constants';

const KanbanBoard = () => {
  const { moveTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultStatusForNew, setDefaultStatusForNew] = useState('todo');

  const handleOpenNewTask = (statusId = 'todo') => {
    setSelectedTask(null);
    setDefaultStatusForNew(statusId);
    setIsModalOpen(true);
  };

  const handleOpenTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Handles the dnd-kit drop event logic
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    // If we dropped over a valid column ID that exists
    if (over && STATUSES[over.id]) {
      const taskId = active.id;
      const newStatusId = over.id;
      moveTask(taskId, newStatusId);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
            <Calendar size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">KanBan Board</h1>
        </div>
        <button 
          onClick={() => handleOpenNewTask()}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={18} /> <span className="hidden sm:inline">Add Task</span>
        </button>
      </header>

      <main className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="h-full p-6 flex gap-6 items-start">
          
          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            {Object.entries(STATUSES).map(([statusId, config]) => (
              <BoardColumn 
                key={statusId}
                statusId={statusId}
                statusConfig={config}
                onOpenTask={handleOpenTask}
                onAddTask={handleOpenNewTask}
              />
            ))}
          </DndContext>
        </div>
      </main>

      <TaskModel 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        task={selectedTask}
        defaultStatus={defaultStatusForNew}
      />
    </div>
  );
};

export default KanbanBoard;