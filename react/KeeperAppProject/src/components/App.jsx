import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";

function App(){
    return(
        <div>
            <Header/>
            <Footer/>
            <Note className=""/>
        </div>
    )
}

export default App;