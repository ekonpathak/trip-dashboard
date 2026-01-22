import { TrendingUp, CheckCircle, Clock, Wallet } from 'lucide-react';
import './BudgetAnalysis.css';

function BudgetAnalysis({ budget }) {
  // Calculate spent vs expected
  const alreadySpent = budget.trainTickets + budget.flightTickets + budget.busTickets;
  const expectedToSpend = budget.estimatedHotelsCost + budget.estimatedFoodCost + 
                          budget.estimatedLocalTransport + budget.miscellaneous;
  const totalRequired = budget.totalEstimated;
  const percentageSpent = ((alreadySpent / totalRequired) * 100).toFixed(1);
  const percentageRemaining = ((expectedToSpend / totalRequired) * 100).toFixed(1);

  const spentCategories = [
    { label: 'Train Tickets', amount: budget.trainTickets, icon: '🚂', color: '#3b82f6' },
    { label: 'Flight Tickets', amount: budget.flightTickets, icon: '✈️', color: '#6366f1' },
    { label: 'Bus Tickets', amount: budget.busTickets, icon: '🚌', color: '#8b5cf6' }
  ];

  const expectedCategories = [
    { label: 'Hotels', amount: budget.estimatedHotelsCost, icon: '🏨', color: '#ec4899' },
    { label: 'Food', amount: budget.estimatedFoodCost, icon: '🍽️', color: '#10b981' },
    { label: 'Local Transport', amount: budget.estimatedLocalTransport, icon: '🚕', color: '#f59e0b' },
    { label: 'Miscellaneous', amount: budget.miscellaneous, icon: '💼', color: '#8b5cf6' }
  ];

  return (
    <div className="budget-analysis">
      <div className="analysis-header">
        <TrendingUp size={24} />
        <h2>Budget Analysis</h2>
      </div>

      {/* Summary Cards */}
      <div className="budget-summary">
        <div className="summary-card spent">
          <div className="card-icon">
            <CheckCircle size={32} />
          </div>
          <div className="card-content">
            <div className="card-label">Already Spent</div>
            <div className="card-amount">₹{alreadySpent.toLocaleString('en-IN')}</div>
            <div className="card-percentage">{percentageSpent}% of total</div>
          </div>
        </div>

        <div className="summary-card expected">
          <div className="card-icon">
            <Clock size={32} />
          </div>
          <div className="card-content">
            <div className="card-label">Expected to Spend</div>
            <div className="card-amount">₹{expectedToSpend.toLocaleString('en-IN')}</div>
            <div className="card-percentage">{percentageRemaining}% of total</div>
          </div>
        </div>

        <div className="summary-card total">
          <div className="card-icon">
            <Wallet size={32} />
          </div>
          <div className="card-content">
            <div className="card-label">Total Budget</div>
            <div className="card-amount">₹{totalRequired.toLocaleString('en-IN')}</div>
            <div className="card-percentage">100%</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="budget-progress-section">
        <div className="progress-label">
          <span>Budget Utilization</span>
          <span className="progress-values">
            ₹{alreadySpent.toLocaleString('en-IN')} / ₹{totalRequired.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="budget-progress-bar">
          <div 
            className="progress-filled spent-bar" 
            style={{ width: `${percentageSpent}%` }}
          >
            {percentageSpent}%
          </div>
          <div 
            className="progress-filled expected-bar" 
            style={{ width: `${percentageRemaining}%` }}
          >
            {percentageRemaining}%
          </div>
        </div>
        <div className="progress-legend">
          <span className="legend-item">
            <span className="legend-color spent"></span>
            Already Spent
          </span>
          <span className="legend-item">
            <span className="legend-color expected"></span>
            Expected to Spend
          </span>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="budget-breakdown">
        <div className="breakdown-section">
          <h3 className="breakdown-title">
            <CheckCircle size={18} />
            Already Spent (₹{alreadySpent.toLocaleString('en-IN')})
          </h3>
          <div className="breakdown-items">
            {spentCategories.map((cat, idx) => (
              <div key={idx} className="breakdown-item">
                <div className="item-info">
                  <span className="item-icon">{cat.icon}</span>
                  <span className="item-label">{cat.label}</span>
                </div>
                <div className="item-details">
                  <span className="item-amount">₹{cat.amount.toLocaleString('en-IN')}</span>
                  <div className="item-bar">
                    <div 
                      className="item-bar-fill" 
                      style={{ 
                        width: `${(cat.amount / alreadySpent * 100).toFixed(1)}%`,
                        backgroundColor: cat.color 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="breakdown-section">
          <h3 className="breakdown-title">
            <Clock size={18} />
            Expected to Spend (₹{expectedToSpend.toLocaleString('en-IN')})
          </h3>
          <div className="breakdown-items">
            {expectedCategories.map((cat, idx) => (
              <div key={idx} className="breakdown-item">
                <div className="item-info">
                  <span className="item-icon">{cat.icon}</span>
                  <span className="item-label">{cat.label}</span>
                </div>
                <div className="item-details">
                  <span className="item-amount">₹{cat.amount.toLocaleString('en-IN')}</span>
                  <div className="item-bar">
                    <div 
                      className="item-bar-fill" 
                      style={{ 
                        width: `${(cat.amount / expectedToSpend * 100).toFixed(1)}%`,
                        backgroundColor: cat.color 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetAnalysis;
