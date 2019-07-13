import * as React from "react";
import Helmet from "react-helmet";
import { ReactNode } from "react";
import styles from "./Layout.module.scss";

interface Props {
  children: ReactNode;
  title: string;
  description?: string;
  keywords?: string;
}

const Layout = ({ children, title, description, keywords }: Props) => (
  <div className={styles.layout}>
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="keyword" content={keywords} />
      <meta name="description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
    </Helmet>
    {children}
  </div>
);

export default Layout;
