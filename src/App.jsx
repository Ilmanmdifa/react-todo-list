import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import AddNotePage from "./pages/AddNotePage";
import ArchivedNotesPage from "./pages/ArchivedNotesPage";
import NoteDetailPage from "./pages/NoteDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./hooks/useAuth";
import React, { useState, useEffect } from "react";
import LocaleContext from "./context/LocaleContext";
import ThemeContext from "./context/ThemeContext";

function App() {
  const { authedUser, initializing, onLoginSuccess, onLogout } = useAuth();
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      return prevLocale === "id" ? "en" : "id";
    });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const localeContextValue = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  const themeContextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  if (initializing) {
    return null;
  }

  if (authedUser === null) {
    return (
      <Router>
        <div className="note-app-login">
          <title>Login Note App</title>
          <main>
            <Routes>
              <Route
                path="/*"
                element={<LoginPage loginSuccess={onLoginSuccess} />}
              />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <LocaleContext.Provider value={localeContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <div className={`app-container logged ${theme}`}>
            <header>
              <h1>
                <Link>
                  {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
                </Link>
              </h1>
              <Navigation
                onLogout={onLogout}
                name={authedUser ? authedUser.name : "Guest"}
              />
            </header>
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes/:id" element={<NoteDetailPage />} />
                <Route path="/notes/new" element={<AddNotePage />} />
                <Route path="/notes/archived" element={<ArchivedNotesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </ThemeContext.Provider>
      </LocaleContext.Provider>
    </Router>
  );
}

export default App;
