import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import AddNoteForm from "../components/AddNoteForm";
import LocaleContext from "../context/LocaleContext";

const TITLE_MAX_LENGTH = 50;

function AddNotePage() {
  const { locale } = useContext(LocaleContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAddNote = async () => {
    if (!title.trim()) {
      setFormError(locale === "id" ? "Judul tidak boleh kosong." : "Title is required.");
      return;
    }
    setFormError(null);
    setIsSubmitting(true);
    try {
      const { error } = await addNote({
        title: title.trim(),
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      });
      if (error) {
        setFormError(
          locale === "id" ? "Gagal menyimpan catatan. Coba lagi." : "Couldn't save the note. Try again."
        );
        return;
      }
      navigate("/");
    } catch {
      setFormError(
        locale === "id"
          ? "Gagal menyimpan catatan. Periksa koneksi lalu coba lagi."
          : "Couldn't save the note. Check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AddNoteForm
      title={title}
      body={body}
      setTitle={setTitle}
      setBody={setBody}
      handleAddNote={handleAddNote}
      formError={formError}
      isSubmitting={isSubmitting}
      titleMaxLength={TITLE_MAX_LENGTH}
    />
  );
}

export default AddNotePage;
