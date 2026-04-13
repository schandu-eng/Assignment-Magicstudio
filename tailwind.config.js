/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#0f1220",
        card: "#171a2b",
        border: "#2a2f45",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(216, 89, 255, 0.35), 0 8px 30px rgba(76, 32, 163, 0.35)",
      },
      backgroundImage: {
        "cta-gradient": "linear-gradient(120deg, #d946ef 0%, #8b5cf6 45%, #6366f1 100%)",
      },
    },
  },
  plugins: [],
};
