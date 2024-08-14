import type { PluginAPI } from "tailwindcss/types/config";

export const customScrollbar = ({ addUtilities }: PluginAPI) => {
  addUtilities(
    {
      ".tab-active": {
        color: "var(--primary-color)",      
        borderColor: "var(--primary-color)",
      },
      ".boder-primary": {
          boder: "1px solid var(--primary-color)",
      },
      ".scrollbar-thin": {
        "scrollbar-width": "thin",
      },
      ".scrollbar-none": {
        "&::-webkit-scrollbar-button": {
          display: "none",
        },
      },
      ".scrollbar-rounded": {
        "scrollbar-width": "thin",
        "scrollbar-color": "var(--primary-color) #f1f1f1",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "var(--primary-color)",
          "border-radius": "9999px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "var(--primary-color)",
          "border-radius": "9999px",
        },
      },
    },
    {
      respectPrefix: true,
      respectImportant: true,
    }
  );
};
