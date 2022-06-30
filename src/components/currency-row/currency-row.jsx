import React from 'react';
import styles from './currency-row.module.scss';

function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;

  return (
  <div className={styles.group}>
    <input 
      type="number" 
      min="0" 
      value={amount} 
      onChange={onChangeAmount} 
      className={styles.inputValue} 
    />
    <select 
      value={selectedCurrency} 
      onChange={onChangeCurrency} 
      className={styles.currencySelect}
    >
      {currencyOptions.map((option) => (
        <option 
          key={option} 
          value={option} 
          className={styles.currensyOption}
        >
          {option}
        </option>  
      ))}
    </select>    
  </div> 
)
}

export { CurrencyRow };