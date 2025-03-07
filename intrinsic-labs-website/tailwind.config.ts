import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main brand colors - warm Frank Lloyd Wright inspired palette
        primary: {
          DEFAULT: "#C8A27C", // Warm wood tone
          50: "#F9F5EF",
          100: "#F3EBDF",
          200: "#E8D7BF",
          300: "#DDC39F",
          400: "#D2AF8F",
          500: "#C8A27C", // Default
          600: "#B88A5C",
          700: "#A37341",
          800: "#7F5A33",
          900: "#5B4125",
          950: "#2A1D12",
        },
        // Secondary color - soft cream
        secondary: {
          DEFAULT: "#F5F1E8", // Soft cream
          50: "#FEFDFB",
          100: "#FCF9F4",
          200: "#F9F5EE",
          300: "#F5F1E8", // Default
          400: "#EAE2D1",
          500: "#DFD3BA",
          600: "#D0BF9D",
          700: "#C1AB80",
          800: "#B29763",
          900: "#957C4A",
          950: "#6A5935",
        },
        // Neutral colors for text and backgrounds - warm tones
        neutral: {
          DEFAULT: "#2A1D12", // Dark wood brown
          50: "#F7F4F1", // Warmer white
          100: "#EFE9E3", // Warmer light gray
          200: "#DFD3C7",
          300: "#CFBDAB",
          400: "#BFA78F",
          500: "#AB8E6F",
          600: "#8F7353",
          700: "#6F5941",
          800: "#4F3F2E",
          900: "#2A1D12", // Default
          950: "#15100A",
        },
        // Background colors
        background: {
          light: "#F5F1E8", // Soft cream background
          DEFAULT: "#121009", // Much darker background, almost black with a hint of warmth
          dark: "#0A0806", // Even darker shade
        },
        // Sage green accent color
        accent: {
          DEFAULT: "#7D9B76", // Muted sage green
          50: "#F1F4F0",
          100: "#E3E9E1",
          200: "#C7D3C4",
          300: "#ABBDA7",
          400: "#8FA78A",
          500: "#7D9B76", // Default
          600: "#637F5C",
          700: "#4A6045",
          800: "#32412F",
          900: "#1A2118",
          950: "#0D100C",
        },
        // Rich wood brown
        brown: {
          DEFAULT: "#8B5E3C", // Rich wood brown
          50: "#F3EDE7",
          100: "#E7DBCF",
          200: "#D0B79F",
          300: "#B8936F",
          400: "#A1784F",
          500: "#8B5E3C", // Default
          600: "#704B30",
          700: "#553924",
          800: "#3A2618",
          900: "#1F130C",
          950: "#0F0906",
        },
      },
      fontFamily: {
        sans: ["var(--font-jetbrains-mono)", "monospace"], // Keeping monospace for body text
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "Menlo", "Monaco", "Consolas", "monospace"],
        display: ["Cardo", "serif"], // Cardo for headings
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "pulse": "pulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.secondary.DEFAULT'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.primary.400'),
              },
            },
            h1: {
              color: theme('colors.primary.DEFAULT'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h2: {
              color: theme('colors.primary.DEFAULT'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h3: {
              color: theme('colors.primary.DEFAULT'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            h4: {
              color: theme('colors.primary.DEFAULT'),
              fontFamily: theme('fontFamily.display').join(', '),
            },
            blockquote: {
              color: theme('colors.secondary.300'),
              borderLeftColor: theme('colors.primary.700'),
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              color: theme('colors.primary.300'),
              backgroundColor: theme('colors.neutral.800'),
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: theme('colors.neutral.900'),
              color: theme('colors.secondary.200'),
              borderRadius: '0.5rem',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
export default config; 