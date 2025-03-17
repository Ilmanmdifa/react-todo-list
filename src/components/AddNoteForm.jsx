import SaveButton from "./SaveButton";
import PropTypes from "prop-types";
import { useContext } from "react";
import LocaleContext from "../context/LocaleContext";

function AddNoteForm({ title, body, setTitle, setBody, handleAddNote }) {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="add-new-page__input">
      <input
        type="text"
        placeholder={locale === "id" ? "Catatan rahasia" : "Secret note"}
        className="add-new-page__input__title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="add-new-page__input__body"
        placeholder={
          locale === "id" ? "Sebenarnya saya adalah ..." : "I am actually ..."
        }
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <SaveButton handleAddNote={handleAddNote} />
    </div>
  );
}

AddNoteForm.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setBody: PropTypes.func.isRequired,
  handleAddNote: PropTypes.func.isRequired,
};

export default AddNoteForm;
