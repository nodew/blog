import React, { FC } from "react";

const THEME_KEY = "theme";

export const getInitialTheme = (): string => {
    if (typeof window !== "undefined" && window.localStorage) {
        const storedTheme = window.localStorage.getItem(THEME_KEY);
        if (typeof storedTheme === "string") {
            return storedTheme;
        }

        const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
        if (userMedia.matches) {
            return "dark";
        }
    }

    return "light";
};

type ThemeContextProps = {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = React.createContext<Partial<ThemeContextProps>>({});

type ThemeProviderProps = {
    children: React.ReactNode;
};

export const ThemeProvider: FC<ThemeProviderProps> = (
    props: ThemeProviderProps
) => {
    const [theme, setTheme] = React.useState(getInitialTheme);

    const rawSetTheme = (rawTheme: string) => {
        const root = window.document.documentElement;
        const isDark = rawTheme === "dark";

        root.classList.remove(isDark ? "light" : "dark");
        root.classList.add(rawTheme);

        localStorage.setItem(THEME_KEY, rawTheme);
    };

    React.useEffect(() => {
        rawSetTheme(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};
