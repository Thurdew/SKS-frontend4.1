export const fetchExchangeRates = async () => {
  const accessKey = 'fca_live_XaLDtZwge5U7MiVSPY2SL5RRdRpHoeLUyjpE7sHv'; // Kendi API anahtarınızı kullanın
  const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${accessKey}&base_currency=USD`);
  const data = await response.json();
  
  // Döviz kurlarını USD cinsinden alıyoruz
  const ratesInUSD = data.data;
  
  // USD cinsinden gelen döviz kurlarını virgülden sonra iki basamaklı hale getiriyoruz
  const formattedRates = {};
  for (const [currency, rate] of Object.entries(ratesInUSD)) {
    formattedRates[currency] = parseFloat(rate).toFixed(2);
  }

  return {
    rates: formattedRates,
    base: 'USD'
  };
};
export const searchFxRates = (rates, searchTerm) => {
  if (searchTerm.trim().length === 0) return;

  const results = {};

  for (const [key, value] of Object.entries(rates)) {
    if (key.toUpperCase().includes(searchTerm.toUpperCase())) {
      results[key] = value;
    }
  }

  return results;
};