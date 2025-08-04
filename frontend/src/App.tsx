import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <>
      <Toaster />
      <ThemeProvider>
        <LandingPage />
      </ThemeProvider>
    </>
  );
};

export default App;
