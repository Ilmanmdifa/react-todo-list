import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useEffect, useRef, useState } from "react";
import { MdLogout, MdDarkMode, MdLightMode } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import LocaleContext from "../context/LocaleContext";
import ThemeContext from "../context/ThemeContext";

function Navigation({ onLogout, name }) {
  const { locale, toggleLocale } = useContext(LocaleContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!dropdownOpen) {
      return undefined;
    }
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [dropdownOpen]);

  const handleLogout = () => {
    onLogout();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">{locale === "id" ? "Beranda" : "Home"}</Link>
        </li>
        <li>
          <Link to="/notes/new">
            {locale === "id" ? "Tambah Catatan" : "Add Note"}
          </Link>
        </li>
        <li>
          <Link to="/notes/archived">
            {locale === "id" ? "Arsip" : "Archived"}
          </Link>
        </li>
        <li className="dropdown" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="dropdown-toggle"
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            aria-label="Account menu"
          >
            <IoMdMenu />
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
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  onLogout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
