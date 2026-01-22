import { Train, Plane, Bus, Calendar, Clock, Users, IndianRupee, Image } from 'lucide-react';
import { useState } from 'react';
import './TicketsSection.css';
import ScreenshotModal from './ScreenshotModal';

function TicketsSection({ tickets, onTicketClick }) {
  const [screenshotModal, setScreenshotModal] = useState(null);

  const getIcon = (type) => {
    switch (type) {
      case 'train': return <Train size={24} />;
      case 'flight': return <Plane size={24} />;
      case 'bus': return <Bus size={24} />;
      default: return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'waitlist': return 'status-waitlist';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeStr) => {
    return timeStr;
  };

  return (
    <section className="tickets-section">
      <h2 className="section-title">Booked Tickets</h2>
      
      <div className="tickets-grid">
        {tickets.map((ticket) => (
          <div 
            key={ticket.id} 
            className={`ticket-card ticket-${ticket.type}`}
          >
            <div className="ticket-header">
              <div className="ticket-icon">
                {getIcon(ticket.type)}
              </div>
              <div className="ticket-title-section">
                <h3 className="ticket-name">
                  {ticket.trainName || ticket.airline || ticket.operator}
                </h3>
                <p className="ticket-number">
                  {ticket.trainNumber || ticket.flightNumber || ticket.busType}
                </p>
              </div>
              <div className={`ticket-status ${getStatusClass(ticket.status)}`}>
                {ticket.status}
              </div>
            </div>

            <div className="ticket-route" onClick={() => onTicketClick(ticket)}>
              <div className="route-point">
                <div className="route-location">{ticket.from.split('(')[0].trim()}</div>
                <div className="route-time">{formatTime(ticket.departureTime)}</div>
                <div className="route-date">{formatDate(ticket.departureDate)}</div>
              </div>
              
              <div className="route-arrow">
                <div className="duration-badge">{ticket.duration}</div>
                <div className="arrow-line"></div>
              </div>
              
              <div className="route-point">
                <div className="route-location">{ticket.to.split('(')[0].trim()}</div>
                <div className="route-time">{formatTime(ticket.arrivalTime)}</div>
                <div className="route-date">{formatDate(ticket.arrivalDate)}</div>
              </div>
            </div>

            <div className="ticket-footer">
              <div className="footer-item">
                <Users size={16} />
                <span>{ticket.passengers.length} passengers</span>
              </div>
              <div className="footer-item price">
                <IndianRupee size={16} />
                <span>{ticket.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="ticket-pnr">
              PNR: {Array.isArray(ticket.pnr) ? ticket.pnr.join(', ') : ticket.pnr}
            </div>

            {ticket.screenshot && (
              <button 
                className="view-screenshot-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setScreenshotModal({ screenshot: ticket.screenshot, ticket });
                }}
              >
                <Image size={16} />
                {Array.isArray(ticket.screenshot)
                  ? `View Screenshots (${ticket.screenshot.length})`
                  : 'View Screenshot'}
              </button>
            )}
          </div>
        ))}
      </div>

      {screenshotModal && (
        <ScreenshotModal
          screenshot={screenshotModal.screenshot}
          ticketInfo={screenshotModal.ticket}
          onClose={() => setScreenshotModal(null)}
        />
      )}
    </section>
  );
}

export default TicketsSection;
