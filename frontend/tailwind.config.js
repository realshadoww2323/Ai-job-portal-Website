/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#06b6d4',
        'theme-bg': 'rgb(var(--bg-primary) / <alpha-value>)',
        'theme-card': 'rgb(var(--bg-card) / <alpha-value>)',
        'theme-text': 'rgb(var(--text-main) / <alpha-value>)',
        'theme-text-muted': 'rgb(var(--text-muted) / <alpha-value>)',
        'theme-border': 'rgb(var(--border-color) / <alpha-value>)',
        'theme-accent': 'rgb(var(--primary-accent) / <alpha-value>)',
        'theme-accent-sec': 'rgb(var(--secondary-accent) / <alpha-value>)',
        'theme-success': 'rgb(var(--success-color) / <alpha-value>)',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
    },
  },
  plugins: [],
}
