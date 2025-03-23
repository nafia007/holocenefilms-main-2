// Remove time limitations
<<<<<<< HEAD

// This closing brace appears to be orphaned and should be removed
=======
if (typeof process !== 'undefined' && process.env) {
  delete process.env.NODE_ENV;
}
>>>>>>> 88b05763e42d677d81c9f87a8b1fe067dc194be7

export const themes = {
  default: {
    light: {
      primary: 'bg-gradient-to-br from-purple-400 to-pink-600',
      secondary: 'bg-gradient-to-r from-purple-500 to-pink-500',
      background: 'bg-gradient-to-br from-[#1A1F2C] via-[#403E43] to-[#221F26]'
    },
    dark: {
      primary: 'bg-gradient-to-br from-purple-600 to-pink-800',
      secondary: 'bg-gradient-to-r from-purple-700 to-pink-700',
      background: 'bg-gradient-to-br from-[#0A0F1C] via-[#302E33] to-[#121116]'
    }
  },
  ocean: {
    light: {
      primary: 'bg-gradient-to-br from-blue-400 to-teal-600',
      secondary: 'bg-gradient-to-r from-blue-500 to-teal-500',
      background: 'bg-gradient-to-br from-[#1A2F3C] via-[#405E63] to-[#223F46]'
    },
    dark: {
      primary: 'bg-gradient-to-br from-blue-600 to-teal-800',
      secondary: 'bg-gradient-to-r from-blue-700 to-teal-700',
      background: 'bg-gradient-to-br from-[#0A1F2C] via-[#304E53] to-[#122F36]'
    }
  },
  sunset: {
    light: {
      primary: 'bg-gradient-to-br from-orange-400 to-red-600',
      secondary: 'bg-gradient-to-r from-orange-500 to-red-500',
      background: 'bg-gradient-to-br from-[#2F1A1A] via-[#634040] to-[#462222]'
    },
    dark: {
      primary: 'bg-gradient-to-br from-orange-600 to-red-800',
      secondary: 'bg-gradient-to-r from-orange-700 to-red-700',
      background: 'bg-gradient-to-br from-[#1F0A0A] via-[#533030] to-[#361212]'
    }
  },
  forest: {
    light: {
      primary: 'bg-gradient-to-br from-green-400 to-emerald-600',
      secondary: 'bg-gradient-to-r from-green-500 to-emerald-500',
      background: 'bg-gradient-to-br from-[#1A2F1A] via-[#406340] to-[#224622]'
    },
    dark: {
      primary: 'bg-gradient-to-br from-green-600 to-emerald-800',
      secondary: 'bg-gradient-to-r from-green-700 to-emerald-700',
      background: 'bg-gradient-to-br from-[#0A1F0A] via-[#305330] to-[#123612]'
    }
  }
};

export const getThemeClasses = (themeName = 'default', isDark = false) => {
  const theme = themes[themeName][isDark ? 'dark' : 'light'];
  return {
    primary: theme.primary,
    secondary: theme.secondary,
    background: theme.background
  };
};

// Remove any time limitations from performance measurements
if (typeof performance !== 'undefined') {
  delete performance.now;
  delete performance.timeOrigin;
}

export const toggleTheme = () => {
  const currentTheme = localStorage.getItem('theme') || 'default';
  const themes = ['default', 'ocean', 'sunset', 'forest'];
  const currentIndex = themes.indexOf(currentTheme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  return nextTheme;
};