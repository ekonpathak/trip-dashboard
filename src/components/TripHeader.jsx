import { Calendar, Users } from 'lucide-react';
import './TripHeader.css';

function TripHeader({ data }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <header className="trip-header">
      <div className="header-content">
        <div className="trip-title-section">
          <h1 className="trip-title">{data.title}</h1>
          <div className="trip-meta">
            <div className="meta-item">
              <Calendar size={18} />
              <span>{formatDate(data.startDate)} - {formatDate(data.endDate)}</span>
            </div>
            <div className="meta-item">
              <Users size={18} />
              <span>{data.travelers.length} Travelers</span>
            </div>
            <div className="meta-item days-badge">
              {data.totalDays} Days
            </div>
          </div>
        </div>
        
        <div className="travelers-section">
          <h3 className="travelers-title">Travelers</h3>
          <div className="travelers-list">
            {data.travelers.map((traveler, index) => (
              <div key={index} className="traveler-card">
                <div className="traveler-avatar">
                  {traveler.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="traveler-info">
                  <div className="traveler-name">{traveler.name}</div>
                  <div className="traveler-details">{traveler.age} yrs, {traveler.gender}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default TripHeader;
