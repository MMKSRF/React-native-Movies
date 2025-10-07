



/** @type {import('tailwindcss').Config} */
module.exports = {
    // Updated to include all app/ files for NativeWind class scanning
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {},
    },
    plugins: [],
}