/** @type {import('tailwindcss').Config} */

import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['JetBrains Mono', 'monospace'],
        'display': ['Syne', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'bg-base': '#0a0a0a',
        'surface-1': '#111111',
        'surface-2': '#161616',
        'surface-3': '#1a1a1a',
        'accent-cyan': '#00d4ff',
        'accent-teal': '#00ffd5',
        'text-primary': '#e8e8e8',
        'text-muted': '#888888',
        'border-subtle': 'rgba(255,255,255,0.08)',
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'glitch': 'glitch 4s steps(1) infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'border-sweep': 'borderSweep 0.4s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'typewriter': 'typewriter 3s steps(40) forwards',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 90%, 100%': { transform: 'translate(0)' },
          '92%': { transform: 'translate(-2px, 1px)', filter: 'hue-rotate(90deg)' },
          '94%': { transform: 'translate(2px, -1px)' },
          '96%': { transform: 'translate(-1px, 2px)', filter: 'hue-rotate(180deg)' },
          '98%': { transform: 'translate(1px, -1px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [tailwindScrollbar],
}
