import {
  getActiveNotes,
  archiveNote,
  unarchiveNote,
  deleteNote,
} from "../utils/network-data";
import { useNavigate } from "react-router-dom";
import AddButton from "../components/AddButton";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { useCallback, useEffect, useMemo, useState, useContext } from "react";
import LocaleContext from "../context/LocaleContext";

function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { locale } = useContext(LocaleContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { error, data } = await getActiveNotes();
        if (error) {
          setError(
            locale === "id"
              ? `Gagal memuat catatan: ${error}`
              : `Failed to load notes: ${error}`
          );
        } else {
          setNotes(data || []);
        }
      } catch (error) {
        setError(
          locale === "id"
            ? `Terjadi kesalahan saat memuat catatan: ${error}`
            : `An error occurred while fetching notes: ${error}`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [locale]);

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, notes]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        const { error } = await deleteNote(id);
        if (error) {
          setError(
            locale === "id"
              ? "Gagal menghapus catatan"
              : "Failed to delete note"
          );
        } else {
          setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        }
      } catch (error) {
        setError(
          locale === "id"
            ? `Terjadi kesalahan saat menghapus catatan: ${error}`
            : `An error occurred while deleting note: ${error}`
        );
      }
    },
    [locale]
  );

  const handleArchive = useCallback(
    async (id) => {
      try {
        const { error } = await archiveNote(id);
        if (error) {
          setError(
            locale === "id"
              ? "Gagal mengarsipkan catatan"
              : "Failed to archive note"
          );
        } else {
          setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
          navigate("/");
        }
      } catch (error) {
        setError(
          locale === "id"
            ? `Terjadi kesalahan saat mengarsipkan catatan: ${error}`
            : `An error occurred while archiving note: ${error}`
        );
      }
    },
    [navigate, locale]
  );

  const handleUnarchive = useCallback(
    async (id) => {
      try {
        const { error } = await unarchiveNote(id);
        if (error) {
          setError(
            locale === "id"
              ? "Gagal mengembalikan catatan dari arsip"
              : "Failed to unarchive note"
          );
        } else {
          const { data: activeNotes } = await getActiveNotes();
          setNotes(activeNotes);
          navigate("/");
        }
      } catch (error) {
        setError(
          locale === "id"
            ? `Terjadi kesalahan saat mengembalikan catatan dari arsip: ${error}`
            : `An error occurred while unarchiving note: ${error}`
        );
      }
    },
    [navigate, locale]
  );

  if (loading) {
    return <p>{locale === "id" ? "Memuat catatan..." : "Loading notes..."}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="homepage">
      <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      {filteredNotes.length > 0 ? (
        <NoteList
          notes={filteredNotes}
          onDelete={handleDelete}
          onArchive={handleArchive}
          onUnarchive={handleUnarchive}
        />
      ) : (
        <p>
          {locale === "id"
            ? "Tidak ada catatan aktif"
            : "No active notes found"}
        </p>
      )}
      <AddButton />
    </section>
  );
}

export default HomePage;
