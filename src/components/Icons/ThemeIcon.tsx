import React from "react";

export const ThemeIcon = ({ size = 20 }) => {
    return (
        <svg
            width={size}
            height={size}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm0-2V4a8 8 0 1 1 0 16Z" />
        </svg>
    );
}
