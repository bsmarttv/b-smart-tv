/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
extend: {
        colors: {
          'iptv-dark': '#050505',
          'iptv-card': '#0F1115',
          'iptv-blue': '#3B82F6',
          'iptv-cyan': '#06B6D4',
          'iptv-text-muted': '#94A3B8',
        },
        backgroundImage: {
          'blue-gradient': 'linear-gradient(to right, #3B82F6, #06B6D4)',
        },
        // --- هادشي هو اللي غتزيد دابا (بلا ما تمسح اللي فوق) ---
        animation: {
          marquee: 'marquee 30s linear infinite',
        },
        keyframes: {
          marquee: {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-50%)' },
          },
        },
        keyframes: {
    'fade-in-up': {
      '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
      '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
    }
  },
  animation: {
    'fade-in-up': 'fade-in-up 1s ease-out forwards',
  },
  animation: {
      marquee: 'marquee 35s linear infinite',
    },
    keyframes: {
      marquee: {
        '0%': { transform: 'translateX(0%)' },
        '100%': { transform: 'translateX(-50%)' }, // كيمشي للنص ويرجع بسلاسة لا نهائية
      }
    }
        
        // --------------------------------------------------
      },
    
  },
  plugins: [],
}
