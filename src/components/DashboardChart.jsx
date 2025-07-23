import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function DashboardChart({ income, expenses, currencySymbol = '$' }) {
  // Combine income and expenses by date
  const dataMap = {};
  income.forEach(item => {
    const date = new Date(item.createdAt).toLocaleDateString();
    if (!dataMap[date]) dataMap[date] = { date, income: 0, expenses: 0 };
    dataMap[date].income += item.amount;
  });
  expenses.forEach(item => {
    const date = new Date(item.createdAt).toLocaleDateString();
    if (!dataMap[date]) dataMap[date] = { date, income: 0, expenses: 0 };
    dataMap[date].expenses += item.amount;
  });
  const chartData = Object.values(dataMap).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div style={{ width: '100%', height: 350, background: 'white', borderRadius: 15, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', margin: '30px 0', padding: '20px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: 20 }}>Spending & Income Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={tick => `${currencySymbol}${tick}`} />
          <Tooltip formatter={(value, name) => [`${currencySymbol}${value}`, name]} />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#4CAF50" strokeWidth={3} dot={true} name="Income" />
          <Line type="monotone" dataKey="expenses" stroke="#dc3545" strokeWidth={3} dot={true} name="Expenses" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
