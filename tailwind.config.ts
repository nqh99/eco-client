import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xxs: "364px",   
      xs: "480px",    
      sm: "640px",    
      md: "768px",    
      lg: "1024px",   
      xl: "1280px",   
      xxl: "1536px",  
      gg: "1740px",   
      xgg: "1920px",  
      hg: "1921px",   
    },
    extend: {
      fontFamily: {
        sansita: ["Sansita", "sans-serif"],
      },
      padding: {
        default: "var(--default-padding)",
      },
      colors: {
        default: "var(--default-color)",
        primary: "var(--primary-color)",
        discount: "var(--discount-color)",
        informal: "var(--informal-color)",
      },
      backgroundColor: {
        primary: "var(--primary-color)",
      },
    },
  },
  plugins: [],
};

export default config;
