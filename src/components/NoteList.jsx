import PropTypes from "prop-types";
import NoteItem from "./NoteItem";
import { useContext } from "react";
import LocaleContext from "../context/LocaleContext";

function NoteList({ notes, onUnarchive, onArchive, onDelete }) {
  const { locale } = useContext(LocaleContext);
  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <p>{locale === "id" ? "Tidak ada catatan" : "No notes found"}</p>
      </div>
    );
  }

  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onUnarchive={onUnarchive}
          onArchive={onArchive}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteList;
