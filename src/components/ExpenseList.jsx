export default function ExpenseList({ expenses, deleteExpense, editExpense }) {
  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <li key={expense.id} className="expense-item">
          <div className="expense-info">
            <strong>{expense.title}</strong>: ${expense.amount}
          </div>
          <div className="expense-actions">
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
            <button onClick={() => editExpense(expense)}>Edit</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
