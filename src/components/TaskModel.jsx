import React, { useState, useEffect } from 'react';
import { Tag as TagIcon, Edit2, Trash2 } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { STATUSES, PRIORITIES } from '../constants';
import Model from './Model';

const TaskModel = ({ isOpen, onClose, task = null, defaultStatus = 'todo' }) => {
  const { addTask, updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(!task);
  
  const [formData, setFormData] = useState({
    title: '', description: '', status: defaultStatus, priority: 'medium', tags: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (task) {
        setFormData({
          title: task.title, description: task.description, status: task.status,
          priority: task.priority || 'medium', tags: task.tags ? task.tags.join(', ') : ''
        });
        setIsEditing(false);
      } else {
        setFormData({
          title: '', description: '', status: defaultStatus, priority: 'medium', tags: ''
        });
        setIsEditing(true);
      }
    }
  }, [isOpen, task, defaultStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const formattedData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    if (task) {
      updateTask(task.id, formattedData);
      setIsEditing(false);
    } else {
      addTask(formattedData);
      onClose();
    }
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Model isOpen={isOpen} onClose={onClose} title={task ? (isEditing ? 'Edit Task' : 'Task Details') : 'Create New Task'}>
      {!isEditing && task ? (
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800">{task.title}</h3>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setIsEditing(true)} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                  <Edit2 size={18} />
                </button>
                <button onClick={handleDelete} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${PRIORITIES[task.priority]?.color}`}>
                {PRIORITIES[task.priority]?.label} Priority
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 bg-slate-100 text-slate-700`}>
                {STATUSES[task.status]?.label}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 `min-h-[100px]`">
            <p className="text-slate-700 whitespace-pre-wrap">{task.description || <span className="italic text-slate-400">No description provided.</span>}</p>
          </div>

          {task.tags && task.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-500 mb-2 flex items-center gap-1.5"><TagIcon size={14}/> Tags</h4>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-md shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Task Title *</label>
            <input
              type="text" required autoFocus
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
            <textarea
              rows="4" value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                {Object.entries(STATUSES).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Priority</label>
              <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                {Object.entries(PRIORITIES).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tags (comma separated)</label>
            <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none" />
          </div>
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 border-t border-slate-100 pt-4">
            <button type="button" onClick={() => task ? setIsEditing(false) : onClose()} className="w-full sm:w-auto px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg shadow-sm transition-colors">{task ? 'Save Changes' : 'Create Task'}</button>
          </div>
        </form>
      )}
    </Model>
  );
};

export default TaskModel;