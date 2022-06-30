import React, { useEffect, useState } from 'react';
import { CurrencyRow } from '../currency-row/currency-row';
import { Header } from '../header/header';
import { API, Currency } from '../../common/common';

import styles from './app.module.scss';

function App() {
  const [headerCurrency, setHeaderCurrency] = useState({});
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [firstCurrency, setFirstCurrency] = useState();
  const [secondCurrency, setSecondCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amount, setAmount] = useState(1);
  const [amountInFirstCurrency, setAmountInFirstCurrency] = useState(true);

  function format(number) {
    return number.toFixed(4);
  }

  let firstAmount, secondAmount;
  if (amountInFirstCurrency) {
    firstAmount = amount;
    secondAmount = format(amount * exchangeRate);
  } else {
    secondAmount = amount;
    firstAmount = format(amount / exchangeRate);
  }
  
  useEffect(() => {
    fetch(`${API.BASE_URL}?base=${Currency.UAH}`)
    .then(res => res.json())
    .then(data => {
      setHeaderCurrency(data.rates);
    })
  }, [])
  
  useEffect(() => {
    fetch(API.BASE_URL)
    .then(res => res.json())
    .then(data => {
      const hryvniaCurrency = Object.keys(data.rates).find((currency) => currency === Currency.UAH);
      setCurrencyOptions([...Object.keys(data.rates)]);
      setFirstCurrency(data.base);
      setSecondCurrency(hryvniaCurrency);
    })
  }, [])

  useEffect(() => {
    if (firstCurrency != null && secondCurrency != null) {
      fetch(`${API.BASE_URL}?base=${firstCurrency}&symbols=${secondCurrency}`)
        .then(res => res.json())
        .then(data => {
          setExchangeRate(data.rates[secondCurrency]);
        })
      }
    }, [firstCurrency, secondCurrency]);
    

    function firstAmountChangeHandler(e) {
    setAmount(e.target.value);
    setAmountInFirstCurrency(true);
  }

  function secondAmountChangeHandler(e) {
    setAmount(e.target.value);
    setAmountInFirstCurrency(false);
  }

  return (
    <>
      <Header 
        headerCurrency={headerCurrency}
      />
      <main className={styles.wrapper}>
        <h1 className={styles.title}>
          Currency Converter
        </h1>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={firstCurrency}
          onChangeCurrency={e => setFirstCurrency(e.target.value)}
          onChangeAmount={firstAmountChangeHandler}
          amount={firstAmount}
        />
        <div className={styles.equalSign}>=</div>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={secondCurrency}
          onChangeCurrency={e => setSecondCurrency(e.target.value)}
          onChangeAmount={secondAmountChangeHandler}
          amount={secondAmount}
        />      
      </main>
    </>
  );
}

export { App };
