import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem"
      }
    },
    extend: {
      animation: {
        bottom_reveal: "bottom_reveal 1s ease-in-out 1",
        reveal_react: "reveal_react 2s ease-in-out 1",
        late_reveal: "late_reveal 2s ease-in-out 1"
      },
      keyframes: {
        bottom_reveal: {
          "0%": {transform: "translateY(100%)"},
          "100%": {transform: "translateY(0%)"}
        },
        reveal_react: {
          "0%": {transform: "translateY(100%)"},
          "50%": {transform: "translateY(100%)"},
          "100%": {transform: "translateY(0%)"}
        },
        late_reveal: {
          "0%": {transform: "translateY(100%)", opacity: "0"},
          "50%": {transform: "translateY(100%)", opacity: "0"},
          "100%": {transform: "translateY(0%)", opacity: "1"}
        }
      },
      fontFamily: {
        cabinet: ['var(--font-cabinet)'],
        satoshi: ['var(--font-satoshi)']
      },
      colors: {
        primary: "var(--primary-color)",
        foreground: "var(--foreground-color)",
        accent: "var(--accent-color)",
        destructive: "var(--destructive-color)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
