import React from 'react';
import FooterComponent from './FooterComponent';
import { fetchExchangeRates } from '../services/fxService';
import './HomeComponent.css';
import SideBar from './SideBar';
import ReactCountryFlag from "react-country-flag";

const HomeComponent = () => {
  const [rates, setRates] = React.useState(null);
  const [ratesBase, setRatesBase] = React.useState('');
  const [dailyChanges, setDailyChanges] = React.useState({});

  React.useEffect(() => {
    let componentIsMounted = true;

    const getFxData = () => {
      fetchExchangeRates()
        .then((data) => {
          console.log('fx data:', data);
          if (componentIsMounted) {
            setRates(data.rates);
            setRatesBase(data.base);
            localStorage.setItem('previousRates', JSON.stringify(data.rates)); // Yeni verileri kaydet
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getFxData();

    const fetchInterval = setInterval(getFxData, 1000 * 60);

    return () => {
      clearInterval(fetchInterval);
      componentIsMounted = false;
    };
  }, []);

  React.useEffect(() => {
    calculateDailyChanges();
  }, [rates]);

  const calculateDailyChanges = () => {
    const previousRates = JSON.parse(localStorage.getItem('previousRates'));
    if (!rates || !previousRates) return;

    const changes = {};
    for (const code in rates) {
      if (previousRates[code]) {
        const difference = rates[code] - previousRates[code];
        const percentageChange = ((difference / previousRates[code]) * 100).toFixed(2);
        changes[code] = percentageChange;
      }
    }
    setDailyChanges(changes);
  };

  const currenciesToShow = [
    { code: 'EUR', flag: 'EU' },
    { code: 'GBP', flag: 'GB' },
    { code: 'JPY', flag: 'JP' },
    { code: 'CAD', flag: 'CA' },
    { code: 'AUD', flag: 'AU' },
    { code: 'CHF', flag: 'CH' },
    { code: 'CNY', flag: 'CN' },
    { code: 'DKK', flag: 'DK' },
  ];

  return (
    <div className="home-container">
      <SideBar />
      <div className='screen-image'>
        <div className="content1">
          <h1>Döviz Kurları</h1>
          {rates && ratesBase === 'USD' && (
            <div className="currency-cards">
              {currenciesToShow.map(currency => (
                <div key={currency.code} className="card1">
                  <strong> {currency.code} </strong>
                  <span className="rate"> {rates[currency.code]} USD</span>
                  {dailyChanges[currency.code] !== undefined && (
                    <span className={`daily-change ${dailyChanges[currency.code] >= 0 ? 'positive-change' : 'negative-change'}`}>
                      {dailyChanges[currency.code] >= 0 ? '+' : ''}{dailyChanges[currency.code]}%
                    </span>
                  )}
                  <ReactCountryFlag
                    countryCode={currency.flag}
                    svg
                    style={{
                      width: '2em',
                      height: '2em',
                      marginLeft: '10px'
                    }}
                    title={currency.code}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default HomeComponent;
