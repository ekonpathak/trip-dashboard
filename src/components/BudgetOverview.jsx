import { Wallet, IndianRupee } from 'lucide-react';
import './BudgetOverview.css';

function BudgetOverview({ budget }) {
  const budgetItems = [
    { label: 'Train Tickets', amount: budget.trainTickets || 0, color: '#3b82f6' },
    { label: 'Flight Tickets', amount: budget.flightTickets || 0, color: '#6366f1' },
    { label: 'Bus Tickets', amount: budget.busTickets || 0, color: '#8b5cf6' },
    { label: 'Hotels', amount: budget.estimatedHotelsCost, color: '#a855f7' },
    { label: 'Food', amount: budget.estimatedFoodCost, color: '#10b981' },
    { label: 'Local Transport', amount: budget.estimatedLocalTransport, color: '#f59e0b' },
    { label: 'Miscellaneous', amount: budget.miscellaneous, color: '#ec4899' }
  ];

  return (
    <div className="budget-overview">
      <h3>
        <Wallet size={16} />
        Budget Overview
      </h3>
      
      <div className="budget-items">
        {budgetItems.map((item, index) => (
          <div key={index} className="budget-item">
            <div className="item-label">
              {item.label}
            </div>
            <div className="item-amount">
              ₹{item.amount.toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>
      
      <div className="budget-total">
        <div>Total Estimated</div>
        <div>
          ₹{budget.totalEstimated.toLocaleString('en-IN')}
        </div>
      </div>
    </div>
  );
}

export default BudgetOverview;
