import React, { useContext, useEffect, useState, useRef } from "react";
import { Modal } from "bootstrap";
import { MyContext } from "../context/notes/Notescontext";
import Noteitem from "./Noteitem";
const Allnotes = () => {
  const context = useContext(MyContext);
  // eslint-disable-next-line
  const { notes, getNotes, EditNote } = context;
  const [note, setnotes] = useState({
    id: "",
    eauthor: "",
    etitle: "",
    edescription: "",
    etag: "genral",
  });
  const onChange = (e) => {
    setnotes({ ...note, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getNotes();
  });
  const refclose = useRef(null);
  const updateNote = () => {
    console.log("click");
    EditNote(note.id, note.eauthor, note.etitle, note.edescription, note.etag);
    // const myModal = new Modal("#exampleModal", "toggle");
    refclose.current.click();
  };
  const editNote = (currentnote) => {
    const myModal = new Modal("#exampleModal", "toggle");
    myModal.show();
    setnotes({
      id: currentnote._id,
      eauthor: currentnote.author,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };
  return (
    <>
      <button
        style={{ display: "none" }}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">
                    Author
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eauthor"
                    name="eauthor"
                    value={note.eauthor}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateNote}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        {notes.map((ele, i) => {
          return <Noteitem note={ele} key={i} editNote={editNote} />;
        })}
        ;
      </div>
    </>
  );
};
export default Allnotes;
