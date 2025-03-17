import { useNavigate, useParams } from "react-router-dom";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/network-data";
import NoteDetail from "../components/NoteDetail";
import { useEffect, useState, useContext } from "react";
import LocaleContext from "../context/LocaleContext";

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await getNote(id);
        if (data) {
          setNote(data);
        } else {
          navigate("*");
        }
      } catch (error) {
        console.error("Failed to fetch note:", error);
        setError(
          locale === "id" ? "Gagal memuat catatan" : "Failed to load note"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate, locale]);

  const handleDelete = async (id) => {
    try {
      const { error } = await deleteNote(id);
      if (error) {
        setError(
          locale === "id" ? "Gagal menghapus catatan" : "Failed to delete note"
        );
      } else {
        navigate("/");
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

  const handleUnarchive = async (id) => {
    try {
      const { error } = await unarchiveNote(id);
      if (error) {
        setError(
          locale === "id"
            ? "Gagal mengembalikan catatan dari arsip"
            : "Failed to unarchive note"
        );
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to unarchive note:", error);
      setError(
        locale === "id"
          ? "Terjadi kesalahan saat mengembalikan catatan dari arsip"
          : "An error occurred while unarchiving note"
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
        navigate("/");
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

  if (loading) {
    return <p>{locale === "id" ? "Memuat catatan..." : "Loading note..."}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="detail-page">
      <NoteDetail
        note={note}
        onDelete={handleDelete}
        onUnarchive={handleUnarchive}
        onArchive={handleArchive}
      />
    </div>
  );
}

export default NoteDetailPage;
