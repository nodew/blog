import * as React from "react";
import { useRef, useEffect } from "react";
import styles from "./Page.module.scss";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const Page = ({ title, children }: Props) => {
  const pageRef = useRef<HTMLDivElement>();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  });

  return (
    <div ref={pageRef} className={styles.page}>
      <div className={styles.page__inner}>
        { title && <h1 className={styles.page__title}>{title}</h1>}
        <div className={styles.page__body}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;
