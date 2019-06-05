import * as React from "react";
import styles from "./Icon.module.scss";

interface Props {
  icon: {
    viewBox?: string,
    path?: string,
  };
}

const Icon = ({ icon }: Props) => (
  <svg className={styles.icon} viewBox={icon.viewBox}>
    <path d={icon.path} />
  </svg>
);

export default Icon;
