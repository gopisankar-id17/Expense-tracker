// Utility to fetch live currency rates from exchangerate-api.com (free tier)
// You can get a free API key at https://www.exchangerate-api.com/

const API_KEY = "ENTER_YOUR_API_KEY_HERE"; // <-- Replace with your key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

export async function fetchCurrencyRates() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch rates");
    const data = await response.json();
    return data.conversion_rates;
  } catch (err) {
    console.error("Currency rate fetch error:", err);
    // Fallback rates (approximate)
    return {
      USD: 1,
      EUR: 0.92,
      INR: 83,
      GBP: 0.78,
      JPY: 157,
    };
  }
}
