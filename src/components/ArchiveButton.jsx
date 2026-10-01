import PropTypes from "prop-types";
import { MdOutlineArchive, MdOutlineUnarchive } from "react-icons/md";
function ArchiveButton({ note, onArchive, onUnarchive }) {
  return (
    <>
      {note.archived ? (
        <button
          onClick={() => onUnarchive(note.id)}
          className="action archive button-fly"
          aria-label={`Unarchive note ${note.title}`}
          title="Unarchive note"
        >
          <MdOutlineUnarchive />
        </button>
      ) : (
        <button
          onClick={() => onArchive(note.id)}
          className="action archive button-fly"
          aria-label={`Archive note ${note.title}`}
          title="Archive note"
        >
          <MdOutlineArchive />
        </button>
      )}
    </>
  );
}

ArchiveButton.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }).isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default ArchiveButton;
