export default function ExpenseSummary({ summary, currencySymbol = '$' }) {
  const { totalIncome = 0, totalExpenses = 0, balance = 0 } = summary;

  return (
    <div className="expense-summary">
      <div className="summary-item">
        <div className="summary-icon">💰</div>
        <div className="summary-label">Total Income</div>
        <div className="summary-amount">+{currencySymbol}{totalIncome.toFixed(2)}</div>
      </div>
      <div className="summary-item">
        <div className="summary-icon">💸</div>
        <div className="summary-label">Total Expenses</div>
        <div className="summary-amount">-{currencySymbol}{totalExpenses.toFixed(2)}</div>
      </div>
      <div className="summary-item">
        <div className="summary-icon">{balance >= 0 ? '📈' : '📉'}</div>
        <div className="summary-label">Balance</div>
        <div className={`summary-amount ${balance >= 0 ? 'positive' : 'negative'}`}>
          {currencySymbol}{balance.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
