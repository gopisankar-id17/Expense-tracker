export default function ExpenseList({ expenses, deleteExpense, editExpense, currencySymbol = '$' }) {
  return (
    <div className="list-section">
      <h3>Expenses</h3>
      <ul className="expense-list">
        {expenses.length === 0 ? (
          <li className="empty-message">No expenses added yet</li>
        ) : (
          expenses.map((expense) => (
            <li key={expense._id} className="expense-item">
              <div className="expense-info">
                <strong>{expense.title}</strong>: -{currencySymbol}{expense.amount}
              </div>
              <div className="expense-actions">
                <button onClick={() => editExpense(expense)} className="edit-btn">Edit</button>
                <button onClick={() => deleteExpense(expense._id)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
