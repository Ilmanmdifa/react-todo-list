import { Link } from "react-router-dom";
import { MdOutlineNoteAdd } from "react-icons/md";

function AddButton() {
  return (
    <div className="add-new-page__action">
      <Link to="/notes/new" className="action button-fly">
        <MdOutlineNoteAdd className="add-icon" />
      </Link>
    </div>
  );
}

export default AddButton;
