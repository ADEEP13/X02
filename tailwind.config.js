module.exports = {
  content: [
    "./pages/*.{html,js}",
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Trust and professional depth
        primary: {
          DEFAULT: "#2563EB", // blue-600
          50: "#EFF6FF", // blue-50
          100: "#DBEAFE", // blue-100
          200: "#BFDBFE", // blue-200
          300: "#93C5FD", // blue-300
          400: "#60A5FA", // blue-400
          500: "#3B82F6", // blue-500
          600: "#2563EB", // blue-600
          700: "#1D4ED8", // blue-700
          800: "#1E40AF", // blue-800
          900: "#1E3A8A", // blue-900
        },
        // Secondary Colors - Growth and positive progress
        secondary: {
          DEFAULT: "#059669", // emerald-600
          50: "#ECFDF5", // emerald-50
          100: "#D1FAE5", // emerald-100
          200: "#A7F3D0", // emerald-200
          300: "#6EE7B7", // emerald-300
          400: "#34D399", // emerald-400
          500: "#10B981", // emerald-500
          600: "#059669", // emerald-600
          700: "#047857", // emerald-700
          800: "#065F46", // emerald-800
          900: "#064E3B", // emerald-900
        },
        // Accent Colors - Insight moments and premium features
        accent: {
          DEFAULT: "#7C3AED", // violet-600
          50: "#F5F3FF", // violet-50
          100: "#EDE9FE", // violet-100
          200: "#DDD6FE", // violet-200
          300: "#C4B5FD", // violet-300
          400: "#A78BFA", // violet-400
          500: "#8B5CF6", // violet-500
          600: "#7C3AED", // violet-600
          700: "#6D28D9", // violet-700
          800: "#5B21B6", // violet-800
          900: "#4C1D95", // violet-900
        },
        // Background Colors
        background: "#FAFAFA", // gray-50 - Clean canvas for focused work
        surface: "#FFFFFF", // white - Content elevation and breathing room
        
        // Text Colors
        text: {
          primary: "#1F2937", // gray-800 - Clear hierarchy and extended reading
          secondary: "#6B7280", // gray-500 - Supporting information without noise
        },
        
        // Status Colors
        success: "#10B981", // emerald-500 - Achievement celebration and positive reinforcement
        warning: "#F59E0B", // amber-500 - Gentle guidance without alarm
        error: "#EF4444", // red-500 - Supportive correction and helpful concern
        
        // Border Colors
        border: "#E5E7EB", // gray-200
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0, 0, 0, 0.1)',
        elevated: '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        fast: '200ms',
        normal: '300ms',
        slow: '400ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
    },
  },
  plugins: [],
}
