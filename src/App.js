import React, { Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./components/Pages/MainPage";
import Navbar from "./components/layout/Navbarr";
import APIState from "../src/context/api/ApiState";

const App = () => {
  return (
    <Fragment>
      <APIState>
        <Navbar />
        <MainPage />
      </APIState>
    </Fragment>
  );
};

export default App;
