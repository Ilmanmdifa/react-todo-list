import { useEffect, useMemo, useState, useContext } from "react";
import {
  getArchivedNotes,
  deleteNote,
  unarchiveNote,
  archiveNote,
} from "../utils/network-data";
import SearchBar from "../components/SearchBar";
import NoteList from "../components/NoteList";
import LocaleContext from "../context/LocaleContext";

function ArchivedNotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      try {
        setIsLoading(true);
        const response = await getArchivedNotes();
        if (response && Array.isArray(response.data)) {
          setArchivedNotes(response.data);
        } else {
          setArchivedNotes([]);
        }
      } catch (error) {
        console.error("Failed to fetch archivedNotes:", error);
        setError(
          locale === "id"
            ? "Gagal memuat catatan arsip"
            : "Failed to load archived notes"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchArchivedNotes();
  }, [locale]);

  const handleUnarchive = async (id) => {
    try {
      const response = await unarchiveNote(id);
      if (response.error) {
        console.error("Error from unarchiveNote:", response.error);
        setError(
          locale === "id"
            ? "Gagal mengembalikan catatan dari arsip"
            : "Failed to unarchive note"
        );
      } else {
        setArchivedNotes((prevNotes) =>
          prevNotes.filter((note) => note.id !== id)
        );
      }
    } catch (error) {
      console.error("Failed to unarchive note:", error);
      setError(
        locale === "id"
          ? "Terjadi kesalahan saat mengembalikan catatan dari arsip"
          : "An unexpected error occurred while unarchiving the note"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await deleteNote(id);
      if (error) {
        setError(
          locale === "id" ? "Gagal menghapus catatan" : "Failed to delete note"
        );
      } else {
        setArchivedNotes((prevNotes) =>
          prevNotes.filter((note) => note.id !== id)
        );
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
      setError(
        locale === "id"
          ? "Terjadi kesalahan saat menghapus catatan"
          : "An error occurred while deleting note"
      );
    }
  };

  const handleArchive = async (id) => {
    try {
      const { error } = await archiveNote(id);
      if (error) {
        setError(
          locale === "id"
            ? "Gagal mengarsipkan catatan"
            : "Failed to archive note"
        );
      } else {
        setArchivedNotes((prevNotes) =>
          prevNotes.filter((note) => note.id !== id)
        );
      }
    } catch (error) {
      console.error("Failed to archive note:", error);
      setError(
        locale === "id"
          ? "Terjadi kesalahan saat mengarsipkan catatan"
          : "An error occurred while archiving note"
      );
    }
  };

  const filteredNotes = useMemo(() => {
    return archivedNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [archivedNotes, searchTerm]);

  return (
    <section className="homepage">
      <h1>{locale === "id" ? "Catatan Arsip" : "Archived Notes"}</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {isLoading && (
        <p>{locale === "id" ? "Memuat catatan..." : "Loading notes..."}</p>
      )}
      {error && <p className="error">{error}</p>}

      {filteredNotes.length === 0 ? (
        <p>
          {locale === "id"
            ? "Tidak ada catatan arsip ditemukan."
            : "No archived notes found."}
        </p>
      ) : (
        <NoteList
          notes={filteredNotes}
          onUnarchive={handleUnarchive}
          onArchive={handleArchive}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
}

export default ArchivedNotesPage;
