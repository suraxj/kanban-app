import React from 'react';
import { GripVertical, Trash2 } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useTasks } from '../context/TaskContext';
import { PRIORITIES } from '../constants';

const TaskCard = ({ task, onOpenTask }) => {
  const { deleteTask } = useTasks();
  const priorityInfo = PRIORITIES[task.priority] || PRIORITIES['medium'];

  // Setup dnd-kit draggable hooks
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 999 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onOpenTask(task)}
      className="group relative bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col gap-3"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex gap-2">
          <GripVertical size={16} className="text-slate-300 shrink-0 mt-0.5" />
          <h4 className="font-bold text-slate-800 leading-snug line-clamp-2">{task.title}</h4>
        </div>
        
        {/* PointerDown propagation stopped to prevent dnd-kit from blocking the click */}
        <button 
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
          className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all shrink-0"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {task.description && (
        <p className="text-sm text-slate-500 line-clamp-2 pl-6">{task.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-2 pl-6 pt-2">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${priorityInfo.color}`}>
          {priorityInfo.label}
        </span>
        {task.tags && task.tags.slice(0, 2).map((tag, i) => (
          <span key={i} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;