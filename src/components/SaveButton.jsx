import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";

function SaveButton({ handleAddNote, disabled }) {
  return (
    <div className="add-new-page__action">
      <button
        className="action button-fly"
        onClick={handleAddNote}
        disabled={disabled}
        aria-label="Save note"
      >
        <FaCheck />
      </button>
    </div>
  );
}

SaveButton.propTypes = {
  handleAddNote: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SaveButton.defaultProps = {
  disabled: false,
};

export default SaveButton;
