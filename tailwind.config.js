/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand:  "#1D4ED8",  /* Azure       */
        accent: "#23A6E8",  /* Sky Blue    */
        cyan:   "#3AC9F5",  /* Signal Cyan */
        ink:    "#141A2E",  /* Ink (bg)    */
        mist:   "#F1F4F9",  /* Mist        */
      },
      zIndex: {
        60: "60", 70: "70", 80: "80", 90: "90", 100: "100",
      },
      animation: {
        "fade-up":    "fadeUp 0.72s cubic-bezier(0.16,1,0.3,1) forwards",
        "page-enter": "pageEnter 0.55s cubic-bezier(0.16,1,0.3,1) forwards",
        "gradient":   "gradientShift 6s ease infinite",
        "shimmer":    "shimmer 4s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(26px)" },
          to:   { opacity: 1, transform: "translateY(0)"    },
        },
        pageEnter: {
          from: { opacity: 0, transform: "translateY(14px)" },
          to:   { opacity: 1, transform: "translateY(0)"    },
        },
      },
    },
  },
  plugins: [],
};
