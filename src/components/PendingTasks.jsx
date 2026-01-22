import { AlertTriangle } from 'lucide-react';
import './PendingTasks.css';

function PendingTasks({ tasks }) {
  return (
    <div className="pending-tasks">
      <h3>
        <AlertTriangle size={16} />
        Pending Bookings
      </h3>
      
      <div className="tasks-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task-item ${task.priority}`}>
            <div className="task-name">
              {task.from && task.to ? (
                `${task.from} → ${task.to}`
              ) : (
                task.location
              )}
            </div>
            {task.notes && <div style={{fontSize: '0.7rem', color: '#5d4037', marginTop: '0.25rem'}}>{task.notes}</div>}
            <span className={`task-priority ${task.priority}`}>
              {task.priority.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingTasks;
