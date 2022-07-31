import { Link } from "gatsby";
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export interface HeaderProps {
    activeNavItem?: string;
}

export const Header = ({ activeNavItem = "" }: HeaderProps) => {
    const { theme, setTheme } = useContext(ThemeContext);

    const icon = theme === "light" ? "/images/moon.svg" : "/images/sunny.svg";

    const handleThemeChange = () => {
        setTheme!(theme === "light" ? "dark" : "light");
    };

    return (
        <header className="text-base mb-14">
            <div className="max-w-5xl flex flex-col lg:flex-row items-center text-center lg:text-left m-auto">
                <div className="leading-none flex flex-grow items-center">
                    <div className="block select-none py-1 font-bold text-xl text-gray-800 dark:text-gray-100">
                        <Link to="/">Qiao@www:~$</Link>
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    <nav className="select-none mt-4 lg:mt-0">
                        <ul className="text-xl text-gray-700 dark:text-gray-200 flex">
                            <li
                                className={`w-24 text-center hover:font-semibold ${
                                    activeNavItem === "home"
                                        ? "font-bold hover:font-bold"
                                        : ""
                                }`}
                            >
                                <Link to="/">Home</Link>
                            </li>
                            <li
                                className={`w-24 text-center hover:font-semibold ${
                                    activeNavItem === "posts"
                                        ? "font-bold hover:font-bold"
                                        : ""
                                }`}
                            >
                                <Link to="/posts">Posts</Link>
                            </li>
                            <li
                                className={`w-24 text-center hover:font-semibold ${
                                    activeNavItem === "about"
                                        ? "font-bold hover:font-bold"
                                        : ""
                                }`}
                            >
                                <Link to="/about">About</Link>
                            </li>
                        </ul>
                    </nav>
                    <div
                        className="mx-3 select-none mt-4 lg:mt-0 cursor-pointer"
                        onClick={handleThemeChange}
                        title="Toggle theme"
                    >
                        <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm0-2V4a8 8 0 1 1 0 16Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </header>
    );
};
