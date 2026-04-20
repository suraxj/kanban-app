import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export const STATUSES = {
  'todo': { label: 'To Do', icon: AlertCircle  },
  'in-progress': { label: 'In Progress', icon: Clock },
  'done': { label: 'Done', icon: CheckCircle2  }
};

export const PRIORITIES = {
  'low': { label: 'Low', color: 'bg-blue-100 text-blue-700' },
  'medium': { label: 'Medium', color: 'bg-amber-100 text-amber-700' },
  'high': { label: 'High', color: 'bg-red-100 text-red-700' }
};