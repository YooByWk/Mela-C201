import logo from "./logo.svg";
import "./App.css";
import { Reset } from "styled-reset";
import { Fragment } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";

function App() {
  return (
    <Fragment>
        <Reset />
      <BrowserRouter>
      <Routes>
        <Route path='/Home' element={<Homepage />}> </Route>
        </Routes>
      </BrowserRouter>

        <div className="App">
          <h1>test</h1>
        </div>
    </Fragment>
  );
}

export default App;
