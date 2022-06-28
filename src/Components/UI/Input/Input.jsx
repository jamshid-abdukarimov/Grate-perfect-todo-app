import React from "react";
import styles from "./input.module.scss";

const Input = ({ placeholder, type, ...args }) => (
  <input
    className={styles.input}
    placeholder={placeholder}
    type={type || "text"}
    {...args}
  />
);

export default Input;
