import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="money-header">
      <div className="header-background">
        <div className="money-pattern">
          <div className="dollar-sign">$</div>
          <div className="dollar-sign">$</div>
          <div className="dollar-sign">$</div>
          <div className="euro-sign">€</div>
          <div className="pound-sign">£</div>
          <div className="yen-sign">¥</div>
        </div>
      </div>
      
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <div className="coin">
              <span className="coin-symbol">$</span>
            </div>
          </div>
          <div className="brand-info">
            <h1 className="brand-title">
              <span className="money-text">Money</span>
              <span className="tracker-text">Tracker</span>
            </h1>
            <p className="brand-tagline">Smart Financial Management</p>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-item">
            <div className="stat-icon">💰</div>
            <div className="stat-text">Track Income</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">📊</div>
            <div className="stat-text">Monitor Expenses</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">💎</div>
            <div className="stat-text">Build Wealth</div>
          </div>
        </div>

        <div className="welcome-section">
          <div className="welcome-message">
            <div className="welcome-icon">�</div>
            <div className="welcome-text">
              <span className="greeting">Welcome to</span>
              <span className="app-name">MoneyTracker</span>
            </div>
          </div>
        </div>
      </div>

      <div className="header-border">
        <div className="border-pattern"></div>
      </div>
    </header>
  );
}
