module.exports = {
    mode: "jit",
    purge: ["./build/*.html", "./src/**/*.tsx", "./safeclasses.txt"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "neutral-color": "#E5E5E5",
                "blue-number": "#0079FF",
                "black-label": "#1E2A32",
                "black-paragraph": "#1C1E1F",
                "blue-button": "#1B31A8",
                "grey-color": "#F4F8FA",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
