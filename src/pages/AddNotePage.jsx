import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import AddNoteForm from "../components/AddNoteForm";

function AddNotePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleAddNote = () => {
    addNote({
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    });
    navigate("/");
  };

  return (
    <AddNoteForm
      title={title}
      body={body}
      setTitle={setTitle}
      setBody={setBody}
      handleAddNote={handleAddNote}
    />
  );
}

export default AddNotePage;
