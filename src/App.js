import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/Home"
import About from "./components/about";
import Allnotes from "./components/allnotes";
import NoteState from "./context/notes/NotesState";
import Login from "./components/login";
import Signup from "./components/createruser";
function App() {
  return (
    <NoteState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/allnotes" element={<Allnotes />} /> 
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            
          </Routes>
        </BrowserRouter>
        </NoteState>
  );
}

export default App;
