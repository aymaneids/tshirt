/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
      colors: {
        dark: {
          DEFAULT: '#1a1a1a',
          50: '#2a2a2a',
          100: '#262626',
          200: '#222222',
          300: '#1e1e1e',
          400: '#1a1a1a',
          500: '#161616',
          600: '#121212',
          700: '#0e0e0e',
          800: '#0a0a0a',
          900: '#060606',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#404040',
            a: {
              color: '#92400e',
              '&:hover': {
                color: '#78350f',
              },
            },
            h1: {
              color: '#171717',
            },
            h2: {
              color: '#171717',
            },
            h3: {
              color: '#171717',
            },
          },
        },
        dark: {
          css: {
            color: '#e5e7eb',
            a: {
              color: '#fbbf24',
              '&:hover': {
                color: '#f59e0b',
              },
            },
            h1: {
              color: '#f3f4f6',
            },
            h2: {
              color: '#f3f4f6',
            },
            h3: {
              color: '#f3f4f6',
            },
            h4: {
              color: '#f3f4f6',
            },
            strong: {
              color: '#f3f4f6',
            },
            blockquote: {
              color: '#e5e7eb',
              borderLeftColor: '#4b5563',
            },
            hr: {
              borderColor: '#374151',
            },
            pre: {
              backgroundColor: '#1f2937',
            },
            code: {
              color: '#f3f4f6',
              backgroundColor: '#374151',
            },
            thead: {
              color: '#f3f4f6',
              borderBottomColor: '#4b5563',
            },
            tbody: {
              tr: {
                borderBottomColor: '#374151',
              },
            },
            p: {
              color: '#e5e7eb',
            },
            ul: {
              color: '#e5e7eb',
            },
            ol: {
              color: '#e5e7eb',
            },
            li: {
              color: '#e5e7eb',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};