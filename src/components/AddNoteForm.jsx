import SaveButton from "./SaveButton";
import PropTypes from "prop-types";
import { useContext } from "react";
import LocaleContext from "../context/LocaleContext";

function AddNoteForm({ title, body, setTitle, setBody, handleAddNote, formError, isSubmitting, titleMaxLength }) {
  const { locale } = useContext(LocaleContext);
  const remainingChars = titleMaxLength - title.length;

  return (
    <div className="add-new-page__input add-new-page__card">
      <div className="field-row">
        <label className="field-label" htmlFor="note-title">
          {locale === "id" ? "Judul" : "Title"}
        </label>
        <span className={`char-limit${remainingChars <= 5 ? " char-limit--warn" : ""}`}>
          {locale === "id" ? "Sisa: " : "Left: "}{remainingChars}
        </span>
      </div>
      <input
        id="note-title"
        type="text"
        placeholder={locale === "id" ? "Catatan rahasia" : "Secret note"}
        className="add-new-page__input__title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={titleMaxLength}
        aria-label={locale === "id" ? "Judul catatan" : "Note title"}
      />
      <label className="field-label" htmlFor="note-body">
        {locale === "id" ? "Isi catatan" : "Content"}
      </label>
      <textarea
        id="note-body"
        className="add-new-page__input__body"
        placeholder={
          locale === "id" ? "Sebenarnya saya adalah ..." : "I am actually ..."
        }
        value={body}
        onChange={(e) => setBody(e.target.value)}
        aria-label={locale === "id" ? "Isi catatan" : "Note body"}
      ></textarea>
      {formError && <p className="form-error" role="alert">❌ {formError}</p>}
      <SaveButton
        handleAddNote={handleAddNote}
        disabled={isSubmitting}
        label={
          isSubmitting
            ? locale === "id"
              ? "Menyimpan..."
              : "Saving..."
            : locale === "id"
              ? "Simpan Catatan"
              : "Save Note"
        }
      />
    </div>
  );
}

AddNoteForm.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setBody: PropTypes.func.isRequired,
  handleAddNote: PropTypes.func.isRequired,
  formError: PropTypes.string,
  isSubmitting: PropTypes.bool,
  titleMaxLength: PropTypes.number.isRequired,
};

export default AddNoteForm;
