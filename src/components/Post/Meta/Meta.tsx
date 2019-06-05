import * as React from "react";
import moment from "moment";
import styles from "./Meta.module.scss";

interface Props {
  date: string;
}

const Meta = ({ date }: Props) => (
  <div className={styles.meta}>
    <p className={styles.meta__date}>Published at {moment(date).format("D MMM YYYY")}</p>
  </div>
);

export default Meta;
