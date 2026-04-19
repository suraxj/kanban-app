import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export const STATUSES = {
  'todo': { label: 'To Do', icon: AlertCircle, color: 'text-slate-500', bg: 'bg-slate-100', border: 'border-slate-200' },
  'in-progress': { label: 'In Progress', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
  'done': { label: 'Done', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200' }
};

export const PRIORITIES = {
  'low': { label: 'Low', color: 'bg-blue-100 text-blue-700' },
  'medium': { label: 'Medium', color: 'bg-amber-100 text-amber-700' },
  'high': { label: 'High', color: 'bg-red-100 text-red-700' }
};