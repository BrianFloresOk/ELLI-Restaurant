import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    prefix: "",
    theme: {},

    // Ahora importamos y usamos el plugin directamente
    plugins: [
        tailwindcssAnimate
    ],
};