import React from 'react';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
];

export default function CurrencySelector({ currency, setCurrency }) {
  return (
    <div style={{ marginBottom: 20, textAlign: 'right' }}>
      <label htmlFor="currency-select" style={{ marginRight: 10, fontWeight: 600 }}>Currency:</label>
      <select
        id="currency-select"
        value={currency}
        onChange={e => setCurrency(e.target.value)}
        style={{ padding: '8px 16px', borderRadius: 8, fontSize: 16 }}
      >
        {currencies.map(cur => (
          <option key={cur.code} value={cur.code}>
            {cur.symbol} {cur.name}
          </option>
        ))}
      </select>
    </div>
  );
}
