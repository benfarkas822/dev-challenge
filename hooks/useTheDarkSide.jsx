import React, {useEffect, useState} from 'react';

export const useTheDarkSide = () => {
    const [theme, setTheme] = useState(typeof window !== 'undefined' && localStorage.theme);
    const colorTheme = theme === 'dark' ? 'light' : 'dark';

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);

        localStorage.setItem('theme', theme);
    }, [theme, setTheme])

    return [colorTheme, setTheme]
}
