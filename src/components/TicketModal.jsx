import { X, Download, Train, Plane, Bus, Users } from 'lucide-react';
import './TicketModal.css';

function TicketModal({ ticket, onClose }) {
  if (!ticket) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'train': return <Train size={28} />;
      case 'flight': return <Plane size={28} />;
      case 'bus': return <Bus size={28} />;
      default: return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="modal-icon">
            {getIcon(ticket.type)}
          </div>
          <div>
            <h2>{ticket.trainName || ticket.airline || ticket.operator}</h2>
            <p className="modal-subtitle">
              {ticket.trainNumber || ticket.flightNumber || ticket.busType}
            </p>
          </div>
        </div>

        <div className="modal-body">
          <div className="detail-grid">
            <div className="detail-item">
              <label>From</label>
              <div className="detail-value">{ticket.from}</div>
            </div>
            <div className="detail-item">
              <label>To</label>
              <div className="detail-value">{ticket.to}</div>
            </div>
            <div className="detail-item">
              <label>Departure</label>
              <div className="detail-value">
                {new Date(ticket.departureDate).toLocaleDateString('en-IN')} at {ticket.departureTime}
              </div>
            </div>
            <div className="detail-item">
              <label>Arrival</label>
              <div className="detail-value">
                {new Date(ticket.arrivalDate).toLocaleDateString('en-IN')} at {ticket.arrivalTime}
              </div>
            </div>
            <div className="detail-item">
              <label>Duration</label>
              <div className="detail-value">{ticket.duration}</div>
            </div>
            <div className="detail-item">
              <label>Class</label>
              <div className="detail-value">{ticket.class || 'N/A'}</div>
            </div>
            <div className="detail-item">
              <label>PNR</label>
              <div className="detail-value pnr">
                {Array.isArray(ticket.pnr) ? ticket.pnr.join(', ') : ticket.pnr}
              </div>
            </div>
            <div className="detail-item">
              <label>Total Amount</label>
              <div className="detail-value price">₹{ticket.totalAmount.toLocaleString('en-IN')}</div>
            </div>
          </div>

          <div className="passengers-section">
            <h3>
              <Users size={20} />
              Passengers
            </h3>
            <div className="passengers-list">
              {ticket.passengers.map((passenger, index) => (
                <div key={index} className="passenger-card">
                  <div className="passenger-number">{index + 1}</div>
                  <div className="passenger-details">
                    <div className="passenger-name">{passenger.name}</div>
                    <div className="passenger-seat">
                      {passenger.seat && `Seat: ${passenger.seat}`}
                      {passenger.coach && ` | Coach: ${passenger.coach}`}
                      {passenger.status && ` | ${passenger.status}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {ticket.screenshot && (
            <div className="screenshot-section">
              <h3>Original Ticket</h3>
              <div className="screenshot-preview">
                <img 
                  src={ticket.screenshot} 
                  alt="Ticket Screenshot"
                  onError={(e) => {
                    console.error('Image failed to load:', ticket.screenshot);
                    e.target.style.display = 'none';
                  }}
                />
                <a 
                  href={ticket.screenshot} 
                  download={`ticket-${ticket.id}.png`}
                  className="download-btn"
                >
                  <Download size={18} />
                  Download Ticket
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketModal;
