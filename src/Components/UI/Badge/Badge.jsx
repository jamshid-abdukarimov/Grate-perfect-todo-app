import React from "react";
import "./badge.scss";

export const Badge = ({ color, classNames, onClick }) => (
  <i onClick={onClick} className={`badge badge__${color} ${classNames}`} />
);
