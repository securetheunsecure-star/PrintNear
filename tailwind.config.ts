import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eaf6ff',
          100: '#d6ecff',
          500: '#1d4ed8',
          600: '#1e3a8a',
          700: '#153067'
        },
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444'
      },
      boxShadow: {
        soft: '0 14px 38px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
