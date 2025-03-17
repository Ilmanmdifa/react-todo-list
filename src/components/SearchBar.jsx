import PropTypes from "prop-types";
import { useContext } from "react";
import LocaleContext from "../context/LocaleContext";

function SearchBar({ searchTerm, onSearchChange }) {
  const { locale } = useContext(LocaleContext);

  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder={locale === "id" ? "Cari catatan..." : "Search notes..."}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </section>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
