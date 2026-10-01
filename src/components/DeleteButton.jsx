import PropTypes from "prop-types";
import { MdDelete } from "react-icons/md";

function DeleteButton({ note, onDelete }) {
  function handleClick() {
    if (!window.confirm("Delete this note? This cannot be undone.")) {
      return;
    }
    onDelete(note.id);
  }

  return (
    <button
      className="action delete button-fly"
      onClick={handleClick}
      aria-label={`Delete note ${note.title}`}
      title="Delete note"
    >
      <MdDelete />
    </button>
  );
}

DeleteButton.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
