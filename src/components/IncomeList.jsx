export default function IncomeList({ income, deleteIncome, editIncome, currencySymbol = '$' }) {
  return (
    <div className="list-section">
      <h3>Income Sources</h3>
      <ul className="expense-list income-list">
        {income.length === 0 ? (
          <li className="empty-message">No income added yet</li>
        ) : (
          income.map((item) => (
            <li key={item._id} className="expense-item income-item">
              <div className="expense-info">
                <strong>{item.title}</strong>: +{currencySymbol}{item.amount}
              </div>
              <div className="expense-actions">
                <button onClick={() => editIncome(item)} className="edit-btn">Edit</button>
                <button onClick={() => deleteIncome(item._id)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
