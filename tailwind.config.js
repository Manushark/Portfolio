/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#080c14',
          surface: '#0d1117',
          card: '#0f1623',
          cardBorder: '#1a2236',
          hover: '#141d2e',
          muted: '#8b9cb8'
        },
        brand: {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          accent: '#06b6d4',
          glow: 'rgba(59,130,246,0.18)',
          purple: '#a855f7',
          rose: '#f43f5e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-lg': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.035em', fontWeight: '800' }],
        'display-md': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.02em',
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(59,130,246,0.25)',
        'glow-md': '0 0 24px rgba(59,130,246,0.3)',
        'glow-lg': '0 0 48px rgba(59,130,246,0.2)',
        'glow-purple': '0 0 24px rgba(139,92,246,0.3)',
        'card': '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 24px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.08)',
        'card-dark': '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)',
        'card-dark-hover': '0 4px 24px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.35)',
        'btn-primary': '0 1px 2px rgba(0,0,0,0.1), 0 4px 16px rgba(59,130,246,0.35)',
        'btn-primary-hover': '0 2px 4px rgba(0,0,0,0.12), 0 8px 24px rgba(59,130,246,0.45)',
        'inset-glow': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
        'shimmer-dark': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")"
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-fast': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-right': 'slideRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient-shift': 'gradientShift 4s ease infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0,0,0.2,1) infinite',
        'draw-line': 'drawLine 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'typewriter': 'typewriter 3s steps(30) forwards',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-28px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-0.5deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        drawLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-back': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
