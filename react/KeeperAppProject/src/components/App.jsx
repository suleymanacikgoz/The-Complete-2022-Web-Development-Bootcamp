import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";
import notes from "../notes.js"




function App() {
    return (
        <div>
            <Header />
            {notes.map(noteItem => {
                return <Note
                   key={noteItem.key}
                    title={noteItem.title}
                    content={noteItem.content}
                />
            })}
            <Footer />

        </div>
    )
}

export default App;