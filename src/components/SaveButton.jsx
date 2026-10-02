import PropTypes from "prop-types";

function SaveButton({ handleAddNote, disabled, label }) {
  return (
    <div className="add-new-page__action">
      <button
        className="action action--labeled"
        onClick={handleAddNote}
        disabled={disabled}
        aria-label={label}
      >
        {disabled ? "..." : label}
      </button>
    </div>
  );
}

SaveButton.propTypes = {
  handleAddNote: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

SaveButton.defaultProps = {
  disabled: false,
  label: "Simpan",
};

SaveButton.defaultProps = {
  disabled: false,
};

export default SaveButton;
