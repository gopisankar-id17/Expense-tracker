export default function ExpenseSummary({ summary }) {
  const { totalIncome = 0, totalExpenses = 0, balance = 0 } = summary;

  return (
    <div className="expense-summary">
      <h3>Financial Summary</h3>
      <div className="summary-grid">
        <div className="summary-item income-summary">
          <span className="label">Total Income:</span>
          <span className="amount income">+${totalIncome.toFixed(2)}</span>
        </div>
        <div className="summary-item expense-summary">
          <span className="label">Total Expenses:</span>
          <span className="amount expense">-${totalExpenses.toFixed(2)}</span>
        </div>
        <div className="summary-item balance-summary">
          <span className="label">Balance:</span>
          <span className={`amount balance ${balance >= 0 ? 'positive' : 'negative'}`}>
            ${balance.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
