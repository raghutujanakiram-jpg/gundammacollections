import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { theme, toggleTheme, language } = useShop();

  const isDark = theme === 'dark';

  const labelText = isDark
    ? language === 'te'
      ? 'లైట్ మోడ్'
      : language === 'hi'
      ? 'लाइट मोड'
      : 'Light Mode'
    : language === 'te'
    ? 'డార్క్ మోడ్'
    : language === 'hi'
    ? 'डार्क मोड'
    : 'Dark Mode';

  const titleText = isDark
    ? 'Switch to Light Theme'
    : 'Switch to Dark Theme';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`group relative p-2 text-stone-700 dark:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg border border-transparent hover:border-stone-200 dark:hover:border-amber-900/30 transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${className}`}
      aria-label={titleText}
      aria-pressed={isDark}
      title={titleText}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400 transform rotate-0 transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 text-stone-700 transform rotate-0 transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-medium font-sans-clean select-none">
          {labelText}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
