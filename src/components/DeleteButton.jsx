import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";

function DeleteButton({ note, onDelete }) {
  return (
    <button
      className="action delete button-fly"
      onClick={() => onDelete(note.id)}
    >
      <MdDelete />
    </button>
  );
}

DeleteButton.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
