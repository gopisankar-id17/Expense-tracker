export default function ExpenseSummary({ expenses }) {
  const income = expenses
    .filter((e) => e.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = expenses
    .filter((e) => e.amount < 0)
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income + expense;

  return (
    <div className="expense-summary">
      <h3>Summary</h3>
      <p>Income: ${income}</p>
      <p>Expense: ${Math.abs(expense)}</p>
      <p>Balance: ${balance}</p>
    </div>
  );
}
