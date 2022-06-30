import React from "react";
import { Currency } from "../../common/currency";

import styles from './header.module.scss';

function Header(props) {
  const {
    headerCurrency,
  } = props;
  
  return(
    <header className={styles.header}>
      <div className={styles.currencyItem}>
        <span className={styles.text}>{Currency.USD}: </span> 
        {(1 / headerCurrency.USD).toFixed(4)}
      </div>
      <div className={styles.currencyItem}>
        <span className={styles.text}>{Currency.EUR}: </span> 
        {(1 / headerCurrency.EUR).toFixed(4)}
      </div>
    </header>
  )
}

export { Header };