import { useContext, useState } from "react";
import { MyContext } from "../context/notes/Notescontext";
import Alert from "./Alert";
const Home = () => {
  const context = useContext(MyContext);
  const { addNote,alerts } = context;
  const [notes, setnotes] = useState({
    id:"",
    author: "",
    title: "",
    description: "",
    tag: "genral",
  });
  const addingNotes = () => {
    addNote(notes.author, notes.title, notes.description, notes.tag);
  };
  const onchange = (e) => {
    setnotes({ ...notes, [e.target.name]: e.target.value });
  };  
  return (
    <>
    <Alert alert={alerts}/>
    <div className="container my-5">
      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          type="text"
          className="form-control"
          id="author"
          name="author"
          placeholder="Write the name of the author"
          onChange={onchange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          placeholder="Write the Title"
          onChange={onchange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          placeholder="Write the Note"
          onChange={onchange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tags
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          placeholder="Enter the Tags"
          onChange={onchange}
        />
      </div>
      <div className="col-12">
        <button className="btn btn-primary" type="submit" onClick={addingNotes}>
          Post Note
        </button>
      </div>
    </div>
    </>
  );
};
export default Home;
