import { Link } from "gatsby";
import React from "react";

export const Header = () => {
    return (
        <header>
            <nav>
                <ul className="flex items-center space-x-4">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/posts">Posts</Link></li>
                    <li><Link to="/about">About me</Link></li>
                </ul>
            </nav>
        </header>
    );
}
