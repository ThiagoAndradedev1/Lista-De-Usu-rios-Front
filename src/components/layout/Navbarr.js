import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Navbarr = () => {
  return (
    <Fragment>
      <Navbar expand='lg' variant='light' bg='light'>
        <Navbar.Brand href='#'>Usuários CRUD</Navbar.Brand>
      </Navbar>
    </Fragment>
  );
};

export default Navbarr;
