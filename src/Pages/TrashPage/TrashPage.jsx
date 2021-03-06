import React from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { NotesCard } from "../../Components";
import { useAuth, useNotes } from "../../contexts";
import { addNotesService } from "../../services";
import "./TrashPage.css";

const TrashPage = () => {
  const {
    authState: { encodedToken },
  } = useAuth();
  const {
    noteState: { trash },
    noteDispatch,
  } = useNotes();
  const deleteFromTrashhandler = (notes) => {
    const data = trash.filter((note) => note._id !== notes._id);
    noteDispatch({ type: "DELETE_FROM_TRASH", payload: data });
    toast.success("Deleted Note From Trash ");
  };
  const restoreFromTrash = async (notes) => {
    const response = await addNotesService(notes, encodedToken);
    noteDispatch({
      type: "ADD_NOTE",
      payload: response.data.notes,
    });
    deleteFromTrashhandler(notes);
  };
  const location = useLocation();
  return (
    <div className=" trash-wrapper  ">
      {trash.length > 0 ? (
        trash.map((note) => (
          <NotesCard
            className="trash-card"
            key={note._id}
            notes={note}
            path={location.pathname}
            deleteFromTrashhandler={deleteFromTrashhandler}
            restoreFromTrash={restoreFromTrash}
          />
        ))
      ) : (
        <p className="trash-text">Trash is empty!</p>
      )}
    </div>
  );
};

export { TrashPage };
