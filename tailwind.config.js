export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primaryBackground: 'linear-gradient(135deg, #243143, #1f2a38 )',
        primaryColor: '#0a9396',
        white: '#ffffff',
        hoverColor: '#6ca894',
        secondary: '#eee',
        success: '#10b981',
        destructive: '#ae2012',
        borderGray: '#D1D5DB',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        primaryForeground: ' #555',
        accent: '#2563eb',
        accentHover: '#1d4ed8',
        background: '#f9f9f9',
        textBlack: '#1f2937',
        colorMuted: '#6b7280',
        blue: '#3b82f6',
        secondaryBackground: '#1f2a38',
        hover: '#1d4ed8',
        dark: '#0e1414',
        darkTheme: '#182121',
      }
    },
    screens: {
      xxs: '325px',
      xs: '475px',
      sm: '640px',   // Small devices (landscape phones)
      md: '768px',   // Medium devices (tablets)
      lg: '1024px',  // Large devices (desktops)
      xl: '1280px',  // Extra large devices
      '2xl': '1536px', // 2x Extra large screens
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
