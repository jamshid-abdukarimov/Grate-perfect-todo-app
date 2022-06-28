import React from "react";
import styles from "./button.module.scss";

const Button = ({ children, ...args }) => (
  <button {...args} className={styles.button}>
    {children}
  </button>
);

export default Button;
