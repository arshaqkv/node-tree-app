import { useDarkMode } from "../context/ThemeContext";
import { Moon, SunMedium } from "lucide-react";

const DarkModeToggler = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="bg-gray-200 dark:bg-gray-900 rounded-md px-4 cursor-pointer hover:text-blue-300 dark:hover:text-yellow-600"
    >
      {darkMode ? <SunMedium size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default DarkModeToggler;
