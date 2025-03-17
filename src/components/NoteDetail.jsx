import PropTypes from "prop-types";
import { showFormattedDate } from "../utils";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";

function NoteDetail({ note, onDelete, onArchive, onUnarchive }) {
  const { title, createdAt, body } = note;

  return (
    <>
      <h2 className="detail-page__title">{title}</h2>
      <p className="detail-page__createAt">{showFormattedDate(createdAt)}</p>
      <p className="detail-page__body">{body}</p>
      <div className="add-new-page__action">
        <ArchiveButton
          onArchive={onArchive}
          onUnarchive={onUnarchive}
          note={note}
        />
        <DeleteButton note={note} onDelete={onDelete} />
      </div>
    </>
  );
}

NoteDetail.propTypes = {
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

export default NoteDetail;
