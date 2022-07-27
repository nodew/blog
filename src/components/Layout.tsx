import * as React from "react";
import { Link } from "gatsby";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { ThemeProvider } from "./ThemeProvider";

export interface LayoutProps {
    children: React.ReactNode;
    activeNavItem?: string;
}

declare var __PATH_PREFIX__: string;

export const Layout = ({ children, activeNavItem }: LayoutProps) => {
    const rootPath = `${__PATH_PREFIX__}/`;
    const isRootPath = location.pathname === rootPath;

    return (
        <ThemeProvider>
            <div
                data-is-root-path={isRootPath}
                className="bg-white dark:bg-dark dark:antialiased text-base text-gray-700 dark:text-gray-200 p-8 min-h-screen flex flex-col"
            >
                <Header activeNavItem={activeNavItem} />
                <div className="flex-1">{children}</div>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Layout;
