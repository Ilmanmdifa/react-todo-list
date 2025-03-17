import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";

function SaveButton({ handleAddNote }) {
  return (
    <div className="add-new-page__action">
      <button className="action button-fly" onClick={handleAddNote}>
        <FaCheck />
      </button>
    </div>
  );
}

SaveButton.propTypes = {
  handleAddNote: PropTypes.func.isRequired,
};

export default SaveButton;
