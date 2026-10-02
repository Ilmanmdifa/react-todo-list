import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { MdLogout, MdDarkMode, MdLightMode, MdExpandLess, MdExpandMore } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
import LocaleContext from "../context/LocaleContext";
import ThemeContext from "../context/ThemeContext";

function Navigation({ onLogout, name }) {
  const { locale, toggleLocale } = useContext(LocaleContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { pathname } = useLocation();
  const activeLabel =
    pathname === "/notes/new"
      ? locale === "id"
        ? "Tambah Catatan"
        : "Add Note"
      : pathname === "/notes/archived"
        ? locale === "id"
          ? "Arsip"
          : "Archived"
        : locale === "id"
          ? "Beranda"
          : "Home";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileNavRef = useRef(null);

  useEffect(() => {
    if (!dropdownOpen && !mobileOpen) {
      return undefined;
    }
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen, mobileOpen]);

  const handleLogout = () => {
    onLogout();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navigation" ref={mobileNavRef}>
      <button
        className="nav-burger"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
        aria-label="Toggle navigation menu"
      >
        <span className="nav-burger__label">{activeLabel}</span>
        {mobileOpen ? <MdExpandLess /> : <MdExpandMore />}
      </button>
      <ul className={mobileOpen ? "nav-links open" : "nav-links"}>
        <li>
          <NavLink
            to="/"
            end
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => (isActive ? "nav-active" : undefined)}
          >
            {locale === "id" ? "Beranda" : "Home"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notes/new"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => (isActive ? "nav-active" : undefined)}
          >
            {locale === "id" ? "Tambah Catatan" : "Add Note"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notes/archived"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => (isActive ? "nav-active" : undefined)}
          >
            {locale === "id" ? "Arsip" : "Archived"}
          </NavLink>
        </li>
      </ul>
      <div className="dropdown account-menu" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="dropdown-toggle avatar-toggle"
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            aria-label="Account menu"
          >
            <span className="avatar" aria-hidden="true">
              {(name || "?").trim().charAt(0).toUpperCase()}
            </span>
          </button>
          {dropdownOpen && (
            <div className={`dropdown-menu ${theme}`}>
              <div className="dropdown-header">{name}</div>
              <button onClick={toggleLocale}>
                <IoLanguage />
                {locale === "id" ? "English" : "Indonesia"}
              </button>
              <button onClick={toggleTheme}>
                {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
              <button onClick={handleLogout}>
                <MdLogout /> {locale === "id" ? "Keluar" : "Logout"}
              </button>
            </div>
          )}
        </div>
    </nav>
  );
}

Navigation.propTypes = {
  onLogout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
