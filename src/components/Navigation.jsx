import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { MdLogout, MdDarkMode, MdLightMode } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import LocaleContext from "../context/LocaleContext";
import ThemeContext from "../context/ThemeContext";

function Navigation({ onLogout, name }) {
  const { locale, toggleLocale } = useContext(LocaleContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <li className="dropdown">
          <button onClick={toggleDropdown} className="dropdown-toggle">
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
