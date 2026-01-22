import { useState } from 'react';
import './App.css';
import TripHeader from './components/TripHeader';
import IndiaMap from './components/IndiaMap';
import JourneyMap from './components/JourneyMap';
import TicketsSection from './components/TicketsSection';
import HotelBookings from './components/HotelBookings';
import PendingTasks from './components/PendingTasks';
import BudgetOverview from './components/BudgetOverview';
import BudgetAnalysis from './components/BudgetAnalysis';
import TicketModal from './components/TicketModal';
import tripData from './data/tripData.json';

function App() {
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div className="app">
      <TripHeader data={tripData.tripOverview} />
      
      <main className="main-content">
        <JourneyMap destinations={tripData.destinations} />
        <IndiaMap destinations={tripData.destinations} />
        <BudgetAnalysis budget={tripData.budget} />
        <BudgetOverview budget={tripData.budget} />
        <PendingTasks tasks={tripData.pendingBookings} />
        <HotelBookings hotels={tripData.hotelBookings} />
        <TicketsSection tickets={tripData.tickets} onTicketClick={setSelectedTicket} />
      </main>

      {selectedTicket && (
        <TicketModal 
          ticket={selectedTicket} 
          onClose={() => setSelectedTicket(null)} 
        />
      )}
    </div>
  );
}

export default App;
