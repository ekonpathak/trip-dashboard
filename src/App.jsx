import { useState, lazy, Suspense } from 'react';
import './App.css';
import TripHeader from './components/TripHeader';
import JourneyMap from './components/JourneyMap';
import TicketsSection from './components/TicketsSection';
import HotelBookings from './components/HotelBookings';
import PendingTasks from './components/PendingTasks';
import BudgetOverview from './components/BudgetOverview';
import BudgetAnalysis from './components/BudgetAnalysis';
import TicketModal from './components/TicketModal';
import tripData from './data/tripData.json';

const IndiaMap = lazy(() => import('./components/IndiaMap'));

function App() {
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div className="app">
      <TripHeader data={tripData.tripOverview} />
      
      <main className="main-content">
        <JourneyMap destinations={tripData.destinations} />
        <Suspense fallback={<div style={{gridColumn: '1 / 8', gridRow: '3 / span 3', minHeight: '720px', background: '#fff', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading Map...</div>}>
          <IndiaMap destinations={tripData.destinations} />
        </Suspense>
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
