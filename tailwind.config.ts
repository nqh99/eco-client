import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      hg: { min: "1921px" },
      xgg: { max: "1920px" },
      gg: { max: "1739px" },
      xxl: { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" },
      xs: { max: "479px" },
      xxs: { max: "364px" },
    },
    extend: {
      fontFamily: {
        sansita: ["Sansita", "sans-serif"],
      },
      padding: {
        default: "var(--default-padding)",
      },
    },
  },
  plugins: [],
};
export default config;
