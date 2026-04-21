import React from 'react';
import { Plus } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { useTasks } from '../context/TaskContext';
import TaskCard from './TaskCard';

const BoardColumn = ({ statusId, statusConfig, onOpenTask, onAddTask }) => {
  const { tasks } = useTasks();
  const columnTasks = tasks.filter(t => t.status === statusId);
  const Icon = statusConfig.icon;

  const { setNodeRef, isOver } = useDroppable({
    id: statusId,
  });

  return (
    <div className="flex flex-col w-full md:flex-1 md:min-w-[280px] md:max-w-[400px] shrink-0 md:h-full">
      <div className={`mb-3 flex items-center justify-between p-3 rounded-xl border ${statusConfig.bg} ${statusConfig.border}`}>
        <div className="flex items-center gap-2 font-bold text-slate-700">
          <Icon size={18} className={statusConfig.color} />
          {statusConfig.label}
          <span className="ml-2 px-2 py-0.5 bg-white rounded-full text-xs text-slate-500 shadow-sm border border-slate-200">
            {columnTasks.length}
          </span>
        </div>
        <button onClick={() => onAddTask(statusId)} className="p-1 hover:bg-white/50 rounded-md text-slate-500 transition-colors">
          <Plus size={18} />
        </button>
      </div>

      <div 
        ref={setNodeRef}
        className={`md:flex-1 min-h-[120px] overflow-y-auto rounded-xl p-3 flex flex-col gap-3 transition-colors border-2 ${
          isOver ? 'bg-blue-50/50 border-blue-300 border-dashed' : 'bg-slate-100 border-transparent'
        }`}
      >
        {columnTasks.map(task => (
          <TaskCard key={task.id} task={task} onOpenTask={onOpenTask} />
        ))}
        {columnTasks.length === 0 && !isOver && (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-sm">
            Drag a task here or click + to add.
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardColumn;