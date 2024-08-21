import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Season from "./Components/Season";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import DriverPage from "./Components/DriverPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Router>
          <Navbar />
          <Routes>
              <Route index path="/home" element={<Home/>} />
              <Route path="/season/:id" element={<Season/>}/>
              <Route path="/driver/:id" element={<DriverPage/>}/>
          </Routes>
      </Router>
  </React.StrictMode>
);
