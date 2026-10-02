import PropTypes from "prop-types";
import { useContext } from "react";
import { MdSearch, MdClose } from "react-icons/md";
import LocaleContext from "../context/LocaleContext";

function SearchBar({ searchTerm, onSearchChange }) {
  const { locale } = useContext(LocaleContext);

  return (
    <section className="search-bar search-bar--with-icon">
      <span className="search-bar__icon" aria-hidden="true">
        <MdSearch />
      </span>
      <input
        type="text"
        placeholder={locale === "id" ? "Cari catatan..." : "Search notes..."}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label={locale === "id" ? "Cari catatan" : "Search notes"}
      />
      {searchTerm && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onSearchChange("")}
          aria-label={locale === "id" ? "Bersihkan pencarian" : "Clear search"}
          title={locale === "id" ? "Bersihkan" : "Clear"}
        >
          <MdClose />
        </button>
      )}
    </section>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
