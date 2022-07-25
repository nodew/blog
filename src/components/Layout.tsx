import * as React from "react";
import { Link } from "gatsby";

import { Header } from "./Header";
import { Footer } from "./Footer";

export interface LayoutProps {
    children: React.ReactNode;
}

declare var __PATH_PREFIX__: string;

export const Layout = ({ children }: LayoutProps) => {
    const rootPath = `${__PATH_PREFIX__}/`;
    const isRootPath = location.pathname === rootPath;

    return (
        <div data-is-root-path={isRootPath}>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
