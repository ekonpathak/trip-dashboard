import { Hotel, IndianRupee, Calendar, AlertCircle } from 'lucide-react';
import './HotelBookings.css';

function HotelBookings({ hotels }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="hotel-bookings">
      <h2 className="section-title">
        <Hotel size={20} />
        Hotel Bookings Required
      </h2>
      
      <div className="hotels-list">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <div className="hotel-header">
              <h3>{hotel.location}</h3>
              <span className={`hotel-status status-${hotel.status}`}>
                {hotel.status}
              </span>
            </div>
            
            <div className="hotel-dates">
              <Calendar size={16} />
              <span>
                {formatDate(hotel.checkIn)} - {formatDate(hotel.checkOut)}
              </span>
              <span className="nights-badge">{hotel.nights} night{hotel.nights > 1 ? 's' : ''}</span>
            </div>
            
            <div className="hotel-cost">
              <IndianRupee size={16} />
              <span>Est. ₹{hotel.estimatedCost.toLocaleString('en-IN')}</span>
            </div>
            
            {hotel.notes && (
              <div className="hotel-notes">
                <AlertCircle size={14} />
                <span>{hotel.notes}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="hotels-summary">
        <strong>Total Estimated:</strong>
        <span className="total-amount">
          ₹{hotels.reduce((sum, h) => sum + h.estimatedCost, 0).toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
}

export default HotelBookings;
