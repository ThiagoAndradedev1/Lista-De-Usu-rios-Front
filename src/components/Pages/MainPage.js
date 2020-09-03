import React, { Fragment, useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import apiContext from "../../context/api/apiContext";
import Alert from "react-bootstrap/Alert";

import Spinner from "../layout/Spinner";

const MainPage = () => {
  const {
    peopleInfo,
    isLoading,
    getAllData,
    deletePerson,
    addPerson,
    updatePersonInfo,
  } = useContext(apiContext);
  const [show, setShow] = useState(false);
  const [showMsgPostError, setShowMsgPostError] = useState(false);
  const [showMsgUpdateError, setShowMsgUpdateError] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [platform, setPlatform] = useState("");
  const [changeName, setChangeName] = useState("");
  const [changeSurname, setChangeSurname] = useState("");
  const [currentPersonID, setCurrentPersonID] = useState(0);

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserCreation = (e) => {
    e.preventDefault();
    if (name === "" || surname === "" || platform === "") {
      setShowMsgPostError(true);
    } else {
      addPerson(name, surname, platform);
      setName("");
      setSurname("");
      setPlatform("");
    }
  };

  const updateUserInfo = (e) => {
    e.preventDefault();
    if (changeName === "" || changeSurname === "") {
      setShowMsgUpdateError(true);
    } else {
      setShowMsgUpdateError(false);
      updatePersonInfo(
        buildPatchObject(),
        currentPersonID,
        changeName,
        changeSurname
      );
      setShow(false);
    }
  };

  const buildPatchObject = () => {
    let arrayObjects = [];
    arrayObjects.push({ op: "replace", path: "/name", value: changeName });

    arrayObjects.push({
      op: "replace",
      path: "/surname",
      value: changeSurname,
    });

    return arrayObjects;
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (id, name, surname) => {
    setShow(true);
    setCurrentPersonID(id);
    setChangeName(name);
    setChangeSurname(surname);
    setShowMsgUpdateError(false);
  };

  return (
    <Fragment>
      <Container>
        <div style={{ marginTop: "50px" }} className='row'>
          <div className='col-sm-4'>
            <Card style={{ marginBottom: "15px" }}>
              <Card.Header as='h5' style={{ textAlign: "center" }}>
                Adicionar Usuário
              </Card.Header>
              <Card.Body>
                {showMsgPostError && (
                  <Alert variant='danger'>
                    Preencha todos os campos abaixo!
                  </Alert>
                )}
                <Form onSubmit={handleUserCreation}>
                  <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type='text'
                      placeholder='Nome'
                    />
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Sobrenome</Form.Label>
                    <Form.Control
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      type='text'
                      placeholder='Sobrenome'
                    />
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Plataforma</Form.Label>
                    <Form.Control
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      type='text'
                      placeholder='Plataforma'
                    />
                    <Form.Text className='text-muted'>
                      Nós não iremos compartilhar essa informação privada.
                    </Form.Text>
                  </Form.Group>
                  <Button variant='primary' type='submit' size='lg' block>
                    Adicionar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
          <div className='col-sm-8'>
            <Card style={{ marginBottom: "15px" }}>
              <Card.Header as='h5' style={{ textAlign: "center" }}>
                Lista de Usuários
              </Card.Header>
              <Card.Body>
                {peopleInfo.length === 0 && !isLoading && (
                  <h3 style={{ textAlign: "center" }}>
                    Não existe nenhum usuário cadastrado!
                  </h3>
                )}
                {isLoading && <Spinner />}
                {peopleInfo.length > 0 && !isLoading && (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr style={{ textAlign: "center" }}>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {peopleInfo.length > 0 &&
                        peopleInfo.map((info) => {
                          return (
                            <tr key={info.id} style={{ textAlign: "center" }}>
                              <td>{info.id}</td>
                              <td>{info.name}</td>
                              <td>{info.surname}</td>
                              <td>
                                <Button
                                  className='btn-mobile'
                                  variant='success'
                                  onClick={() =>
                                    handleShow(info.id, info.name, info.surname)
                                  }
                                >
                                  Update
                                </Button>{" "}
                                <Button
                                  className='btn-mobile'
                                  onClick={() => deletePerson(info.id)}
                                  variant='danger'
                                >
                                  Delete
                                </Button>{" "}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </div>
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Usuário</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={updateUserInfo}>
                <Form.Group controlId='formBasicEmail'>
                  {showMsgUpdateError && (
                    <Alert variant='danger'>
                      Preencha todos os campos abaixo!
                    </Alert>
                  )}
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    value={changeName}
                    onChange={(e) => setChangeName(e.target.value)}
                    type='text'
                    placeholder='Nome'
                  />
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control
                    value={changeSurname}
                    onChange={(e) => setChangeSurname(e.target.value)}
                    type='text'
                    placeholder='Sobrenome'
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button variant='success' type='submit'>
                    Salvar Mudanças
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </Fragment>
  );
};

export default MainPage;
