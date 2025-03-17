import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils/index";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";

function NoteItem({ note, onArchive, onDelete, onUnarchive }) {
  return (
    <div className="note-item" key={note.id}>
      <h3>
        <Link to={`/notes/${note.id}`}>{note.title}</Link>
      </h3>
      <p className="note-item__createdAt">
        {showFormattedDate(note.createdAt)}
      </p>
      <p className="note-item__body">{note.body}</p>
      <ArchiveButton
        note={note}
        onArchive={onArchive}
        onUnarchive={onUnarchive}
      />
      <DeleteButton note={note} onDelete={onDelete} />
    </div>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
  }).isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteItem;
